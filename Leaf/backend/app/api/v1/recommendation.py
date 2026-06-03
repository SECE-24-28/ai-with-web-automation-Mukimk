from fastapi import APIRouter
from app.schemas.recommendation_schema import DiseaseInfoSchema
from app.services.recommendation_service import RecommendationService

router = APIRouter()

@router.get("/recommendation/{disease_name}", response_model=DiseaseInfoSchema)
def get_recommendation(disease_name: str):
    recommendation = RecommendationService.get_recommendation(disease_name)
    return DiseaseInfoSchema(**recommendation)
