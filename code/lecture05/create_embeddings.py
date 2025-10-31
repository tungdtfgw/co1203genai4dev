from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import torch
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
from extract_text import extract_text_from_file

# Choose device: MPS if available, otherwise CPU
device = 'mps' if torch.backends.mps.is_available() else 'cpu'
print(f"Using device: {device}")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500, chunk_overlap=50, length_function=len, separators=["\n\n", "\n", " ", ""]
)

# Load model
model = SentenceTransformer('BAAI/bge-m3')

# Directory containing documents and bin files
doc_dir = 'docs'
bin_dir = 'bins'
chunk_dir = 'chunks'

# Process each document
for file_name in os.listdir(doc_dir):
    print(f"Processing document: {file_name}")
    file_path = os.path.join(doc_dir, file_name)
    if file_name.endswith('.pdf') or file_name.endswith('.docx'):
        # Extract and split text (using previous code)
        text = extract_text_from_file(file_path)
        chunks = text_splitter.split_text(text)
        
        # Create embeddings
        embeddings = model.encode(chunks, show_progress_bar=True, batch_size=32)
        
        # Create FAISS index for this document
        dimension = embeddings.shape[1]  # 1024 with bge-m3
        index = faiss.IndexFlatL2(dimension)
        index.add(np.array(embeddings))
        
        # Save to separate file
        bin_file = os.path.join(bin_dir, f'faiss_index_{file_name}.bin')
        faiss.write_index(index, bin_file)
        
        # Save chunks separately (if needed)
        chunk_file = os.path.join(chunk_dir, f'chunks_{file_name}.txt')
        with open(chunk_file, 'w', encoding='utf-8') as f:
            for chunk in chunks:
                f.write(chunk + '\n---\n')

    print(f"Done with {file_name}!")