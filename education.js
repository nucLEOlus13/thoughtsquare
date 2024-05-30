// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var next = document.getElementById("ed-next");
var courseTitle = document.getElementById("courseTitle");
var courseContent = document.getElementById("courseContent");
var edbotMessage = document.getElementById("edbotMessage");

next.onclick = function() {
    // Update modal content for the next step of the course
    courseTitle.textContent = "Next Step Title";
    courseContent.textContent = "Next step content goes here";
    edbotMessage.textContent = "Next step message from EdBot";
    // You can continue updating other elements as needed
}

var next2 = document.getElementById("ed-next2");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

next2.onclick = function() {
    modal2.style.display = "none"; // Hide modal 2
    modal3.style.display = "block"; // Display modal 3
}


var next = document.getElementById("ed-next");

next.onclick = function() {
  // go to the next modal page
  modal.style.display = "none";
  var modal2 = document.getElementById("myModal2");
  modal2.style.display = "block";
}

// Get references to the close buttons in all modals
var closeButtons = document.querySelectorAll(".modal-content .close");

// Loop through each close button and attach event listener
closeButtons.forEach(function(closeButton) {
    closeButton.onclick = function() {
        // Find the parent modal of the clicked close button
        var modal = closeButton.closest(".modal");
        // Hide the parent modal
        modal.style.display = "none";
    }
});

// --------------------------------------------------------------------------------------------------------------

const userEduInput = document.getElementById('userEduInput');

function sendEduMessage() {
  var message = userEduInput.value.trim(); // Get the message inputted by the user
  if (message !== '') {
    appendEduMessage('You', message, 'to'); // Append user message to the chat history
    userEduInput.value = ''; // Clear the input field after sending the message
    chatEduHistory.scrollTop = chatEduHistory.scrollHeight; // Auto-scroll to the bottom of the chat history
  }
}

// Function to append a message to the chat history
function appendEduMessage(sender, message, className) {
  // console.log("Test");
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(className); // Add the provided class name

  const senderElement = document.createElement('span');
  senderElement.classList.add('sender');
  senderElement.textContent = `${sender}: `;

  const messageContentElement = document.createElement('span');
  messageContentElement.textContent = message;

  console.log(messageElement);

  messageElement.appendChild(senderElement);
  messageElement.appendChild(messageContentElement);

  console.log(messageElement, senderElement, messageContentElement);

  chatEduHistory[0].appendChild(messageElement);
}


