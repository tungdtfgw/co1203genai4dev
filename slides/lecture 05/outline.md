## Slide 1 Title Slide
### A Deep Dive into Retrieval-Augmented Generation (RAG)
### Bridging the Gap Between Large Language Models and Real-World Knowledge
### Presenter's Name / Company Name

---

## Slide 2 Agenda
### What We Will Cover Today
#### The Problem: Limitations of Standard LLMs
#### The Solution: What is RAG?
#### Core Concepts: How RAG Works (Indexing & Retrieval)
#### Key Benefits & Real-World Applications
#### The Tech Stack: Tools & Frameworks to Build RAG
#### Future Outlook & Advanced RAG Techniques

---

## Slide 3 The Challenge: Limitations of Standard LLMs
### Standard LLMs are powerful, but they have inherent weaknesses.
### **Knowledge Cutoff:** An LLM's knowledge is frozen at the time of its last training. It knows nothing about events, data, or documents created after that date.
### **Hallucination:** When an LLM doesn't know an answer, it may generate plausible but incorrect or completely fabricated information. This is a major barrier to trust.
### **Lack of Transparency:** It is often impossible to trace *why* an LLM gave a specific answer, as you cannot see the source data it used.

---

## Slide 4 Deep Dive: The Hallucination Problem
### What is a "Hallucination"?
#### An LLM confidently produces a response that is factually incorrect, nonsensical, or not grounded in its training data.
#### This happens because LLMs are designed to predict the next most probable word, not to state facts.

### Why is it a Critical Issue?
#### It erodes user trust and makes LLMs unreliable for fact-based tasks.
#### In enterprise or professional settings (e.g., medical, legal), hallucinations can have severe consequences.

---

## Slide 5 The Solution: What is RAG?
### RAG stands for Retrieval-Augmented Generation.
### It is a technique that enhances an LLM's response by grounding it in external, up-to-date information.
### Instead of just using its internal knowledge, the LLM is given relevant documents to "read" before answering a question.
### **Analogy:** RAG gives an LLM an "open-book" exam, while a standard LLM takes a "closed-book" exam.

---

## Slide 6 RAG High-Level Architecture

### The Two Core Stages
#### **Indexing (Offline):** The process of preparing your knowledge base. Documents are loaded, processed, and stored in a searchable format. This is done once and updated as new information arrives.
#### **Retrieval & Generation (Real-time):** When a user asks a question, the system retrieves relevant information from the knowledge base and provides it to the LLM along with the original question to generate an answer.

* URL: https://www.deepchecks.com/wp-content/uploads/2024/10/img-rag-architecture-model.jpg
---

## Slide 7 The Indexing Pipeline: Preparing Your Data
### Step 1: Data Loading
#### The first step is to load your documents from various sources.
#### Sources can include text files, PDFs, websites, databases, or APIs like Notion and Confluence.

### Step 2: Chunking (or Splitting)
#### Documents are broken down into smaller, semantically meaningful chunks.
#### This is crucial because LLMs have context window limits, and smaller chunks provide more targeted context for retrieval.

### Step 3: Embedding & Storing
#### Each chunk of text is converted into a numerical vector (an "embedding") using an embedding model.
#### These vectors are then stored in a specialized database called a Vector Database for efficient searching.

* URL: https://www.deepchecks.com/wp-content/uploads/2024/10/img-rag-architecture-model.jpg

---

## Slide 8 Focus on Embeddings: The Language of Meaning
### What are Embeddings?
#### Embeddings are numerical representations of text, images, or other data in a high-dimensional space.
#### They capture the semantic meaning of the content. Chunks of text with similar meanings will have vectors that are "close" to each other in this space.

### Why are they important for RAG?
#### They allow us to perform "semantic search" or "similarity search".
#### Instead of matching keywords, we can match concepts and meanings, leading to much more relevant search results.

* URL: https://storage.googleapis.com/coderzcolumn/static/tutorials/artificial_intelligence/word_embeddings.jpg

---

