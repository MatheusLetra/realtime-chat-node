const socket = require('../clientSocket/socketIo')

function renderMessages(message){
    $('#messages').append('<div class="message"><strong>' + message.author + '</strong>: ' + message.message + '</div>')
    var objDiv = document.getElementById("messages");
    objDiv.scrollTop = objDiv.scrollHeight;
}

socket.on('previousMessages', function(messages){
    $('#messages').empty()
    for (message in messages){
        renderMessages(message)
    }
})
socket.on('receivedMessage', function(message){
    renderMessages(message)
})

$('#chat').submit(function(event){
    event.preventDefault();

    var author = $('input[name=username]').val()
    var message = $('input[name=message]').val()

    if(author.trim() && message.trim()){
        var messageObject = {
            author: author,
            message: message
        }

        renderMessages(messageObject)
        socket.emit('sendMessage', messageObject)
    }
    else {
        alert('Please entry your username and your message!')
    }
})