import numpy as np
import joblib
import pandas as pd

def prepare_features(rainfall, wpi, month, crop):

    rainfall = np.array(rainfall)
    wpi = np.array(wpi)
    month = np.array(month)

    month_sin = np.sin(2 * np.pi * month / 12)
    month_cos = np.cos(2 * np.pi * month / 12)

    price_lag_1 = np.zeros_like(rainfall)
    price_lag_2 = np.zeros_like(rainfall)
    price_lag_3 = np.zeros_like(rainfall)
    price_roll_mean_3 = np.zeros_like(rainfall)

    df = pd.DataFrame({
        "Rainfall": rainfall,
        "WPI": wpi,
        "Month_sin": month_sin,
        "Month_cos": month_cos,
        "Price_lag_1": price_lag_1,
        "Price_lag_2": price_lag_2,
        "Price_lag_3": price_lag_3,
        "Price_roll_mean_3": price_roll_mean_3
    })

    # 🔥 Load selected features
    selected_features = joblib.load(f"models/{crop}_features.pkl")

    df = df[selected_features]

    scaler = joblib.load(f"models/{crop}_scaler.pkl")
    X_scaled = scaler.transform(df)

    return X_scaled.reshape(1, df.shape[0], df.shape[1])
