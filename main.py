from deepface import DeepFace
import json
import base64
import os
import sys


def face_verification():
    # print(s)
    # s = s.replace("@","/")
    # Converting the String to a Python Dictionary
    # s = json.loads(s)  # Accessing the img base64 strings

    # Converting base64 strings in jpg files
    # decodeit = open('img1.jpg', 'wb')
    # decodeit.write(base64.b64decode((b64_string_1)))
    # decodeit.close()
    # decodeit = open('img2.jpg', 'wb')
    # decodeit.write(base64.b64decode((b64_string_2)))
    # decodeit.close()

    # Verifying if the 2 images are true
    result = DeepFace.verify(img1_path="img1.jpg", img2_path="img2.jpg")

    # Deleting the 2 jpg files created
    os.remove("img1.jpg")
    os.remove("img2.jpg")

    print(result)
    # Jsonifying the dictionary result and returning it
    return result


face_verification()
