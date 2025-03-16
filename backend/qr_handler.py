import os
import qrcode
import uuid
from PIL import Image
from pyzbar.pyzbar import decode
import numpy as np
import cv2

# Directory to store QR codes
QR_CODE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'qr_codes')

# Create directory if it doesn't exist
os.makedirs(QR_CODE_DIR, exist_ok=True)

def generate_qr_code(data, filename=None):
    """Generate a QR code from data and save it to a file"""
    if filename is None:
        filename = f"{uuid.uuid4()}.png"
    
    # Create full path
    filepath = os.path.join(QR_CODE_DIR, filename)
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    # Create an image from the QR Code instance
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Save the image
    img.save(filepath)
    
    return filepath

def scan_qr_code(image_file):
    """Scan a QR code from an image file"""
    # Read the image file
    if hasattr(image_file, 'read'):
        # If it's a file-like object (e.g., from request.files)
        image = Image.open(image_file)
        image_array = np.array(image)
    else:
        # If it's a file path
        image_array = cv2.imread(image_file)
    
    # Convert to grayscale if needed
    if len(image_array.shape) > 2 and image_array.shape[2] > 1:
        gray_image = cv2.cvtColor(image_array, cv2.COLOR_BGR2GRAY)
    else:
        gray_image = image_array
    
    # Decode QR code
    decoded_objects = decode(gray_image)
    
    # Return data if found
    if decoded_objects:
        return decoded_objects[0].data.decode('utf-8')
    
    return None 