from google.api_core.client_options import ClientOptions
from google.cloud import documentai
import os

PROJECT_ID = os.getenv("PROJECT_ID")
LOCATION = os.getenv("LOCATION")  
PROCESSOR_ID = os.getenv("PROCESSOR_ID") 


def do_ocr(file):

    FILE_PATH = file
    MIME_TYPE = "application/pdf"

    # Instantiates a client
    docai_client = documentai.DocumentProcessorServiceClient(
        client_options=ClientOptions(api_endpoint=f"{LOCATION}-documentai.googleapis.com")
    )

    RESOURCE_NAME = docai_client.processor_path(PROJECT_ID, LOCATION, PROCESSOR_ID)

    with open(FILE_PATH, "rb") as image:
        image_content = image.read()

    raw_document = documentai.RawDocument(content=image_content, mime_type=MIME_TYPE)
    request = documentai.ProcessRequest(name=RESOURCE_NAME, raw_document=raw_document)

    result = docai_client.process_document(request=request)

    document_object = result.document

    from fpdf import FPDF 
    pdf = FPDF() 
    pdf.add_page()
    pdf.set_font("Arial", size = 12)

    for x in document_object.text.split("\n"): 
        pdf.cell(50,5, txt = x, ln = 1, align = 'C') 
    pdf.output(file)

    return document_object.text
