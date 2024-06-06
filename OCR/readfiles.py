from PIL import Image
import pytesseract
import cv2 
from server import display
from matplotlib import pyplot as plt
import arabic_reshaper
from bidi.algorithm import get_display



Carte = "OCR-Python/images/bechir.jpg"
Initial = "OCR-Python/images/KingdomCome.jpg"
no_noise = "OCR-Python/tempo/nonoise-image.jpg"
image_with_border = "OCR-Python/tempo/image_with_border.jpg"
inverted_image = "OCR-Python/tempo/invertedimage.jpg"

display(inverted_image)
ocr_result = pytesseract.image_to_string(Image.open(inverted_image), lang='ara')
reshaped_text = arabic_reshaper.reshape(ocr_result)
bidi_text = get_display(reshaped_text)
print(bidi_text)


