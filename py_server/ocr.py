import ocrmypdf

def do_ocr(file):
    ocrmypdf.ocr(file, file, skip_text=True)