## Slide 9 Focus on Vector Databases
### The "Brain" of the Retriever
#### A vector database is designed specifically to store and search through billions of vector embeddings at high speed.
#### It uses algorithms like Approximate Nearest Neighbor (ANN) to find the vectors most similar to a given query vector almost instantly.

### Popular Vector Databases
#### **Managed Services:** Pinecone, Weaviate
#### **Open-Source Libraries/Databases:** FAISS (from Meta), ChromaDB, Milvus

* URL: https://www.infracloud.io/assets/img/blog/vector-databases-primer/vector-databases-landscape.png
---

## Slide 10 The Inference Pipeline: Answering a User Query
### Step 1: User Query
#### The process begins when a user submits a prompt or question.

### Step 2: Query Embedding
#### The user's query is converted into a vector embedding using the *same* model that was used during indexing.

### Step 3: Vector Search (Retrieval)
#### The system searches the vector database to find the text chunks whose embeddings are most similar to the query embedding. These are the "context" documents.

### Step 4: Prompt Augmentation & Generation
#### The original query and the retrieved context documents are combined into a single, augmented prompt.
#### This prompt is sent to the LLM, which then generates a final answer based on the provided information.

* URL: https://www.deepchecks.com/wp-content/uploads/2024/10/img-rag-architecture-model.jpg
---

## Slide 11 Key Benefits of RAG
### Accuracy & Reliability
#### By grounding responses in factual, source documents, RAG significantly reduces hallucinations and improves the accuracy of the answers.

### Always Up-to-Date
#### You can easily update the knowledge base with new information without the costly process of retraining the entire LLM. The system's knowledge can be as fresh as your latest document.

### Transparency & Trust
#### RAG systems can cite their sources, showing the user exactly which documents were used to generate the answer. This explainability is crucial for building user trust.

---

## Slide 12 Application 1: Intelligent Customer Support
### The Problem
#### Customers have to wait for human agents; agents spend time answering repetitive questions. Standard bots lack a deep understanding of the product.

### The RAG Solution
#### A chatbot powered by RAG can access the entire knowledge base of product manuals, FAQs, and past support tickets.
#### It provides instant, accurate, and context-aware answers 24/7, with citations to the source documents for verification.

* URL: https://www.kommunicate.io/blog/wp-content/uploads/2023/12/How-chatbots-improves-customer-service.jpg

---

## Slide 13 Application 2: Enterprise Knowledge Management
### The Problem
#### Employees waste significant time searching for information scattered across internal wikis (Confluence), document repositories (SharePoint), and chat logs (Slack).

### The RAG Solution
#### A unified, conversational search interface that allows employees to ask questions in natural language.
#### The system retrieves precise answers from multiple sources, summarizes them, and points to the original documents, boosting productivity.

---

## Slide 14 Application 3: Personal Research Assistant
### The Problem
#### Researchers, students, and writers spend hours sifting through dense articles, papers, and books to find relevant information.

### The RAG Solution
#### Users can upload a collection of research papers or provide links to sources.
#### The RAG system allows them to "chat" with their documents, asking complex questions, requesting summaries, and finding cross-references instantly.

* URL: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwqhnjfOhBvIkdaXAPu4OPyp7_mVifEXBWuw&s
---

## Slide 15 The RAG Technology Stack
### Orchestration Frameworks
#### **LangChain & LlamaIndex:** High-level frameworks that provide tools and abstractions to simplify building the entire RAG pipeline, from data loading to generation.

### Core Components
#### **Embedding Models:** Provided by services like OpenAI, Cohere, or available as open-source models on Hugging Face.
#### **Vector Databases:** Pinecone, Chroma, FAISS, Weaviate.
#### **LLMs (Generators):** Models from OpenAI (GPT series), Anthropic (Claude series), Google (Gemini series), or open-source models like Llama.

---

## Slide 16 Advanced RAG Techniques
### Improving the RAG pipeline is an active area of research.
### **Query Transformations:** Re-writing the user's query to be more optimal for retrieval.
### **Advanced Chunking:** Using more intelligent methods to split documents to preserve their meaning.
### **Re-ranking:** Using a secondary, more powerful model to re-rank the initial search results for better relevance before sending them to the LLM.
### **Hybrid Search:** Combining traditional keyword search (like BM25) with semantic vector search to get the best of both worlds.

