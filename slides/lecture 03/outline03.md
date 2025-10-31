Slide 1 - template 1 text-only content
Title: Lecture 3 – Multimedia in Gemini API
Heading 1: Exploring multimodal capabilities (images, speech, audio & documents)
Heading 2: Hands‑on examples and best practices
Heading 3: Prerequisites: Gemini API key & SDKs
Slide 2 - template 6 text-list-2-levels
Title: Overview of Gemini Multimedia API
Heading 1: Image generation overview
*** Text‑to‑image, editing and composition
ai.google.dev

*** Iterative refinement & high‑fidelity text rendering
ai.google.dev
Heading 2: Image understanding
*** Captioning, classification & visual Q&A
ai.google.dev

*** Input via inline bytes or Files API
ai.google.dev
Heading 3: Speech generation
*** Single & multi‑speaker TTS
ai.google.dev

*** Controllable style, tone & pace
ai.google.dev
Heading 4: Audio & document understanding
*** Audio summarization, transcription & timestamp queries
ai.google.dev
ai.google.dev

*** PDF analysis, Q&A & long‑document summaries
ai.google.dev
Slide 3 - template 1 text-only content
Title: Gemini Multimodal AI
Heading 1: Unified model for text, image, audio & documents
Heading 2: Works conversationally – input can mix modalities
ai.google.dev
Heading 3: Suitable for creative & analytical tasks
Slide 4 - template 6 text-list-2-levels
Title: Image Generation Capabilities
Heading 1: Text‑to‑Image
*** Generate high‑quality images from descriptive text
ai.google.dev

*** Use narrative prompts rather than keyword lists
ai.google.dev

*** SynthID watermark on all generated images
ai.google.dev
Heading 2: Image + Text Editing
*** Provide an input image and a text prompt to modify elements
ai.google.dev

*** Change style, color or add/remove objects
ai.google.dev

*** Rights & safety: only upload images you own
ai.google.dev
Heading 3: Multi‑Image Composition
*** Combine multiple images for new scenes or style transfer
ai.google.dev

*** Supports interleaving image & text in outputs
ai.google.dev

*** Multi‑turn conversations to iteratively refine results
ai.google.dev
ai.google.dev
Heading 4: High‑fidelity text & diagrams
*** Generate images with accurate text placement (logos, posters)
ai.google.dev

*** Use high‑resolution models like Gemini 2.5 Flash Image
*** Ideal for instructional graphics & diagrams
Slide 5 - template 5-code
Title: Text‑to‑Image Example (Python)
Heading 1: Create a client and request an image
Heading 2: Saving the generated image
Code minh họa
from google import genai
from PIL import Image
from io import BytesIO

client = genai.Client()
prompt = "A futuristic city skyline at sunrise with flying cars"

response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents=[prompt],
)

for part in response.candidates[0].content.parts:
    if part.inline_data:
        image = Image.open(BytesIO(part.inline_data.data))
        image.save("city_sunrise.png")
        print("Image saved.")
Slide 6 - template 1 text-only content
Title: Prompting Strategies for Images
Heading 1: Describe scenes, not just keywords
ai.google.dev
Heading 2: Use photography terms for realism (angles, lenses, lighting)
ai.google.dev
Heading 3: Template: shot type, subject, environment & mood
ai.google.dev
Heading 4: Provide aspect ratio & style details
Slide 7 - template 6 text-list-2-levels
Title: Advanced Image Generation & Editing
Heading 1: Editing & style transfer
*** Use text & image inputs to edit existing photos
ai.google.dev

*** Combine multiple images for composition & style transfer
ai.google.dev

*** Interleaved outputs: images mixed with text
ai.google.dev
Heading 2: Multi‑turn image editing
*** Keep refining images through conversation
ai.google.dev

*** Example: upload a car, convert to convertible, change color
ai.google.dev

*** Great for design iterations
Heading 3: Rights & Prohibited use
*** Only upload images you have rights to
ai.google.dev

*** Do not generate harmful or deceptive content
ai.google.dev

*** All images are watermarked via SynthID
ai.google.dev
Heading 4: Size & modality limits
*** Inline image data must keep total request under 20 MB
ai.google.dev

*** Use Files API for large images or repeated use
ai.google.dev

*** Combine images and text in a single prompt
ai.google.dev
Slide 8 - template 5-code
Title: Image Editing Example (Python)
Heading 1: Edit a cat photo using a descriptive prompt
Heading 2: Save the modified image
Code minh họa
from google import genai
from google.genai import types
from PIL import Image
from io import BytesIO

client = genai.Client()
prompt = "Make the cat wear a red astronaut helmet and floating in space"
image = Image.open("cat.png")

response = client.models.generate_content(
    model="gemini-2.5-flash-image-preview",
    contents=[prompt, image],
)

