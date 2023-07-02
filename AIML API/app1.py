#from flask_ngrok import run_with_ngrok
import numpy as np
import cv2
import json
import tensorflow as tf
from flask import Flask, request, jsonify, render_template
from keras.models import load_model 
from tensorflow.keras.preprocessing.image import ImageDataGenerator
#import pickle
app = Flask(__name__)
IMG_WIDTH = 150
IMG_HEIGHT = 150
BATCH_SIZE = 32
#cnn_model = pickle.load(open("E:\College\.vscode\Frameworks\Hackathon\ML-Model-Deployment-And-Test-Using-Postman\model.pkl", "rb"))
#run_with_ngrok(app)   

h= load_model("E:\College\.vscode\Frameworks\Hackathon\ML-Model-Deployment-And-Test-Using-Postman\cnn_model.h5")
img = cv2.imread("C:\\Users\\dheem\\Desktop\\20230326_085424_jpg.rf.844e5086fa805014a9080b2264c91a7e.jpg", )
test_dataset = "./sensing_localy_v1i_tensorflow/test"
print(type(img))
print(img.shape)
img = cv2.resize(img, (150,150))
print(img.shape)
img1 = [img]
img1 = np.array(img1)
print(img1.shape)
# test_datagen = ImageDataGenerator(rescale=1.0/255)

# test_generator = test_datagen.flow_from_directory(test_dataset,
#                                                  shuffle=False,
#                                                  batch_size=BATCH_SIZE,
#                                                  target_size = (IMG_WIDTH, IMG_HEIGHT),
#                                                  class_mode='categorical')


@app.route("/")
def home():
    return "<h1>Sensing Local</h1>"

@app.route("/predict",methods=["POST"])
def predict():
    dictt = {
        "0" : "Encroachment",
        "1" : "Footpath Quality",
        "2" : "Obstruction",
        "3" : "Waste"
    }
  #data=request.get_json()
  #float_features=[[data[i]["Sepal_Length"],data[i]["Sepal_Width"],data[i]["Petal_Length"],data[i]["Petal_Width"]] for i in range(len(data))]
#   predictions = h.predict(test_generator)
#   fig, ax = plt.subplots(nrows=2, ncols=4, figsize=(12, 10))
#   idx = 0

#   for i in range(2):
#     for j in range(4):
#         predicted_label = labels[np.argmax(predictions[idx])]
#         ax[i, j].set_title(f"{predicted_label}")
#         ax[i, j].imshow(test_generator[0][0][idx])
#         ax[i, j].axis("off")
#         idx += 1

#   plt.tight_layout()
#   plt.suptitle("Test Dataset Predictions", fontsize=20)
#   res=plt.show()

    res = h.predict(img1)
    print(type(res))
    print(res)
    a = np.argmax(res[0])
    print(a)
    resp = dictt[str(a)]
    return resp
    

if __name__ == "__main__":
    app.run(debug=True)
