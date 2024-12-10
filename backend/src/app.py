from flask import Flask, request, jsonify
import json
import numpy as np
from PIL import Image
from keras.applications.vgg19 import VGG19, preprocess_input
from tensorflow.keras.models import Model
from tensorflow.keras.preprocessing import image
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class ImageComparisonService:
    def __init__(self):
        self.model = self.get_modified_VGG19_model()
        self.vectors = self.load_vectors_from_json("transformed_vectors.json")

    def get_modified_VGG19_model(self):
        vgg19_model = VGG19(input_shape=(224, 224, 3), weights="imagenet")
        vgg19_model.trainable = False
        input_tensor = vgg19_model.input
        fc1_output = vgg19_model.get_layer("fc1").output
        modified_model = Model(inputs=input_tensor, outputs=fc1_output)
        return modified_model

    def image_preprocess(self, img):
        img = img.resize((224, 224))
        img = img.convert("RGB")
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)
        return x

    def extract_vector(self, img):
        img_tensor = self.image_preprocess(img)
        vector = self.model.predict(img_tensor)[0]
        vector = vector / np.linalg.norm(vector)  # Chuẩn hóa vector
        return vector

    def load_vectors_from_json(self, filepath):
        with open(filepath, "r") as json_file:
            data = json.load(json_file)
            print(data)  # In ra cấu trúc dữ liệu để kiểm tra
        return data

    def compare_image(self, new_vector, top_n=10):
        distances = []
        for entry in self.vectors:
            existing_vector = np.array(entry["vector"])
            distance = np.linalg.norm(new_vector - existing_vector)
            distances.append((entry, distance))

        distances.sort(key=lambda x: x[1])
        closest_images = distances[:top_n]
        return closest_images
    
image_comparison_service = ImageComparisonService()

@app.route('/api/compare_image', methods=['POST'])
def compare_image():
    if 'image' not in request.files:
        print("No image provided")
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    if not file:
        print("Failed to retrieve image")
        return jsonify({'error': 'Failed to retrieve image'}), 400

    try:
        img = Image.open(file.stream).convert('RGB')
        print("Image successfully opened.")
        new_vector = image_comparison_service.extract_vector(img)
        print(f"Extracted vector: {new_vector}")
        
        closest_images = image_comparison_service.compare_image(new_vector)
        results = [{'id': entry[0]['idProduct'], 'distance': float(entry[1])} for entry in closest_images]
        
        if not results:
            print("No similar images found.")
            return jsonify({'message': 'No similar images found'}), 404

        print(f"Results: {results}")
        return jsonify(results)

    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({'error': 'Error processing image'}), 500

if __name__ == "__main__":
    app.run(debug=True)