for part in response.candidates[0].content.parts:
    if part.inline_data:
        edited = Image.open(BytesIO(part.inline_data.data))
        edited.save("cat_astronaut.png")
Slide 9 - template 6 text-list-2-levels
Title: Image Understanding
Heading 1: Image understanding tasks
*** Captioning and describing images
ai.google.dev

*** Classification & object detection
ai.google.dev

*** Visual question answering & segmentation
ai.google.dev
Heading 2: Passing images to Gemini
*** Inline bytes for small files (<20 MB)
ai.google.dev

*** Upload using Files API for large or reusable images
ai.google.dev
ai.google.dev

*** Accepts Base64 strings or file references
ai.google.dev
ai.google.dev
Heading 3: Multi‑image prompting
*** Include multiple images in one prompt
ai.google.dev

*** Mix uploaded files and inline data
ai.google.dev

*** Ask the model to compare images or find differences
Heading 4: Enhanced models
*** Gemini 2.x improves object detection & segmentation accuracy
ai.google.dev

*** Use appropriate model variant (e.g., 2.5 Flash) for best results
*** Supports long context prompts
Slide 10 - template 5-code
Title: Image Captioning Example
Heading 1: Provide an inline image and ask for a caption
Heading 2: Reading the caption result
Code minh họa
from google import genai
from google.genai import types

client = genai.Client()
with open('picture.jpg', 'rb') as f:
    image_bytes = f.read()

contents = [
    types.Part.from_bytes(data=image_bytes, mime_type='image/jpeg'),
    'Caption this image.'
]
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=contents
)
print(response.text)
Slide 11 - template 6 text-list-2-levels
Title: Using the Files API for Images
Heading 1: Using the Files API for images
*** Upload large images once and reuse them
ai.google.dev

*** Code: client.files.upload(file="path/to/image")
ai.google.dev

*** Refer to uploaded file in subsequent prompts
ai.google.dev
Heading 2: Mixing inline and uploaded images
*** Combine a file reference with another image bytes
ai.google.dev

*** Useful for side‑by‑side comparisons or differences
ai.google.dev

*** Ask: “What is different between these two images?”
ai.google.dev
Heading 3: Best practices
*** Keep inline data small (under 20 MB total)
ai.google.dev

*** Use Base64 encoding for inline images
ai.google.dev

*** Use descriptive prompts for complex tasks
ai.google.dev
Heading 4: Transition to audio
*** Next: generating & understanding speech and audio
*** Similar structure: upload vs inline; summarization & transcription
*** Demo codes follow
Slide 12 - template 1 text-only content
Title: Speech Generation (TTS) Overview
Heading 1: Convert text into high‑quality audio
ai.google.dev
Heading 2: Single‑ and multi‑speaker modes
ai.google.dev
ai.google.dev
Heading 3: Controlling style via natural language
ai.google.dev
Slide 13 - template 6 text-list-2-levels
Title: Text-to-Speech Configuration
Heading 1: Single‑speaker TTS
*** Use response modality "audio" and SpeechConfig
ai.google.dev

*** Choose a prebuilt voice (e.g., Kore, Zephyr)
ai.google.dev
ai.google.dev

*** Outputs audio‑only; accepts only text input
ai.google.dev
Heading 2: Multi‑speaker TTS
*** Configure MultiSpeakerVoiceConfig with up to 2 speakers
ai.google.dev

*** Speaker names must match the names in the prompt
ai.google.dev

*** Each speaker can use a different voice
ai.google.dev
Heading 3: Controlling style & tone
*** Modify style, accent, pace via natural language prompts
ai.google.dev

*** Provide instructions per speaker in multi‑speaker prompts
ai.google.dev

*** Select voices that match the desired emotion
ai.google.dev
Heading 4: Supported voices & languages
*** 30 voice options from Kore to Zephyr
ai.google.dev

*** Supports 24 languages (e.g., English, Vietnamese, Thai)
ai.google.dev

*** Choose model variant (Flash Preview or Pro Preview)
ai.google.dev
Slide 14 - template 5-code
Title: TTS Single‑Speaker Example
Heading 1: Set up client and voice configuration
Heading 2: Save audio output
Code minh họa
from google import genai
from google.genai import types
import wave

