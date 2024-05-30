
let chatbox = document.querySelector('.chatheader');
console.log(chatbox);

chatbox.addEventListener('click', function() {
    console.log("Chatbox was clicked!");

    let chatboxBody = document.querySelector('.chatbody');
    console.log(chatboxBody);

    chatboxBody.classList.toggle('chatbody--hidden');
});

// Get reference to the input field
const userInput = document.getElementById('userInput');

// Add event listener for the "keydown" event
userInput.addEventListener('keydown', function(event) {
  // Check if the pressed key is "Enter" (key code 13)
  if (event.keyCode === 13) {
    // Prevent the default behavior (form submission)
    event.preventDefault();
    // Call the sendMessage function
    sendMessage();
  }
});

// Function to send a message
async function sendMessage() {
  var message = userInput.value.trim(); // Get the message inputted by the user
  if (message !== '') {
    appendMessage('You', message, 'to'); // Append user message to the chat history
    userInput.value = ''; // Clear the input field after sending the message
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom of the chat history

    // Call the API to generate a bot response
    const botResponse = await getBotResponse(message);
    appendMessage('Bot', botResponse, 'from'); // Append bot response to the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight; // Auto-scroll to the bottom of the chat history
  }
}

// Function to append a message to the chat history
function appendMessage(sender, message, className) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(className); // Add the provided class name

  const senderElement = document.createElement('span');
  senderElement.classList.add('sender');
  senderElement.textContent = `${sender}: `;

  const messageContentElement = document.createElement('span');
  messageContentElement.textContent = message;

  messageElement.appendChild(senderElement);
  messageElement.appendChild(messageContentElement);

  chatHistory.appendChild(messageElement);
}

// Function to get bot response using Hugging Face API
async function getBotResponse(message) {
  const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      inputs: message,
      options: {
        max_length: 50,
        temperature: 1
      }
    })
  });

  const data = await response.json();
  return data[0].generated_text;
}
