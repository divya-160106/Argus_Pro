from fastapi import FastAPI, Query
from database import warehouse_collection
from ml.predict import predict_future
from fastapi.middleware.cors import CORSMiddleware
from prediction_cache import get_predictions, set_predictions
from contextlib import asynccontextmanager
from ml.model_loader import load_resources
import os
import time

FRONTEND_URL = os.getenv("FRONTEND_URL")

@asynccontextmanager
async def lifespan(app: FastAPI):
    start = time.perf_counter()
    print("Loading ML resources...")
    # Load model + scaler
    load_resources()
    print(f"Resources loaded in {time.perf_counter() - start:.2f}s")

    # Generate predictions once
    pred_start = time.perf_counter()
    predictions = predict_future()
    set_predictions(predictions)
    print(f"Predictions generated in {time.perf_counter() - pred_start:.2f}s")
    print(f"Startup completed in {time.perf_counter() - start:.2f}s")
    print("Prediction cache ready!")
    yield

app = FastAPI( title="Argus", version="1.0.0", lifespan=lifespan )

origins = [
    "http://localhost:5173"
]

frontend_url = os.getenv("FRONTEND_URL")

if frontend_url:
    origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Argus API is running!"
    }

@app.get("/warehouse")
def get_warehouse_data( page: int = Query(default=1, ge=1), page_size: int = Query(default=100, ge=1, le=100) ):
    skip = (page - 1) * page_size
    total_records = warehouse_collection.count_documents({})
    docs = list(
        warehouse_collection.find({}, {"_id": 0})
        .sort([("date", -1), ("hour", -1)])
        .skip(skip)
        .limit(page_size)
    )
    return {
        "page": page,
        "page_size": page_size,
        "total_records": total_records,
        "total_pages": (total_records + page_size - 1) // page_size,
        "data": docs
    }

@app.get("/dates")
def get_available_dates():
    dates = warehouse_collection.distinct("date")
    dates.sort(reverse=True)
    return dates

@app.get("/filters")
def get_filters():
    DAY_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]
    dates = warehouse_collection.distinct("date")
    dates.sort(reverse=True)
    days = warehouse_collection.distinct("day")
    days = [day for day in DAY_ORDER if day in days]
    weather = warehouse_collection.distinct("weather")
    weather.sort()
    return { "dates": dates, "days": days, "weather": weather }

@app.get("/predict")
def predict():
    return get_predictions()