---

## Slide 17 The Future of RAG
### Tighter Integration with LLMs
#### Future models may have retrieval capabilities built-in, making the process more seamless.
#### Expect more sophisticated reasoning over retrieved documents.

### Agentic RAG
#### RAG systems will evolve into autonomous agents that can decide *when* to search, *what* to search for, and how to use the retrieved information to accomplish a task.

### Multi-Modal RAG
#### The ability to retrieve and reason over not just text, but also images, audio, and video data to answer questions.

---

## Slide 18 Code Example: A Simple RAG Pipeline with LangChain
### This code demonstrates the core logic of a RAG chain.
#### **Step 1: Setup:** We install libraries and initialize our core components: the LLM, the embedding model, and a document loader.
#### **Step 2: Indexing:** We load a document, split it into chunks, and store it in a FAISS vector store. This process creates our retriever.
#### **Step 3: Chain Creation:** We define a prompt template and create a "retrieval chain" that links the user input, the retriever, and the LLM.
#### **Step 4: Invocation:** We ask a question. The chain automatically handles retrieving context and generating an answer based on it.

### Code Illustration
```python
# main.py
# Yêu cầu cài đặt: pip install langchain langchain-openai faiss-cpu beautifulsoup4
import os
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# --- BƯỚC 1: THIẾT LẬP MÔI TRƯỜNG VÀ CÁC THÀNH PHẦN ---
# Ghi chú: Cần có API key của OpenAI trong biến môi trường
# os.environ["OPENAI_API_KEY"] = "YOUR_API_KEY"
llm = ChatOpenAI(model="gpt-3.5-turbo")
embeddings = OpenAIEmbeddings()

# --- BƯỚC 2: QUÁ TRÌNH INDEXING (CHUẨN BỊ DỮ LIỆU) ---
# Tải tài liệu từ một nguồn web
loader = WebBaseLoader("[https://docs.smith.langchain.com/user_guide](https://docs.smith.langchain.com/user_guide)")
docs = loader.load()

# Tách tài liệu thành các đoạn nhỏ (chunks)
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
documents = text_splitter.split_documents(docs)

# Tạo embedding cho các chunks và lưu vào vector store (FAISS)
# Vector store này sẽ đóng vai trò là retriever
vector_store = FAISS.from_documents(documents, embeddings)
retriever = vector_store.as_retriever()

# --- BƯỚC 3: TẠO RAG CHAIN ---
# Tạo một prompt template để hướng dẫn LLM trả lời dựa trên context
prompt_template = """Chỉ trả lời câu hỏi dựa trên context được cung cấp dưới đây.
Nếu không tìm thấy câu trả lời trong context, hãy nói 'Tôi không tìm thấy thông tin trong tài liệu.'

<context>
{context}
</context>

Câu hỏi: {input}"""
prompt = ChatPromptTemplate.from_template(prompt_template)

# Tạo một chain để kết hợp các tài liệu (context) lại
document_chain = create_stuff_documents_chain(llm, prompt)

# Tạo retrieval chain chính, kết hợp retriever và document_chain
retrieval_chain = create_retrieval_chain(retriever, document_chain)

# --- BƯỚC 4: THỰC THI CHAIN VÀ ĐẶT CÂU HỎI ---
question = "how can langsmith help with testing?"
response = retrieval_chain.invoke({"input": question})

print("Câu trả lời từ RAG chain:")
print(response["answer"])

```

-----

## Slide 19 Summary & Key Takeaways

### LLMs are powerful but have key limitations (knowledge cutoff, hallucinations).

### RAG solves these issues by grounding LLMs in external, verifiable knowledge.

### The process involves two phases: offline Indexing and real-time Retrieval & Generation.

### RAG enables more accurate, trustworthy, and up-to-date AI applications, unlocking enterprise potential.

### The RAG tech stack includes embedding models, vector databases, LLMs, and orchestration frameworks like LangChain.

