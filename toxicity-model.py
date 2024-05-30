## Flask for python web framework, request for HTTP requests, jsonify for JSON responses
from flask import Flask, request, jsonify
## classes for pre-trained models and tokenizers
from transformers import AutoModelForSequenceClassification, AutoTokenizer

## representations in python for chatbot
app = Flask(__name__)

## load model and autotokenizer
model_name = "citizenlab/distilbert-base-multilingual-cased-toxicity"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

## function
## takes input and encodes it with tokenizer, then generates response using model
def generate_response(prompt):
    inputs = tokenizer(prompt, return_tensors = "pt")
    outputs = model(**inputs)
    probs = outputs.logits.softmax(dim = -1)[0]

    ## round probabilities to the nearest thousandth
    rounded_probs = [round(prob.item(), 4) for prob in probs]

    ## define labels 
    labels = ['negative', 'positive']

    ## combine labels and rounded probabilities
    response_dict = {label: prob for label, prob in zip(labels, rounded_probs)}
    return response_dict

## defines route '/chat', takes in POST request, returns response as JSON
@app.route("/chat", methods = ["POST"])
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
        <input type = "text" id = "message" placeholder = "Type response..">

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
                var responseText = "Rating: ";
                for (const [label, prob] of Object.entries(data.response)) {
                    responseText += `${label}: ${prob}\n`;
                }
                responseElement.textContent = responseText;
                chatDiv.appendChild(responseElement);
            });
            document.getElementById("message").value = "";
        });
    </script>
    """

## allows debugging 
if __name__ == "__main__":
    app.run(debug=True)
