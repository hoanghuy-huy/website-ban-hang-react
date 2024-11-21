from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__)
CORS(app)

# Tải mô hình
model = tf.keras.models.load_model('model/model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400



    # Xử lý hình ảnh
    img = Image.open(file.stream).convert('RGB')  # Chuyển đổi sang RGB
    img = img.resize((64, 64))  # Đảm bảo thay đổi kích thước đúng
    img_array = np.array(img) / 255.0  # Chuẩn hóa
    img_array = np.expand_dims(img_array, axis=0)  # Thêm chiều batch

    # Dự đoán
    try:
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = float(np.max(predictions)) * 100  # Chuyển đổi sang float
        return jsonify({'class': str(predicted_class), 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)