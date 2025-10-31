from agents import Agent, Runner
import os
from dotenv import load_dotenv

# Load environment variables from .env and extract API key for the agents library
load_dotenv()


def get_key():
    key = os.getenv('OPENAI_API_KEY')
    if not key:
        raise RuntimeError(
            "OPENAI_API_KEY not found. Please add it to your .env file."
        )
    return key


# Set environment variable for agents library
os.environ['OPENAI_API_KEY'] = get_key()

poem_style = 'shakespeare'
# create a new agent
agent = Agent(
    name="Poet",
    instructions=f"Always answer the user's question with a {poem_style} poem."
)

# run the agent syncronously
question = input('Ask me something: ')
result = Runner.run_sync(agent, question)
print(result.final_output)
