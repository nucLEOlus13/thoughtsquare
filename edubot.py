## Flask for python web framework, request for HTTP requests, jsonify for JSON responses
from flask import Flask, request, jsonify
## classes for pre-trained models and tokenizers
from transformers import AutoModelForCausalLM, AutoTokenizer

## representations in python for chatbot
app = Flask(__name__)

## load model and autotokenizer
model_name = "openai-community/gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

## function\
## takes input and encodes it with tokenizer, then generates response using model
def generate_response(prompt, max_length = 50, temperature = 1):
    input_ids = tokenizer.encode(prompt, return_tensors = "pt")
    output = model.generate(input_ids, max_length = max_length, temperature = temperature, num_return_sequences = 1)
    response = tokenizer.decode(output[0], skip_special_tokens = True)
    return response

## -----

## defines route '/chat', takes in POST request, returns response as JSON
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    prompt = data["message"]
    response = generate_response(prompt)
    return jsonify({"response": response})

## HTML for users to input their message, and display responses
@app.route("/")
def index():
    return """
    <form id = "chatForm">
        <input type = "text" id = "message" placeholder = "Message EduBot..">

        <br>
        <br>
        
        <button type = "submit">Enter</button>
    </form>
    <div id = "chat"></div>

    <script>
        document.getElementById("chatForm").addEventListener("submit", function(event) {
            event.preventDefault();
            var message = document.getElementById("message").value;
            fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "message": message
                })
            })
            .then(response => response.json())
            .then(data => {
                var chatDiv = document.getElementById("chat");
                var messageElement = document.createElement("p");
                messageElement.textContent = "You: " + message;
                chatDiv.appendChild(messageElement);
                var responseElement = document.createElement("p");
                responseElement.textContent = "EduBot: " + data.response;
                chatDiv.appendChild(responseElement);
            });
            document.getElementById("message").value = "";
        });
    </script>
    """

## allows debugging 
if __name__ == "__main__":
    app.run(debug = True)
