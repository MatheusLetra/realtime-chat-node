var socket = io('http://192.168.0.108:3000')

function renderMessages(message) {
    var objDiv = document.getElementById("messages");
    var childrenDiv = document.createElement("div");
    var strongText = document.createElement("strong")
    var textAuthor = document.createTextNode(message.author + ': ');
    var textMessage = document.createTextNode(message.message)
    strongText.appendChild(textAuthor)
    childrenDiv.appendChild(strongText);
    childrenDiv.appendChild(textMessage)
    childrenDiv.className = 'message'
    objDiv.appendChild(childrenDiv)
    objDiv.scrollTop = objDiv.scrollHeight;
}

socket.on('previousMessages', function (messages) {
    var objDiv = document.getElementById("messages");
    objDiv.innerText = ''
    for (message in messages) {
        renderMessages(message)
    }
})

socket.on('receivedMessage', function (message) {
    renderMessages(message)
})

function sendMessage() {
    var userNameObject = document.getElementById('username')
    var username = userNameObject.innerText
    var message = document.getElementById('message').value;

    var messageObject = {
        author: username,
        message: message
    }
    if (messageObject.message !== '') {
        socket.emit('sendMessage', messageObject)
        renderMessages(messageObject)
    } else {
        alert('Please entry your message!')
        document.getElementById('message').focus();
    }
}