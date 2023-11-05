import os
import pandas as pd
import textract
import matplotlib.pyplot as plt
from transformers import GPT2TokenizerFast
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from dotenv import load_dotenv

load_dotenv()

try:
    def tokenizeDocument(userQuery):
        os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')
        # loader = PyPDFLoader("./context.pdf")
        # pages = loader.load_and_split()
        # chunks = pages
        doc = textract.process("./context.pdf")

        with open('text.txt', 'w') as f:
            f.write(doc.decode('utf-8'))

        with open('text.txt', 'r') as f:
            text = f.read()

        tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

        def count_tokens(text: str) -> int:
            return len(tokenizer.encode(text))

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size = 512,
            chunk_overlap  = 24,
            length_function = count_tokens,
        )

        chunks = text_splitter.create_documents([text])
        type(chunks[0]) 

        embeddings = OpenAIEmbeddings()
        db = FAISS.from_documents(chunks, embeddings)

        query = userQuery

        chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
        docs = db.similarity_search(query)

        result = chain.run(input_documents=docs, question=query)
        print(result)
        return result
except:
    print("Failed to tokenize document")
