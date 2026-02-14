from pydantic import BaseModel
from typing import List

class PredictionRequest(BaseModel):
    crop: str
    rainfall: List[float]     # last 3 months
    wpi: List[float]
    month: List[int]          # last 3 months (1–12)

class PredictionResponse(BaseModel):
    crop: str
    predicted_price: float


class CropRecommendationRequest(BaseModel):
    Nitrogen: float
    Phosphorus: float
    Potassium: float
    Temperature: float
    Humidity: float
    pH_Value: float
    Rainfall: float
