import os

class Settings:
    PROJECT_NAME: str = "Plant Leaf Disease Detection & Recommendation API"
    API_V1_STR: str = "/api/v1"
    
    # Model configuration
    MODEL_PATH: str = os.path.abspath(os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "models",
        "best_model.h5"
    ))
    
    # Disease data path
    DISEASE_INFO_PATH: str = os.path.abspath(os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "data",
        "disease_info.json"
    ))
    
    # CORS Origins
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
    ]

settings = Settings()
