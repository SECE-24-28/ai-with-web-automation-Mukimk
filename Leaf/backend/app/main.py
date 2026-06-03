import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1 import health, predict, recommendation
from app.schemas.recommendation_schema import AnalysisResponse, DiseaseInfoSchema
from app.services.image_service import ImageService
from app.services.model_service import ModelService
from app.services.recommendation_service import RecommendationService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    logger.info("Initializing application resources...")
    try:
        ModelService.load_model()
        RecommendationService.load_data()
        logger.info("All resources loaded successfully.")
    except Exception as e:
        logger.error(f"Failed to load resources on startup: {str(e)}")
        # We don't crash the server start immediately to allow debugging/health endpoints,
        # but the services will raise errors on calls.
    yield
    logger.info("Shutting down application resources...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan
)

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Router setup
api_router = APIRouter()
api_router.include_router(health.router, tags=["Health"])
api_router.include_router(predict.router, tags=["Prediction"])
api_router.include_router(recommendation.router, tags=["Recommendation"])

# Single endpoint for complete analysis
@api_router.post("/analyze", response_model=AnalysisResponse, tags=["Complete Analysis"])
async def analyze_image(image: UploadFile = File(...)):
    # 1. Validate file format and size
    ImageService.validate_file(image)
    
    # 2. Preprocess image
    preprocessed = await ImageService.preprocess_image(image)
    
    # 3. Model inference
    predicted_class, confidence = ModelService.predict(preprocessed)
    
    # 4. Retrieve recommendation
    disease_info = RecommendationService.get_recommendation(predicted_class)
    
    return AnalysisResponse(
        predicted_class=predicted_class,
        confidence=confidence,
        disease_info=DiseaseInfoSchema(**disease_info)
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Plant Leaf Disease Detection & Recommendation API. Visit /docs for documentation."}
