from fastapi import APIRouter, File, UploadFile
from app.schemas.prediction_schema import PredictionResponse
from app.services.image_service import ImageService
from app.services.model_service import ModelService

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(image: UploadFile = File(...)):
    # 1. Validate file format and size
    ImageService.validate_file(image)
    
    # 2. Preprocess image
    preprocessed = await ImageService.preprocess_image(image)
    
    # 3. Model inference
    predicted_class, confidence = ModelService.predict(preprocessed)
    
    return PredictionResponse(
        predicted_class=predicted_class,
        confidence=confidence
    )
