const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const path = require('path')
const {createUser, verifyUsername} = require('./public/models/users')


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
    socket.emit('previousMessages', messages)

    socket.on('sendMessage', data =>{
        messages.push(data)
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on("Sign_Up", function(data){
        console.log(data)
    });
})





server.listen(3000,function(){
    console.log('Server is running....')
})