from pydantic import BaseModel
from typing import List

class DiseaseInfoSchema(BaseModel):
    name: str
    plant: str
    disease_type: str
    description: str
    symptoms: List[str]
    causes: List[str]
    treatments: List[str]
    prevention: List[str]
    severity: str

class AnalysisResponse(BaseModel):
    predicted_class: str
    confidence: float
    disease_info: DiseaseInfoSchema
