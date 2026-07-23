# 📦 Argus — ML-Based Warehouse Congestion Prediction System

> **Predict the bottleneck before it happens.**

Argus is an end-to-end machine learning platform for predicting warehouse congestion and operational delays. It combines a GRU-based multi-output neural network, a FastAPI inference service, a React dashboard, and MongoDB to deliver real-time congestion forecasting and historical warehouse analytics.

The project simulates warehouse operations by generating realistic synthetic datasets, trains a deep learning model to predict Congestion Score and Waiting Time, optimizes inference using ONNX Runtime, and exposes REST APIs for analytics, prediction, filtering, and visualization.

**Live demo:** https://argus-pro.vercel.app/

---

## 🧭 Overview

Warehouse congestion significantly impacts operational efficiency — increasing truck wait times, package processing delays, and dock utilization. Argus predicts congestion before bottlenecks occur, letting warehouse managers monitor operational trends and make informed staffing and scheduling decisions.

---

## ✨ Key Features

- 📈 Multi-output deep learning model for warehouse congestion prediction
- ⚡ FastAPI inference service
- 📊 Interactive React analytics dashboard
- 🗄️ MongoDB-backed historical warehouse dataset
- 🤖 ONNX Runtime optimized inference
- 📅 Historical warehouse analytics
- 🔍 Dynamic filtering by date, weekday, and weather
- 📈 Prediction history visualization
- 🏭 Synthetic warehouse simulation pipeline

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, Axios, CSS |
| Backend | FastAPI, Python, Pydantic |
| Machine Learning | TensorFlow, Keras, GRU, ONNX, ONNX Runtime, Pandas, NumPy, Scikit-learn |
| Database | MongoDB |

---

## 🏗️ System Architecture

```
Warehouse Simulator
        │
        v
Synthetic Operational Dataset
        │
        v
Data Preprocessing
(Pandas + MinMaxScaler)
        │
        v
GRU Multi-Output Model
(TensorFlow/Keras)
        │
        v
ONNX Conversion
        │
        v
ONNX Runtime
        │
        v
FastAPI REST API
        │
        v
MongoDB
        │
        v
React Dashboard
```

---

## 🗃️ Dataset

Argus generates a synthetic warehouse dataset containing over 5,000 operational records representing daily warehouse activity.

Each record includes operational metrics such as:

- Truck Arrival Rate
- Workers Present
- Required Workers
- Total Incoming Packages
- Processed Packages
- Queue Length
- Conveyor Utilization
- Conveyor Speed
- Average Processing Time
- Occupied Docks
- Total Docks
- Waiting Trucks
- Weather
- Hour / Day / Date

The trained model predicts:

- **Congestion Score**
- **Waiting Time**

---

## 🤖 Machine Learning Pipeline

### Data Generation
A synthetic warehouse simulator generates realistic operational records across multiple warehouse conditions by varying traffic intensity, package volume, staffing levels, conveyor performance, dock occupancy, weather conditions, and temporal features.

### Data Preprocessing
- Feature selection
- Data normalization using MinMaxScaler
- Time-series sequence preparation
- Train-test split

### Model Architecture
Argus uses a GRU-based multi-output regression model implemented in TensorFlow/Keras. The network simultaneously predicts:

- Warehouse Congestion Score
- Estimated Waiting Time

Training includes:

- EarlyStopping
- ReduceLROnPlateau
- ModelCheckpoint
- Validation-based optimization

After training, the TensorFlow model is exported to ONNX, validated against the original model, and deployed using ONNX Runtime for optimized inference.

---

## 📡 REST API

### `GET /`
Health check endpoint.

```python
@app.get("/")
def home():
    return {
        "message": "Argus API is running!"
    }
```

**Returns**
```json
{
  "message": "Argus API is running!"
}
```

---

### `GET /warehouse`
Returns paginated historical warehouse operational data, sorted in reverse chronological order.

```python
@app.get("/warehouse")
def get_warehouse_data(
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=100, ge=1, le=100)
):
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
```

**Example response**
```json
{
  "page": 1,
  "page_size": 100,
  "total_records": 5000,
  "total_pages": 50,
  "data": [
    {
      "timestamp": 5000,
      "truck_arrival_rate": 6,
      "total_incoming_packages": 396,
      "processed_packages": 485,
      "queue_length": 29,
      "conveyor_utilization": 55,
      "conveyor_speed": 1.05,
      "avg_processing_time": 5.24,
      "hour": 8,
      "day": "Monday",
      "date": "2027-01-25",
      "congestion_score": 42.71,
      "waiting_time": 0.38,
      "required_workers": 15,
      "workers_present": 11,
      "total_docks": 6,
      "occupied_docks": 6,
      "waiting_trucks": 0,
      "weather": "Rain"
    }
  ]
}
```

---

### `GET /predict`
Runs the deployed ONNX model and returns predicted warehouse conditions, including Congestion Score, Waiting Time, Required Workers, and related operational metrics.

```python
@app.get("/predict")
def predict():
    return get_predictions()
```

**Example response**
```json
[
  {
    "truck_arrival_rate": 6,
    "workers_present": 12,
    "conveyor_speed": 1,
    "conveyor_utilization": 70.64,
    "avg_processing_time": 3.84,
    "weather": "Sunny",
    "total_incoming_packages": 540,
    "processed_packages": 480,
    "queue_length": 89,
    "occupied_docks": 6,
    "waiting_trucks": 0,
    "congestion_score": 55.16,
    "waiting_time": 2.23,
    "required_workers": 15,
    "total_docks": 6,
    "date": "2027-01-25",
    "day": "Monday",
    "hour": 9,
    "timestamp": 5001
  }
]
```

---

## 📊 Dashboard

The React dashboard provides:

- Historical warehouse records
- Real-time predictions
- Prediction log
- Warehouse operational metrics
- Pagination
- Dynamic filters
- Interactive analytics

---

## ⚡ Performance Optimizations

- TensorFlow → ONNX model conversion
- ONNX Runtime inference
- MongoDB-backed data storage
- Paginated API responses
- Modular FastAPI architecture
- Multi-output prediction

---

## 🗺️ Roadmap

### v2.0 (Coming Soon)

- 📡 Live IoT sensor integration
- 🔄 Kafka-based streaming pipeline
- 🏭 Multi-warehouse monitoring
- 🧠 Explainable AI using SHAP
- 🗺️ Warehouse heatmaps
- 👷 Predictive workforce allocation
- 🚨 Alert and anomaly detection

---

## 💡 Why Argus?

Argus demonstrates the complete lifecycle of deploying an AI application — from synthetic data generation and deep learning model training to optimized ONNX inference, REST API development, persistent data storage, and full-stack visualization. The project combines machine learning, backend engineering, and frontend development to simulate a production-ready warehouse analytics platform.

---

## 📄 License & Copyright

© 2026 Divyasree Manikandan. All rights reserved.

This project and its source code are the intellectual property of the author. Unauthorized copying, distribution, or use of this codebase, in whole or in part, without explicit written permission is prohibited.

---

*Built for UPS via Tech Mahindra Limited*
