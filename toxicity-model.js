// Modal handling
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

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
    courseTitle.textContent = "Next Step Title";
    courseContent.textContent = "Next step content goes here";
    edbotMessage.textContent = "Next step message from EdBot";
}

var next2 = document.getElementById("ed-next2");
var modal2 = document.getElementById("myModal2");
var modal3 = document.getElementById("myModal3");

next2.onclick = function() {
    modal2.style.display = "none";
    modal3.style.display = "block";
}

next.onclick = function() {
    modal.style.display = "none";
    var modal2 = document.getElementById("myModal2");
    modal2.style.display = "block";
}

var closeButtons = document.querySelectorAll(".modal-content .close");

closeButtons.forEach(function(closeButton) {
    closeButton.onclick = function() {
        var modal = closeButton.closest(".modal");
        modal.style.display = "none";
    }
});

// User input and sentiment analysis
const userEduInput = document.getElementById('userEduInput');
const chatEduHistory = document.getElementById('chatEduHistory');

async function sendEduMessage() {
    var message = userEduInput.value.trim();
    if (message !== '') {
        appendEduMessage('You', message, 'to');
        userEduInput.value = '';

        const result = await fetchSentimentAnalysis(message);
        const formattedResult = formatSentimentResult(result);
        appendEduMessage('EduBot', formattedResult.message, 'from');

        if (formattedResult.toxicScore > 0.700) {
            appendEduMessage('EduBot', 'Sorry your Toxicity Score was too high, please try again', 'from');
        }
        else {
            appendEduMessage('EduBot', 'Great! Please continue to the next prompt.', 'from');
        }
        
        chatEduHistory.scrollTop = chatEduHistory.scrollHeight;
    }
}

function appendEduMessage(sender, message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(className);

    const senderElement = document.createElement('span');
    senderElement.classList.add('sender');
    senderElement.textContent = `${sender}: `;

    const messageContentElement = document.createElement('span');
    messageContentElement.textContent = message;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(messageContentElement);

    chatEduHistory.appendChild(messageElement);
}

async function fetchSentimentAnalysis(message) {
    const response = await fetch('https://api-inference.huggingface.co/models/citizenlab/distilbert-base-multilingual-cased-toxicity', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: message
        })
    });

    if (response.ok) {
        return response.json();
    } else {
        console.error('Error fetching sentiment analysis:', response.statusText);
        return [];
    }
}

function formatSentimentResult(result) {
    if (!result || result.length === 0) {
        return { message: 'Error fetching sentiment analysis', toxicScore: 0 };
    }

    const scores = result[0];
    const toxicScore = scores[0].score;
    const nonToxicScore = 1 - toxicScore;

    return {
        message: `Toxic - ${toxicScore.toFixed(3)}, Non Toxic - ${nonToxicScore.toFixed(3)}`,
        toxicScore: toxicScore
    };
}
