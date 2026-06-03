import json
import os
import logging
from fastapi import HTTPException
from app.core.config import settings

logger = logging.getLogger(__name__)

class RecommendationService:
    _data = None

    @classmethod
    def load_data(cls):
        if cls._data is None:
            data_path = settings.DISEASE_INFO_PATH
            if not os.path.exists(data_path):
                logger.error(f"Disease info file not found at: {data_path}")
                raise RuntimeError(f"Disease info file not found at: {data_path}")
            
            try:
                with open(data_path, "r", encoding="utf-8") as f:
                    cls._data = json.load(f)
                logger.info("Disease info database loaded successfully.")
            except Exception as e:
                logger.error(f"Error loading disease info database: {str(e)}")
                raise RuntimeError(f"Failed to load disease info database: {str(e)}")
        return cls._data

    @classmethod
    def get_recommendation(cls, disease_name: str) -> dict:
        data = cls.load_data()
        
        # Strip whitespaces and try matching
        clean_name = disease_name.strip()
        
        if clean_name not in data:
            logger.warning(f"Disease recommendation not found for: {clean_name}")
            raise HTTPException(
                status_code=404,
                detail=f"Disease recommendation not found for: {clean_name}"
            )
            
        return data[clean_name]
