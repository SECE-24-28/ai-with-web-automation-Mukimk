import os
import logging
import tensorflow as tf
import numpy as np
from fastapi import HTTPException
from app.core.config import settings
from app.core.constants import CLASS_NAMES

logger = logging.getLogger(__name__)

class ModelService:
    _model = None

    @classmethod
    def load_model(cls):
        if cls._model is None:
            model_path = settings.MODEL_PATH
            if not os.path.exists(model_path):
                logger.error(f"Model file not found at: {model_path}")
                raise RuntimeError(f"Model file not found at: {model_path}")
            
            try:
                logger.info(f"Loading TensorFlow model from {model_path}...")
                # Load the model without compilation to avoid warnings/errors about optimizers
                cls._model = tf.keras.models.load_model(model_path, compile=False)
                logger.info("Model loaded successfully.")
            except Exception as e:
                logger.error(f"Error loading model: {str(e)}")
                raise RuntimeError(f"Failed to load model: {str(e)}")
        return cls._model

    @classmethod
    def predict(cls, preprocessed_image: np.ndarray) -> tuple[str, float]:
        model = cls.load_model()
        try:
            # Perform inference
            predictions = model.predict(preprocessed_image)
            
            # Find class with highest probability
            predicted_class_idx = int(np.argmax(predictions[0]))
            confidence = float(predictions[0][predicted_class_idx]) * 100.0
            
            predicted_class_name = CLASS_NAMES.get(
                predicted_class_idx, "Unknown"
            )
            
            return predicted_class_name, confidence
        except Exception as e:
            logger.error(f"Model inference failed: {str(e)}")
            raise HTTPException(
                status_code=500,
                detail=f"Model inference failed: {str(e)}"
            )
