import os
from fpdf import FPDF
import time
from PIL import ImageGrab

folder_path=r'D:\Osmium-915\whiteboard\tldraw\tldrawdemo\src\screenshots'
def capture_and_save_screenshot(file_name):
    screenshot=ImageGrab.grab()
    file_path=os.path.join(folder_path,file_name)
    screenshot.save(file_path)
    print(f"screenshot saved:{file_path}")

image_paths=[]
while True: 
    timestamp=time.strftime("%Y%m%d_%H%M%S")
    file_name=f"screenshot_{timestamp}.jpeg"
    image_path=capture_and_save_screenshot(file_name)
    image_paths.append(image_path)

    time.sleep(30)

    if len(image_paths)==5:break

def convert_images_pdf(folder):
    folder_path = folder
    # Create a PDF object
    pdf = FPDF()
    # Add a page for each image
    if os.path.exists("ss2.pdf"):
        os.remove("ss2.pdf")

    for filename in os.listdir(folder_path):
        if filename.endswith(".jpeg") or filename.endswith(".png") or filename.endswith(".jpg"):
            filepath = os.path.join(folder_path, filename)
            pdf.add_page()
            pdf.image(filepath, x=0, y=0, w=210, h=297)  
    # Save the PDF in the same folder
    pdf.output(os.path.join(folder_path, "ss2.pdf"), "F")
    print("PDF created successfully!")


convert_images_pdf(folder_path)