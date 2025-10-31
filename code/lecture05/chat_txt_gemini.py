import streamlit as st
import google.generativeai as genai
import os
import PyPDF2
from typing import List, Optional
from dataclasses import dataclass
from gtts import gTTS
import tempfile
import re
import pyttsx3
import io

# Must be the first Streamlit command
st.set_page_config(
    page_title="PDF Chatbot with Gemini",
    page_icon="📚",
    layout="wide"
)

@dataclass
class Config:
    """Configuration class for the application"""
    MODEL_NAME: str = "gemini-2.0-flash"
    DOCS_DIR: str = "docs"
    SYSTEM_PROMPT: str = """You are a consulting assistant based on PDF content. 
    Please answer questions concisely, focusing on the main points and most important information.
    Maximum 3-4 sentences per answer. Use simple, easy-to-understand language."""

class PDFProcessor:
    """Handles PDF processing operations"""
    def __init__(self, docs_dir: str):
        self.docs_dir = docs_dir

    def get_pdf_files(self) -> List[str]:
        """Get all PDF files from the docs directory"""
        return [
            os.path.join(self.docs_dir, file) 
            for file in os.listdir(self.docs_dir) 
            if file.endswith('.pdf')
        ]

    def extract_text_from_pdf(self, pdf_path: str) -> str:
        """Extract text from a single PDF file"""
        text = ""
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text

    def process_pdfs(self, pdf_paths: List[str]) -> str:
        """Process multiple PDF files and combine their content"""
        return "\n\n".join(
            self.extract_text_from_pdf(path) 
            for path in pdf_paths
        )

