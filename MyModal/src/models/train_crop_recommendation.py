import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


def train_crop_recommendation():

    print("📥 Loading dataset...")
    df = pd.read_csv("data/raw/crop_data.csv")

    df = df.drop_duplicates().reset_index(drop=True)

    FEATURE_COLUMNS = [
        "Nitrogen",
        "Phosphorus",
        "Potassium",
        "Temperature",
        "pH_Value",
        "Rainfall"
    ]

    X = df[FEATURE_COLUMNS]
    y = df["Crop"]

    # Encode labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Scale features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        X_scaled, y_encoded, test_size=0.2, random_state=42
    )

    print("🌳 Training RandomForest...")
    model = RandomForestClassifier(
        n_estimators=300,
        max_depth=20,
        random_state=42
    )

    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    acc = accuracy_score(y_test, y_pred)

    print(f"✅ Accuracy: {acc:.3f}")

    # Save directly
    joblib.dump(model, "models/crop_model.pkl")
    joblib.dump(scaler, "models/crop_scaler.pkl")
    joblib.dump(label_encoder, "models/crop_label_encoder.pkl")

    print("🎉 Crop Recommendation Model Saved!")
