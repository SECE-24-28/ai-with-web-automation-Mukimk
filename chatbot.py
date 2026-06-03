import os
import google.generativeai as genai
from dotenv import load_dotenv

def main():
    # Load environment variables from .env file
    load_dotenv()
    
    # Retrieve the API key
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key == "your_api_key_here":
        print("Error: Please set a valid GEMINI_API_KEY in the .env file.")
        return

    # Configure the API
    genai.configure(api_key=api_key)

    # Initialize the generative model for chat
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    # Start a chat session, initializing it with a system prompt to set the persona
    # (Note: Using a system_instruction in the model init or as the first message works well. 
    # For simplicity, we just send a setup message first)
    chat = model.start_chat(history=[
        {"role": "user", "parts": ["From now on, act as a helpful and knowledgeable shopping assistant. Help me select products based on my needs, ask clarifying questions, and give good recommendations. Start by saying hello!"]},
        {"role": "model", "parts": ["Hello! I'm your AI Shopping Assistant. What are you looking to buy today? I'd love to help you find the perfect product!"]}
    ])

    print("Welcome to the AI Shopping Assistant!")
    print("I can help you find products, compare options, and make buying decisions.")
    print("(Type 'quit' or 'exit' to stop)\n")
    print(f"Assistant: {chat.history[-1].parts[0].text}")

    while True:
        try:
            user_input = input("\nYou: ")
            if user_input.strip().lower() in ['quit', 'exit']:
                print("\nAssistant: Happy shopping! Have a great day.")
                break
            
            if not user_input.strip():
                continue

            response = chat.send_message(user_input)
            print(f"\nAssistant: {response.text}")

        except Exception as e:
            print(f"\n[Error]: {e}")

if __name__ == "__main__":
    main()
