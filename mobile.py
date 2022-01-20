from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
from msrest.authentication import CognitiveServicesCredentials

from array import array
import os
import glob
from PIL import Image
import sys
import time

subscription_key = "d7797e1bef844bbb983a6472f0940039"
endpoint = "https://rubix1.cognitiveservices.azure.com/"
computervision_client = ComputerVisionClient(
    endpoint, CognitiveServicesCredentials(subscription_key))
mobile = "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
remote_image_url = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.economictimes.com%2Findustry%2Fservices%2Fretail%2Fecommerce-may-soon-lose-mobile-exclusivity%2Farticleshow%2F71641804.cms&psig=AOvVaw3NIojoHA3hExUXLO5eBtYz&ust=1642692113844000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNCO3pGPvvUCFQAAAAAdAAAAABAP"
# test_image_array1 = glob.glob(sys.argv[1])
# image1 = open(test_image_array1[0], 'r+b')


print("===== Describe an image - remote =====")
# Call API


def mobile_checker(path):
    test_image_array1 = glob.glob(path)
    image1 = open(test_image_array1[0], 'r+b')
    description_results = computervision_client.describe_image_in_stream(
        image1)

    # Get the captions (descriptions) from the response, with confidence level
    print("Description of remote image: ")
    if (len(description_results.captions) == 0):
        print("No description detected.")
    else:
        for caption in description_results.captions:
            if "phone" in caption.text:
                print("Phone detected.Will be Kicked out if detected twice !!")
                return True
            else:
                print("No Phone detected")
                return False


mobile_checker(sys.argv[1])