client = genai.Client()
response = client.models.generate_content(
    model="gemini-2.5-flash-preview-tts",
    contents="Say cheerfully: Have a wonderful day!",
    config=types.GenerateContentConfig(
        response_modalities=["AUDIO"],
        speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
                prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name='Kore')
            )
        ),
    )
)
pcm = response.candidates[0].content.parts[0].inline_data.data
with wave.open("hello.wav", "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(24000)
    wf.writeframes(pcm)
Slide 15 - template 5-code
Title: TTS Multi‑Speaker Example
Heading 1: Define a conversation with two speakers
Heading 2: Configure different voices per speaker
Code minh họa
from google import genai
from google.genai import types
import wave

client = genai.Client()
prompt = """TTS the following conversation between Joe and Jane:\nJoe: How's it going today Jane?\nJane: Not too bad, how about you?"""

config = types.GenerateContentConfig(
    response_modalities=["AUDIO"],
    speech_config=types.SpeechConfig(
        multi_speaker_voice_config=types.MultiSpeakerVoiceConfig(
            speaker_voice_configs=[
                types.SpeakerVoiceConfig(
                    speaker='Joe',
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name='Kore')
                    )
                ),
                types.SpeakerVoiceConfig(
                    speaker='Jane',
                    voice_config=types.VoiceConfig(
                        prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name='Puck')
                    )
                )
            ]
        )
    )
)
response = client.models.generate_content(
    model="gemini-2.5-flash-preview-tts",
    contents=prompt,
    config=config
)
audio_data = response.candidates[0].content.parts[0].inline_data.data
with wave.open("conversation.wav", "wb") as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(24000)
    wf.writeframes(audio_data)
Slide 16 - template 6 text-list-2-levels
Title: TTS Limitations & Best Practices
Heading 1: TTS limitations & context
*** Models only accept text and output audio
ai.google.dev

*** Context window limited to 32k tokens
ai.google.dev

*** TTS is currently a preview feature; check supported models
ai.google.dev
Heading 2: Voice & language selection
*** Choose from 30 voices (e.g., Kore, Puck, Zephyr)
ai.google.dev

*** Automatic language detection; 24 languages supported
ai.google.dev

*** Use AI Studio to hear voices before choosing
ai.google.dev
Heading 3: Best practices
*** Write natural prompts to control style & tone
ai.google.dev

*** Name speakers consistently in multi‑speaker prompts
ai.google.dev

*** Ensure you have rights to any input transcripts or scripts
Heading 4: Transition to audio understanding
*** Next: analyze existing audio clips
*** Use similar upload vs inline methods
*** Ask for summaries, transcripts & more
Slide 17 - template 6 text-list-2-levels
Title: Audio Understanding Overview
Heading 1: Audio understanding tasks
*** Describe or summarize audio clips
ai.google.dev

*** Provide transcripts of speech
ai.google.dev

*** Analyze specific segments via timestamps
ai.google.dev
Heading 2: Providing audio inputs
*** Upload audio files using the Files API ( >20 MB )
ai.google.dev

*** Pass inline audio data for small files
ai.google.dev

*** Use supported formats like WAV, MP3, AIFF, OGG & FLAC
ai.google.dev
Heading 3: Requesting summaries & Q&A
*** Ask open‑ended questions about the audio
ai.google.dev

*** Request a complete transcript or partial transcript
ai.google.dev

*** Combine audio and text prompts for context
Heading 4: Technical considerations
*** Each second of audio ≈32 tokens
ai.google.dev

*** Max combined audio length: 9.5 hours
ai.google.dev

*** Audio is downsampled and mixed to mono
ai.google.dev
Slide 18 - template 5-code
Title: Audio Summarization Example
Heading 1: Upload an MP3 file and ask for a description
Heading 2: Display the model’s response
Code minh họa
from google import genai

client = genai.Client()
# Upload audio file
myfile = client.files.upload(file="lecture.mp3")
# Ask the model to describe the clip
response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=["Summarize the main points", myfile]
)
print(response.text)
Slide 19 - template 6 text-list-2-levels
Title: Advanced Audio Features
Heading 1: Advanced audio features
*** Refer to timestamps in prompts (e.g., 02:30–03:29)
ai.google.dev

*** Count tokens in audio files using count_tokens
ai.google.dev

*** Mix multiple audio files in one request (total ≤9.5 h)
ai.google.dev
Heading 2: Error handling & limits
*** Use Files API if total request size >20 MB
ai.google.dev

*** Unsupported formats will be rejected
ai.google.dev

*** Long prompts near context limit may truncate responses
ai.google.dev
Heading 3: Use cases & examples
*** Podcast or lecture summarization
*** Customer service call transcription & analysis
*** Birdsong or environmental audio description
ai.google.dev
Heading 4: Transition to document understanding
*** Next: processing PDFs & other documents
*** Similar upload vs inline modes
*** Enables Q&A on document content
Slide 20 - template 1 text-only content
Title: Document Understanding Overview
Heading 1: Process PDFs with native vision
ai.google.dev
Heading 2: Analyze text, images, charts & tables in one model
ai.google.dev
Heading 3: Summarize, answer questions & extract structured data
ai.google.dev
Slide 21 - template 6 text-list-2-levels
Title: Document Processing & Features
Heading 1: Long document support
*** Handle PDFs up to 1,000 pages
ai.google.dev