---

## Slide 20 Tutorial Overview
### What We Will Build
#### A complete Retrieval-Augmented Generation (RAG) chatbot.
#### The chatbot will answer questions based on knowledge from your own PDF and DOCX files.
#### We will build an interactive web interface using Streamlit.

### Key Learning Objectives
#### Understand the end-to-end RAG pipeline.
#### Learn to process documents, create vector embeddings, and perform semantic search.
#### Integrate a powerful LLM (Google Gemini) and build a user-friendly UI.

---

## Slide 21 Core Technologies & Concepts
### The Tech Stack
#### **Vector Embeddings:** `BAAI/bge-m3` for creating semantic text representations.
#### **Vector Database:** `FAISS` for efficient similarity searches.
#### **LLM:** `Google Gemini` for generating intelligent responses.
#### **Document Processing:** `LangChain`, `PyPDF2`, `python-docx`.
#### **Web UI:** `Streamlit` for building the interactive chat application.

---

## Slide 22 System Architecture
### How It All Connects
#### **Offline Processing (Indexing):** Documents are extracted, chunked, converted to embeddings, and stored in a FAISS index.
#### **Online Processing (Inference):** A user query is embedded and used to search the FAISS index for relevant chunks.
#### **Generation:** The relevant chunks (context) and the query are sent to Gemini to generate the final answer.
#### **User Interface:** Streamlit handles user interaction and displays the results.

---

## Slide 23 Step 1: Project Setup & Prerequisites
### Folder Structure
#### **docs/:** Place your source PDF and DOCX files here.
#### **chunks/:** Stores the processed text chunks from your documents.
#### **bins/:** Stores the generated FAISS index files for fast retrieval.
#### **Python Scripts:** `extract_text.py`, `create_embeddings.py`, `chat_txt_gemini.py`.

### Installing Dependencies
#### All required Python libraries are listed in `requirements.txt`.
#### Install them easily using a single command in your terminal: `pip install -r requirements.txt`.

---

## Slide 24 Step 2: Text Extraction
### Code Deep Dive: `extract_text.py`
#### The script uses dedicated functions to read text from different file types.
#### It intelligently routes the file to the correct function based on its extension.

### Code Snippet & Explanation
```python
# extract_text.py
from PyPDF2 import PdfReader
from docx import Document

def extract_text_from_pdf(file_path):
    # Open the PDF file and read each page
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text

def extract_text_from_docx(file_path):
    # Open the DOCX file and read each paragraph
    doc = Document(file_path)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text
````

#### **Explanation:** Each function opens a specific file type, iterates through its components (pages or paragraphs), extracts the text, and concatenates it into a single string.

---

## Slide 25 Step 3: Text Chunking

### Code Deep Dive: `RecursiveCharacterTextSplitter`

#### We use LangChain's smart splitter to break down the extracted text into manageable chunks.

#### This is crucial for fitting the text into the model's context window and for precise retrieval.

### Code Snippet & Explanation

```python
# create_embeddings.py
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # Max size of each chunk
    chunk_overlap=50,      # Number of overlapping characters between chunks
    length_function=len,
    separators=["\n\n", "\n", " ", ""] # Prioritize splitting by newlines, sentences
)
```

#### **Explanation:**

#### **`chunk_size=500`**: Each chunk will have a maximum of 500 characters.

#### **`chunk_overlap=50`**: The last 50 characters of a chunk will be the first 50 characters of the next to ensure no context is lost at the split point.

#### **`separators`**: The priority order for splitting text, starting from paragraphs (`\n\n`) down to single characters.

-----

## Slide 26 Step 4: The Embedding Process

### Code Deep Dive: `create_embeddings.py` (Part 1 - Loop & Encode)

#### This script is the core of the offline processing pipeline.

#### It iterates through documents, chunks the text, and then encodes these chunks into vectors.

### Code Snippet & Explanation

```python
# create_embeddings.py
model = SentenceTransformer('BAAI/bge-m3')
doc_dir = 'docs'

