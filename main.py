import asyncio
import io
import glob
import os
import sys
import time
import uuid
import requests
from urllib.parse import urlparse
from io import BytesIO
# To install this module, run:
#python -m pip install Pillow
from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person

# This key will serve all examples in this document.
KEY = "90c2380a74de47ca9900f9ab9e491147"

# This endpoint will be used in all examples in this quickstart.
ENDPOINT = "https://rubix.cognitiveservices.azure.com/"

face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY))

def face_matcher(path1, path2):
    #image1
    test_image_array1 = glob.glob(path1)
    image1 = open(test_image_array1[0], 'r+b')
    
    #image2
    test_image_array2 = glob.glob(path2)
    image2 = open(test_image_array2[0], 'r+b')
    
    # We use detection model 3 to get better performance.
    detected_faces1 = face_client.face.detect_with_stream(image1, detection_model='detection_03')
    # Add the returned face's face ID
    source_image1_id = detected_faces1[0].face_id
    print('{} face(s) detected from image'.format(len(detected_faces1)))

    # Detect face(s) from source image 2, returns a list[DetectedFaces]
    detected_faces2 = face_client.face.detect_with_stream(image2, detection_model='detection_03')
    # Add the returned face's face ID
    source_image2_id = detected_faces2[0].face_id
    print('{} face(s) detected from image .'.format(len(detected_faces2)))
    
    verify_result = face_client.face.verify_face_to_face(source_image1_id, source_image2_id)
    
    if verify_result.is_identical:
        print("Identical, Confidence : {}".format(verify_result.confidence))
        return True
    else:
        print("Not identical, Confidence : {}".format(verify_result.confidence))
        return False

face_matcher(sys.argv[1], sys.argv[2])



