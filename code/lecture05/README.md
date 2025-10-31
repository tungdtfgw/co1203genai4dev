# PDF Chatbot with Embeddings - Lecture 05

This project demonstrates building a comprehensive PDF-based chatbot system using embeddings, FAISS vector search, and Google Gemini AI. The system can extract text from PDFs, create semantic embeddings, and provide an interactive chat interface with text-to-speech capabilities.

## 📚 Project Overview

This is an advanced document processing and chatbot system that combines:
- Text extraction from PDF and DOCX files
- Vector embeddings using sentence transformers
- FAISS vector database for semantic search
- Interactive Streamlit chat interface powered by Google Gemini
- Text-to-speech functionality for accessibility

## 🗂️ Project Structure

```
lecture05/
├── README.md                   # This file
├── requirements.txt            # Python dependencies
├── extract_text.py            # Text extraction from PDF/DOCX files
├── create_embeddings.py       # Generate embeddings and FAISS indices
├── chat_txt_gemini.py         # Main Streamlit chatbot application
├── .streamlit/
│   ├── secrets.toml           # API keys (not in repo)
│   └── template_secrets.toml  # Template for API keys
├── docs/                      # Input PDF/DOCX documents
│   ├── ChuongTrinhBiz.pdf
│   ├── ChuongTrinhGD.pdf
│   ├── ChuongTrinhIT.pdf
│   ├── QuyCheHongBong.pdf
│   └── QuyCheTuyenSinh.pdf
├── chunks/                    # Text chunks from documents
├── bins/                      # FAISS index files

```

## 📄 File Descriptions

### Core Python Files

- **`extract_text.py`**: Utility functions for extracting text from PDF and DOCX files using PyPDF2 and python-docx libraries.

- **`create_embeddings.py`**: 
  - Processes documents in the `docs/` directory
  - Splits text into chunks using RecursiveCharacterTextSplitter
  - Creates vector embeddings using BAAI/bge-m3 model
  - Builds FAISS indices for each document
  - Saves embeddings and chunks for later use

- **`chat_txt_gemini.py`**: 
  - Main Streamlit application
  - Interactive chat interface with Google Gemini AI
  - Processes PDF content for question-answering
  - Includes text-to-speech functionality
  - Streaming response support

### Directories

- **`docs/`**: Place your PDF or DOCX documents here for processing
- **`chunks/`**: Stores text chunks extracted from documents
- **`bins/`**: Contains FAISS vector index files for semantic search
- **`.streamlit/`**: Streamlit configuration and API keys

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure API Keys

Copy the template secrets file and add your API keys:

```bash
cp .streamlit/template_secrets.toml .streamlit/secrets.toml
```

Edit `.streamlit/secrets.toml` and add your actual API keys:

```toml
GOOGLE_API_KEY='your-google-api-key-here'
OPENAI_API_KEY='your-openai-api-key-here'  # Optional
CLAUDE_API_KEY='your-claude-api-key-here'  # Optional
```

### 3. Add Your Documents

Place your PDF or DOCX files in the `docs/` directory:

```bash
# Example: copy your documents
cp /path/to/your/documents/*.pdf docs/
```

## 🏃‍♂️ How to Run

Follow these steps in order:

### Step 1: Extract Text and Create Embeddings

First, process your documents to create embeddings:

```bash
python extract_text.py
python create_embeddings.py
```

This will:
- Extract text from all PDF/DOCX files in `docs/`
- Split text into manageable chunks
- Create vector embeddings using the BGE-M3 model
- Generate FAISS indices for each document
- Save chunks and indices to respective directories

### Step 2: Run the Streamlit Chat Application

Launch the interactive chatbot:

```bash
streamlit run chat_txt_gemini.py
```

The application will be available at `http://localhost:8501`

## 💡 Usage Guide

1. **Document Processing**: The system automatically processes all PDF/DOCX files in the `docs/` directory when you run `create_embeddings.py`

2. **Chat Interface**: 
   - Ask questions about the content in your documents
   - The AI will provide concise, relevant answers based on the document content
   - Responses include text-to-speech audio for accessibility

3. **Features**:
   - Real-time streaming responses
   - Vietnamese text-to-speech support
   - Clean markdown text processing
   - Persistent chat history during session

## 🛠️ Technical Details

### Models and Libraries Used

- **Embedding Model**: BAAI/bge-m3 (multilingual, high-quality embeddings)
- **Vector Database**: FAISS (Facebook AI Similarity Search)
- **LLM**: Google Gemini 2.0 Flash
- **Text Processing**: LangChain RecursiveCharacterTextSplitter
- **TTS**: Google Text-to-Speech (gTTS)

### Hardware Requirements

- **CPU**: Any modern processor
- **Memory**: 4GB+ RAM recommended
- **GPU**: Optional (uses MPS on macOS if available, otherwise CPU)
- **Storage**: Depends on document size and embedding storage

## 🔧 Troubleshooting

### Common Issues

1. **Missing API Key**: Ensure your Google API key is properly set in `.streamlit/secrets.toml`

2. **No Documents Found**: Make sure PDF/DOCX files are in the `docs/` directory

3. **Audio Not Working**: Check internet connection for gTTS or install additional audio dependencies

4. **Memory Issues**: Reduce batch size in `create_embeddings.py` or process fewer documents at once

### Error Solutions

- **Import Errors**: Run `pip install -r requirements.txt` to ensure all dependencies are installed
- **Permission Errors**: Check file permissions for the `docs/`, `chunks/`, and `bins/` directories
- **API Errors**: Verify your API keys are valid and have sufficient quota

## 📝 Notes

- The current implementation focuses on Vietnamese documents but can be adapted for other languages
- Embedding creation may take time depending on document size and hardware
- The system is designed for educational purposes and demonstrations
- For production use, consider adding authentication, rate limiting, and better error handling

## 🔄 Workflow Summary

1. **Extract** → Run `extract_text.py` to extract text from documents
2. **Embed** → Run `create_embeddings.py` to create vector embeddings and FAISS indices  
3. **Chat** → Run `streamlit run chat_txt_gemini.py` to launch the interactive chatbot

This creates a complete RAG (Retrieval-Augmented Generation) system for document-based question answering.