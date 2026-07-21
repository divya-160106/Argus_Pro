import time
start = time.perf_counter()
import onnxruntime as ort
print(time.perf_counter() - start)
import joblib

_session = None
_scaler = None

def load_resources():
    global _session, _scaler

    if _session is None:
        start = time.perf_counter()
        print("Loading ONNX model...")
        _session = ort.InferenceSession(
            "ml/warehouse_gru.onnx",
            providers=["CPUExecutionProvider"]
        )
        print(f"Model loaded in {time.perf_counter()-start:.2f}s")

    if _scaler is None:
        start = time.perf_counter()
        _scaler = joblib.load("ml/scaler.pkl")
        print(f"Scaler loaded in {time.perf_counter()-start:.2f}s")
    return _session, _scaler


def get_model():
    return load_resources()[0]


def get_scaler():
    return load_resources()[1]