for file_name in os.listdir(doc_dir):
    file_path = os.path.join(doc_dir, file_name)
    
    # 1. Extract text (using the created module)
    text = extract_text_from_file(file_path)
    
    # 2. Split text into chunks
    chunks = text_splitter.split_text(text)
    
    # 3. Encode chunks into vector embeddings
    embeddings = model.encode(
        chunks, 
        show_progress_bar=True, 
        batch_size=32
    )
```

#### **Explanation:**

#### 1\. **`extract_text_from_file`**: Calls the function from the previous slide to get the full text from the file.

#### 2\. **`text_splitter.split_text`**: Uses the configured splitter object to divide the text into a list of chunks.

#### 3\. **`model.encode`**: The `bge-m3` model converts the list of text chunks into a NumPy array of vector embeddings.

-----

## Slide 27 Step 5: Indexing with FAISS

### Code Deep Dive: `create_embeddings.py` (Part 2 - Index & Save)

#### After creating embeddings, we need to store them in a way that allows for fast searching.

#### We use FAISS to create a searchable index for each document's embeddings.

### Code Snippet & Explanation

```python
# create_embeddings.py (continued)

# 4. Create FAISS Index
dimension = embeddings.shape[1]      # Get the vector dimension (1024)
index = faiss.IndexFlatL2(dimension) # Initialize the index
index.add(np.array(embeddings))      # Add the embeddings to the index

# 5. Save the index and chunks
bin_file = os.path.join('bins', f'faiss_index_{file_name}.bin')
faiss.write_index(index, bin_file)

chunk_file = os.path.join('chunks', f'chunks_{file_name}.txt')
with open(chunk_file, 'w', encoding='utf-8') as f:
    for chunk in chunks:
        f.write(chunk + '\n---\n')
```

#### **Explanation:**

#### 4\. **`faiss.IndexFlatL2`**: Creates a simple index that performs an exact search based on L2 (Euclidean) distance.

#### 5\. **`faiss.write_index`**: Saves the created index structure to a `.bin` file so it can be reloaded later. We also save the corresponding text chunks.

-----

## Slide 28 Step 6: The Retrieval Logic

### How to Find Relevant Information

#### The goal is to take a user's question, embed it, and use that vector to find the most similar chunks in our FAISS index.

#### This process is called "semantic search".

-----

## Slide 29 Code Deep Dive: Semantic Search

### Implementing the `search` Method

#### This function is the heart of the retrieval system.

#### It searches across all document indices and returns the top `k` most relevant chunks overall.

### Code Snippet & Explanation

```python
# From README.md, part of VectorSearchManager
def search(self, query, k=5):
    # 1. Encode the user's query
    query_embedding = self.model.encode([query])
    
    all_results = []
    # 2. Iterate through all loaded indices
    for key, index in self.indices.items():
        # 3. Search within the current index
        distances, indices_found = index.search(query_embedding, k=k)
        
        for distance, idx in zip(distances[0], indices_found[0]):
            # Get the corresponding chunk and add it to the results
            all_results.append((distance, self.chunks_dict[key][idx]))
    
    # 4. Sort all results and return the top K
    all_results.sort(key=lambda x: x[0])
    return [chunk for _, chunk in all_results[:k]]
```

#### **Explanation:**

#### 1\. **`model.encode`**: Converts the query into a vector.

#### 2\. **Loop**: Searches through each indexed document file one by one.

#### 3\. **`index.search`**: The core FAISS function, which returns the distances and indices of the nearest vectors.

#### 4\. **Sort**: Aggregates results from all files, sorts them by distance (smaller is better), and returns the content of the best chunks.

-----

## Slide 30 Step 7: The Generation Logic

### Augmenting the Prompt for the LLM

#### We don't just ask the LLM the user's question.

#### Instead, we create an "augmented prompt" that includes the relevant chunks we just retrieved.

#### This grounds the model, forcing it to answer based on our documents.

-----

## Slide 31 Code Deep Dive: Prompting Gemini

### Crafting the Perfect Prompt

#### The prompt's structure is key to getting high-quality, factual answers.

#### It contains the retrieved context, the user's question, and specific instructions for the model.

### Code Snippet & Explanation

```python
# chat_txt_gemini.py
class GeminiChatbot:
    def get_response(self, context: str, question: str) -> str:
        # Build the detailed prompt
        prompt = f"""PDF Content:\n{context}\n\nQuestion: {question}\n\nInstructions: Answer briefly in 3-4 sentences, focusing on the main points. Use simple language.\n\nAnswer:"""
        
        # Call the Gemini API
        response = self.model.generate_content(prompt)
        return response.text
