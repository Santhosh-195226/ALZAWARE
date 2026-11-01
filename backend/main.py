
from pathlib import Path
import json

import numpy as np
import xgboost as xgb
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# --------------------------------------------------
# App setup
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

with open(MODEL_DIR / "metadata.json", "r", encoding="utf-8") as f:
    metadata = json.load(f)

classifier = xgb.XGBClassifier()
classifier.load_model(str(MODEL_DIR / "risk_classifier.json"))

regressor = xgb.XGBRegressor()
regressor.load_model(str(MODEL_DIR / "mmse_regressor.json"))


app = FastAPI(
    title="ALZAWARE API",
    description="Cognitive health monitoring and risk assessment prototype",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Input validation
# --------------------------------------------------

class AssessmentInput(BaseModel):
    Age: float = Field(gt=0, le=120)
    EDUC: float = Field(ge=0, le=40)
    SES: float = Field(ge=1, le=5)
    MMSE: float = Field(ge=0, le=30)
    eTIV: float = Field(gt=0)
    nWBV: float = Field(gt=0, le=1)
    ASF: float = Field(gt=0)
    Sex: int = Field(ge=0, le=1, description="Use the same 0/1 encoding as the notebook")


# --------------------------------------------------
# Prediction endpoints
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "ALZAWARE API is running",
        "status": "online",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "models_loaded": True,
    }


@app.get("/model-info")
def model_info():
    return {
        "classifier_features": metadata["classifier_features"],
        "regressor_features": metadata["regressor_features"],
        "risk_classes": metadata["risk_classes"],
        "model_type": "XGBoost research prototype",
    }


@app.post("/predict")
def predict(data: AssessmentInput):
    try:
        values = data.model_dump()

        # Build feature arrays in the exact order used during training.
        classifier_features = metadata["classifier_features"]
        regressor_features = metadata["regressor_features"]

        classifier_input = np.array(
            [[values[name] for name in classifier_features]],
            dtype=float,
        )
        regressor_input = np.array(
            [[values[name] for name in regressor_features]],
            dtype=float,
        )

        # Reproduce StandardScaler.transform using saved training statistics.
        classifier_scaler = metadata["classifier_scaler"]
        regressor_scaler = metadata["regressor_scaler"]

        classifier_input = (
            classifier_input - np.array(classifier_scaler["mean"])
        ) / np.array(classifier_scaler["scale"])

        regressor_input = (
            regressor_input - np.array(regressor_scaler["mean"])
        ) / np.array(regressor_scaler["scale"])

        predicted_class = classifier.predict(classifier_input)[0]
        risk_label_map = {
            0: "High",
            1: "Low",
            2: "Medium"
        }
        predicted_risk = risk_label_map[int(predicted_class)]
        predicted_mmse = float(regressor.predict(regressor_input)[0])

        # Include probabilities when the classifier supports them.
        probabilities = classifier.predict_proba(classifier_input)[0]
        class_labels = classifier.classes_.tolist()

        return {
            "risk_category": predicted_risk,
            "class_probabilities": {
                str(label): round(float(probability), 4)
                for label, probability in zip(class_labels, probabilities)
            },
            "estimated_mmse": round(predicted_mmse, 2),
            "mmse_scale": "0-30",
            "disclaimer": (
                "Research prototype output, not a clinical diagnosis. "
                "The estimated MMSE is a model prediction, not a measured score."
            ),
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {type(exc).__name__}: {exc}",
        ) from exc