class GeminiChatbot:
    """Handles interactions with Gemini API"""
    def __init__(self, api_key: str, model_name: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def get_response(self, context: str, question: str) -> str:
        """Get response from Gemini API"""
        try:
            prompt = f"""PDF Content:\n{context}\n\nQuestion: {question}\n\nInstructions: Answer concisely in 3-4 sentences, focusing on the main points. Use simple language.\n\nAnswer:"""
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error calling API: {str(e)}"
    
    def get_streaming_response(self, context: str, question: str):
        """Get streaming response from Gemini API"""
        try:
            prompt = f"""PDF Content:\n{context}\n\nQuestion: {question}\n\nInstructions: Answer concisely in 3-4 sentences, focusing on the main points. Use simple language.\n\nAnswer:"""
            response = self.model.generate_content(prompt, stream=True)
            return response
        except Exception as e:
            return None

class TextToSpeech:
    """Handles text-to-speech functionality"""
    
    @staticmethod
    def clean_markdown_text(text: str) -> str:
        """Remove markdown symbols and formatting from text"""
        # Remove markdown headers (##, ###, etc.)
        text = re.sub(r'^#{1,6}\s+', '', text, flags=re.MULTILINE)
        
        # Remove code blocks first (```code```)
        text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
        
        # Remove inline code (`code`)
        text = re.sub(r'`([^`]*)`', r'\1', text)
        
        # Remove bold and italic formatting (**text**, *text*, __text__, _text_)
        text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
        text = re.sub(r'\*(.*?)\*', r'\1', text)
        text = re.sub(r'__(.*?)__', r'\1', text)
        text = re.sub(r'_(.*?)_', r'\1', text)
        
        # Remove any remaining isolated asterisks and underscores
        text = re.sub(r'\*+', '', text)
        text = re.sub(r'_+', '', text)
        
        # Remove links [text](url)
        text = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', text)
        
        # Remove simple links
        text = re.sub(r'https?://[^\s]+', '', text)
        
        # Remove strikethrough ~~text~~
        text = re.sub(r'~~(.*?)~~', r'\1', text)
        
        # Remove blockquotes (> text)
        text = re.sub(r'^>\s+', '', text, flags=re.MULTILINE)
        
        # Remove horizontal rules (---, ***, ___)
        text = re.sub(r'^[-*_]{3,}$', '', text, flags=re.MULTILINE)
        
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        
        # Remove special markdown characters that might be read aloud
        text = re.sub(r'[#*_`~\[\](){}|\\]', '', text)
        
        # Remove bullet points and list markers
        text = re.sub(r'^[-*+]\s+', '', text, flags=re.MULTILINE)
        text = re.sub(r'^\d+\.\s+', '', text, flags=re.MULTILINE)
        
        # Remove extra whitespace and newlines
        text = re.sub(r'\n\s*\n', '\n', text)
        text = re.sub(r'\s+', ' ', text)
        
        # Remove any remaining special characters that might cause issues
        text = re.sub(r'[^\w\s\.,!?;:áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ-]', '', text, flags=re.IGNORECASE)
        
        return text.strip()
    
    @staticmethod
    def text_to_audio(text: str, lang: str = 'vi') -> bytes:
        """Convert text to audio and return audio bytes"""
        # Clean text from markdown and other formatting
        clean_text = TextToSpeech.clean_markdown_text(text)
        clean_text = clean_text.strip()
        
        if not clean_text:
            return b""
        
        # Use gTTS as primary method (more reliable)
        try:
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as tmp_file:
                # Create TTS with faster settings
                tts = gTTS(text=clean_text, lang=lang, slow=False, tld='com')
                tts.save(tmp_file.name)
                
                # Check if file was created successfully
                if os.path.exists(tmp_file.name) and os.path.getsize(tmp_file.name) > 0:
                    with open(tmp_file.name, 'rb') as audio_file:
                        audio_bytes = audio_file.read()
                    
                    os.unlink(tmp_file.name)
                    
                    if len(audio_bytes) > 0:
                        return audio_bytes
                
                # Clean up if file exists but is empty
                if os.path.exists(tmp_file.name):
                    os.unlink(tmp_file.name)
                    
        except Exception as e:
            st.error(f"gTTS failed: {str(e)}")
            
        return b""
    
    @staticmethod
    def create_audio_player(text: str, key: str):
        """Create an audio player using Streamlit's native audio component"""
        try:
            # Generate audio bytes
            audio_bytes = TextToSpeech.text_to_audio(text)
            
            if audio_bytes and len(audio_bytes) > 0:
                # Use MP3 format since we're using gTTS
                st.audio(audio_bytes, format='audio/mp3')
            else:
                # Show simple fallback when audio generation fails
                st.caption("🔇 Audio not available")
                
        except Exception as e:
            st.caption("🔇 Audio generation error")
    
    @staticmethod
    def create_streaming_audio_player(text: str, placeholder):
        """Create audio player for streaming text"""
        if len(text.strip()) > 20:  # Only generate audio for meaningful chunks
            try:
                audio_bytes = TextToSpeech.text_to_audio(text)
                if audio_bytes and len(audio_bytes) > 0:
                    with placeholder.container():
                        st.audio(audio_bytes, format='audio/mp3', autoplay=False)
            except Exception:
                pass  # Fail silently for streaming

@st.cache_resource
def init_resources():
    """Initialize all resources with caching"""
    config = Config()
    api_key = st.secrets["GOOGLE_API_KEY"]
    pdf_processor = PDFProcessor(config.DOCS_DIR)
    chatbot = GeminiChatbot(api_key, config.MODEL_NAME)
    tts = TextToSpeech()
    return config, pdf_processor, chatbot, tts

def main():
    st.title("💬 Admissions Chatbot")
    
    # Initialize resources
    config, pdf_processor, chatbot, tts = init_resources()

    # Get PDF files
    pdf_paths = pdf_processor.get_pdf_files()
    if not pdf_paths:
        st.error("No PDF files found in the docs directory!")
        return

    # Process PDFs and cache the content
    @st.cache_data
    def get_pdf_content(pdf_paths: tuple) -> str:
        return pdf_processor.process_pdfs(list(pdf_paths))

    # Convert list to tuple for hashing
    pdf_content = get_pdf_content(tuple(pdf_paths))

    # Chat interface
    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
            
            # Add speaker icon for assistant messages
            if message["role"] == "assistant":
                # Generate audio for the message
                message_key = f"msg_{hash(message['content']) % 1000000}"
                tts.create_audio_player(message["content"], message_key)

    # Chat input
    if prompt := st.chat_input("Enter your question..."):
        # Add user message to chat history
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        # Get and display assistant response
        with st.chat_message("assistant"):
            # Create placeholders for streaming content
            message_placeholder = st.empty()
            audio_placeholder = st.empty()
            
            # Get streaming response
            response_stream = chatbot.get_streaming_response(pdf_content, prompt)
            
            if response_stream:
                full_response = ""
                
                # Stream the response
                for chunk in response_stream:
                    if chunk.text:
                        full_response += chunk.text
                        # Update the message display
                        message_placeholder.markdown(full_response + "▌")
                
                # Remove the cursor and show final response
                message_placeholder.markdown(full_response)
                
                # Generate audio for the complete response
                if full_response.strip():
                    TextToSpeech.create_streaming_audio_player(full_response, audio_placeholder)
                
                # Add to session state
                st.session_state.messages.append({"role": "assistant", "content": full_response})
            else:
                # Fallback to regular response if streaming fails
                with st.spinner("Processing..."):
                    response = chatbot.get_response(pdf_content, prompt)
                    message_placeholder.markdown(response)
                    
                    # Add audio for fallback response
                    TextToSpeech.create_streaming_audio_player(response, audio_placeholder)
                    
                    st.session_state.messages.append({"role": "assistant", "content": response})

if __name__ == "__main__":
    main()