*** Use long context models (Gemini 2.5 Pro/Flash)
*** Combine visual and textual cues for accuracy
ai.google.dev
Heading 2: Passing PDFs inline
*** Encode the PDF as Base64 and send with prompt
ai.google.dev
ai.google.dev

*** Suitable for files <20 MB
ai.google.dev

*** Example: summarizing a PDF via generate_content
ai.google.dev
Heading 3: Using the Files API
*** Upload large PDF files once and reuse them
ai.google.dev

*** Refer to the uploaded URI in prompts (document reuse)
*** Reduces payload size for repeated queries
Heading 4: Applications
*** Generating summaries and reports
*** Extracting tables or diagrams
*** Providing answers from technical or legal documents
Slide 22 - template 6 text-list-2-levels
Title: Document Q&A & Extraction
Heading 1: Document Q&A workflow
*** Combine a document with a system instruction listing its content
*** Ask questions; model responds using only the document
ai.google.dev

*** Suitable for closed‑book Q&A on specific documents
Heading 2: Extract‑then‑ask approach
*** Use a library (e.g., PyPDF2) to extract text
*** Create a system prompt containing the extracted text
*** Send user questions to a chat session with system prompt
Heading 3: Inline vs extraction
*** Direct PDF prompts allow native vision (images, charts)
ai.google.dev

*** Extracted text loses formatting but reduces tokens
*** Choose method based on document structure & size
Heading 4: Limitations
*** Inline PDFs must be <20 MB
ai.google.dev

*** Use caution with sensitive documents (privacy & rights)
*** Gemini cannot read password‑protected or corrupted PDFs
Slide 23 - template 5-code
Title: Summarizing a PDF (Python)
Heading 1: Fetch a remote PDF and encode as bytes
Heading 2: Use inline data in generate_content
Code minh họa
from google import genai
from google.genai import types
import httpx

client = genai.Client()
doc_url = "https://example.com/report.pdf"
# Download PDF bytes
doc_data = httpx.get(doc_url).content

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=[
        types.Part.from_bytes(data=doc_data, mime_type='application/pdf'),
        "Summarize this document"
    ]
)
print(response.text)
Slide 24 - template 5-code
Title: Extract-then-Ask Example (tutorial06.py)
Heading 1: Extract text & ask questions
Heading 2: Create a system prompt and chat session
Code minh họa
from google import genai
from PyPDF2 import PdfReader
from intro_gemini.utils import get_key
from google.genai.types import GenerateContentConfig

# Extract text from a PDF file
def extract_text(pdf_path):
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
    return text

# Initialize Gemini client & chat
api_key = get_key()
client = genai.Client(api_key=api_key)
document_text = extract_text('sample.pdf')
system_prompt = (
    "You are an AI assistant. Answer questions based ONLY on the following\n"
    "document content. If information is not in the document, say so clearly.\n\n"
    f"Document content:\n{document_text}"
)
config = GenerateContentConfig(system_instruction=system_prompt)
chat = client.chats.create(model='gemini-2.0-flash', config=config)

# Ask a question
response = chat.send_message("What is the main topic of this report?")
print(response.text)
Slide 25 - template 6 text-list-2-levels
Title: Best Practices & Guidelines
Heading 1: Best practices for multimodal prompts
*** Use descriptive narrative prompts for images
ai.google.dev

*** Specify speakers and voices clearly for TTS
ai.google.dev

*** Provide timestamps and clear questions for audio
ai.google.dev
Heading 2: File size & length limits
*** Inline media must keep total request <20 MB
ai.google.dev
ai.google.dev

*** Audio length capped at 9.5 hours
ai.google.dev

*** Context windows limit responses (32k tokens for TTS)
ai.google.dev
Heading 3: Rights & safety
*** Upload only content you own or have rights to
ai.google.dev

*** Avoid generating harmful, deceptive or offensive content
ai.google.dev
ai.google.dev

*** Review Google’s policies and SynthID watermarks
ai.google.dev
Heading 4: Choosing the right model
*** Gemini 2.5 Flash vs Pro: trade‑offs in speed & context
*** Use models with TTS or image capabilities as needed
*** Test prompts in AI Studio before deployment
ai.google.dev
Slide 26 - template 1 text-only content
Title: Conclusion & Key Takeaways
Heading 1: Gemini supports native generation & understanding across media
Heading 2: Combine text, images, audio & documents in one conversation
Heading 3: Follow best practices for prompts, safety & file sizes
Heading 4: Continue exploring with cookbooks, AI Studio & new APIs
Slide 27 - template 1 text-only content
Title: Resources & Next Steps
Heading 1: Official Gemini documentation & cookbooks
Heading 2: Experiment with models using AI Studio and SDKs
Heading 3: Practice with your own images, audio & documents
Heading 4: Prepare questions for the next lecture