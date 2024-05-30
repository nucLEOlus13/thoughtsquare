# backend.py

from flask import Flask, request, jsonify
from edubot import generate_response  # Import your chatbot function from your Python file

app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data['message']
    # Pass the message to your chatbot function
    response = generate_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
