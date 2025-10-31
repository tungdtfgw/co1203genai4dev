from google import genai
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from utils import get_key

# Simple example of using the GenAI client
# AI has no memory, so it will not remember the context of the conversation

# create a client
client = genai.Client(api_key=get_key())
while True:
    try:
        question = input('[User]: ')
        
        # generate a response
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=[question]
        )
        print('[GenAI]:', response.text)

        if question.strip() == 'exit' or question.strip() == 'quit':
            break

    except Exception as e:
        print(e)
        break