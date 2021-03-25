var socket = io('http://192.168.0.108:3000')

function renderMessages(message) {
    var objDiv = document.getElementById("messages");
    var childrenDiv = document.createElement("div");
    childrenDiv.style.marginBottom = '0.5vw'
    childrenDiv.style.padding = '0.5vw'
    childrenDiv.style.display = 'flex'
    childrenDiv.style.flexDirection = 'column'
    if (message.author === document.getElementById('username').innerText){
        childrenDiv.style.alignSelf = 'end'
    }
    var strongText = document.createElement("strong")
    var textAuthor = document.createTextNode(message.author);
    var textMessage = document.createTextNode(message.message)
    strongText.appendChild(textAuthor)
    childrenDiv.appendChild(strongText);
    childrenDiv.appendChild(textMessage)
    objDiv.appendChild(childrenDiv)
    objDiv.scrollTop = objDiv.scrollHeight;
}

socket.on('previousMessages', function (messages) {
    var objDiv = document.getElementById("messages");
    objDiv.innerText = ''
    for (i = 0; i < messages.length; i++){
        renderMessages(messages[i])
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
        document.getElementById('message').value = ''
    } else {
        alert('Please entry your message!')  
    }
    document.getElementById('message').focus();
}