```

#### **Explanation:**

#### **`PDF Content:\n{context}`**: This part injects all the relevant text chunks that were retrieved.

#### **`Question: {question}`**: This injects the user's original question.

#### **`Instructions:...`**: This provides clear instructions to the LLM on how it should format the answer (brief, simple).

-----

## Slide 32 Step 8: Building the Streamlit UI

### Creating the User Interface

#### Streamlit makes it easy to create an interactive chat application.

#### The core of the app is a loop that waits for user input, processes it, and displays the result.

-----

## Slide 33 Code Deep Dive: Streamlit Main Loop

### Tying It All Together

#### This is the main function that orchestrates the entire user-facing process.

### Code Snippet & Explanation

```python
# chat_txt_gemini.py
def main():
    st.title("💬 Admissions Chatbot")
    
    # ... (initialize components) ...
    
    # Get input from the user
    if prompt := st.chat_input("Enter your question..."):
        # Add the user's message to the chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        
        # Display the user's message
        with st.chat_message("user"):
            st.markdown(prompt)

        # Display the assistant's response
        with st.chat_message("assistant"):
            # 1. Search for context (Assuming search_manager is created)
            relevant_chunks = search_manager.search(prompt)
            context = "\n\n".join(relevant_chunks)
            
            # 2. Generate a response from the LLM
            response = chatbot.get_response(context, prompt)
            
            # 3. Display the response
            st.markdown(response)
```

#### **Explanation:**

#### 1\. **`st.chat_input`**: Waits for the user to enter a question.

#### 2\. **`search_manager.search`**: Calls the information retrieval logic we built.

#### 3\. **`chatbot.get_response`**: Sends the context and question to Gemini to get an answer.

#### 4\. **`st.markdown`**: Displays the final answer to the user.

-----

## Slide 34 Step 9: Running the Application

### Two Simple Steps

#### **1. Create Embeddings (One-time setup):**

#### This script processes all your documents and builds the FAISS indices.

```bash
python create_embeddings.py
```

#### **2. Launch the Chatbot App:**

#### This command starts the Streamlit web server.

```bash
streamlit run chat_txt_gemini.py
```

#### **API Key Configuration:** Remember to create a `.streamlit/secrets.toml` file to store your `GOOGLE_API_KEY`.

-----

## Slide 35 Performance & Troubleshooting

### How to Optimize

#### **Embedding Model:** `BAAI/bge-m3` is a good choice for quality and multilingual support.

#### **FAISS Index Type:** `IndexFlatL2` is suitable for small datasets, but consider `IndexIVFFlat` for larger ones to speed up searches.

#### **Chunking Strategy:** Adjusting `chunk_size` and `chunk_overlap` can significantly improve retrieval quality.

### Common Issues

#### **Memory Errors:** Reduce the `batch_size` during embedding generation.

#### **Poor Results:** Experiment with different chunking strategies or refine the prompt.

-----

## Slide 36 Conclusion and Next Steps

### What We've Accomplished

#### Built a fully functional RAG chatbot from scratch.

#### Implemented a complete pipeline: document processing, embedding, indexing, retrieval, and generation.

#### Created an interactive and user-friendly web interface.

### How to Improve

#### **Hybrid Search:** Combine vector search with traditional keyword search for better accuracy.

#### **Scalability:** For larger applications, migrate from FAISS to a dedicated vector database like PostgreSQL with `pgvector`.

#### **Enhanced UI:** Add a feature to display the source chunks for each answer to increase transparency.
