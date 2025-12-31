import os
from typing import List
from langchain_community.document_loaders import PyPDFLoader, TextLoader, UnstructuredMarkdownLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()

class RAGService:
    def __init__(self):
        self.persist_directory = "data/chroma_db"
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        self.vector_store = None
        self._init_vector_store()

    def _init_vector_store(self):
        if not os.path.exists("data"):
            os.makedirs("data")
        
        self.vector_store = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings
        )

    def add_document(self, file_path: str):
        loader = None
        if file_path.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        elif file_path.endswith(".md"):
            loader = UnstructuredMarkdownLoader(file_path)
        elif file_path.endswith(".txt"):
            loader = TextLoader(file_path)
        
        if not loader:
            raise ValueError(f"Unsupported file type: {file_path}")

        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
        chunks = text_splitter.split_documents(documents)
        
        self.vector_store.add_documents(chunks)
        self.vector_store.persist()

    def query(self, user_query: str) -> str:
        # Simple retrieval for now - can be expanded with more advanced chains
        docs = self.vector_store.similarity_search(user_query, k=3)
        context = "\n\n".join([doc.page_content for doc in docs])
        return context

rag_service = RAGService()
