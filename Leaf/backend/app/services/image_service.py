import io
import numpy as np
from PIL import Image
from fastapi import HTTPException, UploadFile
from tensorflow.keras.applications.vgg19 import preprocess_input

class ImageService:
    @staticmethod
    def validate_file(file: UploadFile, max_size_mb: float = 10.0):
        # 1. Validate file type
        allowed_content_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
        if file.content_type not in allowed_content_types:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.content_type}. Supported types are JPEG, PNG, WEBP."
            )
        
        # 2. Validate image size
        # Read the file size by seeking/reading or reading headers if possible
        # However, to be safe, we can read chunks or just read the content
        pass

    @staticmethod
    async def preprocess_image(file: UploadFile) -> np.ndarray:
        # Read file contents
        contents = await file.read()
        
        # Verify size manually
        size_mb = len(contents) / (1024 * 1024)
        if size_mb > 10.0:
            raise HTTPException(
                status_code=400,
                detail=f"File size exceeds the 10MB limit (uploaded: {size_mb:.2f}MB)."
            )
            
        try:
            # Load with PIL
            image = Image.open(io.BytesIO(contents))
            
            # 3. Convert image to RGB
            if image.mode != "RGB":
                image = image.convert("RGB")
                
            # 4. Resize to model input size (256, 256)
            target_size = (256, 256)
            image = image.resize(target_size, Image.Resampling.LANCZOS)
            
            # 5. Convert to NumPy array
            img_array = np.array(image, dtype=np.float32)
            
            # 6. Preprocess using VGG19 preprocess_input
            img_array = preprocess_input(img_array)
            
            # 7. Expand dimensions (add batch dimension)
            img_array = np.expand_dims(img_array, axis=0)
            
            return img_array
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid or corrupted image file: {str(e)}"
            )
