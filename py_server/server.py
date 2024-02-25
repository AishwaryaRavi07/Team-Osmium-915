
# FASTAPI requirements
from fastapi import FastAPI, Request, File, UploadFile, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Annotated, List

#langchain requirements
from langchain import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.summarize import load_summarize_chain

import google.generativeai as genai


# Other requirements
import shutil
import pathlib
import os
from pathlib import Path
from PyPDF2 import PdfMerger


#environment
from dotenv import load_dotenv
import os
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

from ocr import do_ocr




#init APP
app = FastAPI()
origins = [
    "*"
]
#handle cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



global_qa_chain = None
global_vector_index = None
global_docs = None

#initial processing of document
@app.post("/process")
async def process(filetype : Annotated[str,Form()], 
                  file: UploadFile) :
    
    global global_qa_chain, global_vector_index, global_docs

    global_docs = "current_active/"+file.filename

    #save file
    with open(global_docs, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    
    #do ocr
    data = do_ocr(global_docs)

    
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=200)


    texts = text_splitter.split_text(data)
    print(texts)


    embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
    global_vector_index = Chroma.from_texts(texts, embeddings).as_retriever()

    prompt_template = """
    Answer the question as detailed as possible from the provided context, make sure to provide all the details\n\n
    Context:\n {context}?\n
    Question: \n{question}\n

    Answer:
    """

    prompt = PromptTemplate(template = prompt_template, input_variables = ["context", "question"])

    model = ChatGoogleGenerativeAI(model="gemini-pro",
                                temperature=0.3)


    global_qa_chain = load_qa_chain(model, chain_type="stuff", prompt=prompt)

    return {"status" : "success"}



#qna
@app.post("/qna")
async def qna(question : Annotated[str,Form()]) :
    global global_qa_chain, global_vector_index
    print(question)

    docs = global_vector_index.get_relevant_documents(question)
    print(docs)

    
    if global_qa_chain is None:
        return {"error" : "Please process the document first"}
   
    response = global_qa_chain( {"input_documents":docs, "question": question}
    , return_only_outputs=True)

    return response
    


@app.post("/summarize")
async def summarize() :

    global global_docs

    loader = PyPDFLoader(global_docs)
    data = loader.load_and_split()

    llm = ChatGoogleGenerativeAI(model="gemini-pro",
                                temperature=0.3)
    chain = load_summarize_chain(llm, chain_type="stuff")

    response = chain.run(data)

    return response
