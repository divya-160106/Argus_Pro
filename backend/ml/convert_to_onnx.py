import tensorflow as tf
import tf2onnx

model = tf.keras.models.load_model("ml/warehouse_gru.keras")

input_signature = [
    tf.TensorSpec([None, 10, 8], tf.float32, name="input")
]

@tf.function(input_signature=input_signature)
def model_fn(x):
    return model(x)

tf2onnx.convert.from_function(
    model_fn,
    input_signature=input_signature,
    output_path="ml/warehouse_gru.onnx",
)

print("Done!")