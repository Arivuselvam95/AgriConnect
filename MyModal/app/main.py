from fastapi import FastAPI, HTTPException
import os
from app.schemas import CropRecommendationRequest
from app.utils import predict_top_3_crops

from app.utils import predict_crop_price
 

app = FastAPI(
    title="AgriConnect API",
    description="Price Prediction and Crop recommendation Api using lstm, rf",
    version="2.0"
)


@app.get("/predict/{crop}")
def predict_price(crop: str):

    crop = crop.lower()

    try:
        predicted_price, last_actual_prices = predict_crop_price(crop)

        return {
            "crop": crop,
            "unit": "₹ per quintal",
            "predicted_price": round(predicted_price, 2),
            "graph_data": {
                "actual_prices_last_12_months": last_actual_prices,
                "predicted_next_month": round(predicted_price, 2)
            }
        }

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Model not found for crop")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/predict/crop")
def recommend_crop(data: CropRecommendationRequest):
    return predict_top_3_crops(data.dict())
