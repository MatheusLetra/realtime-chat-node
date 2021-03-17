const express = require('express')
const path = require('path')


const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname,'public'))) //define public files directory
app.set('views', path.join(__dirname,'public/views'))  // define views directory
app.engine('html',require('ejs').renderFile)           // define engine with html
app.set('view engine','html')

app.use('/', (req,res)=>{
    res.render('index.html')
})

let messages = []

io.on('connection', socket =>{
    console.log(socket.id)
    socket.emit('previousMessages', messages)
    socket.on('sendMessage', data =>{
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })
})

server.listen(3000,function(){
    console.log('Server is running....')
})