const express = require('express')
const session = require('express-session');
const path = require('path')
const { createUser, verifyUsername, verifyLogin } = require('./public/models/users')
const { createMessage, getAllMessages } = require('./public/models/messages')
const { generateHash } = require('./public/security/hashGenerator')


const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)


app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'))) //define public files directory
app.set('views', path.join(__dirname, 'public/views'))  // define views directory
app.engine('html', require('ejs').renderFile)           // define engine with html
app.set('view engine', 'html')

app.get('/', (req, res) => {
    if (req.session.username) {
        res.render('chat.html', { username: req.session.username })
    } else {
        res.render('index.html')
    }
})

app.post('/', (req, res) => {
    async function Login(user, pass) {
        let response = await verifyLogin(user, pass)
        if (response === true) {
            req.session.username = user
            res.render('chat.html', { username: user })
        } else {
            res.render('userNotFound.html')
        }
    }
    const { username, password } = req.body
    Login(username, generateHash(password))
})

app.post('/register', (req, res) => {
    async function verifyUser(username) {
        let result = await verifyUsername(username)
        console.log(result)
        if (result === true) {
            return true
        } else {
            return false
        }
    }

    async function Register(params) {
        let userExists = await verifyUser(params.username)
        if (userExists) {
            res.render('userAlreadyExists.html')
        } else {
            let response = await createUser(params)
            if (response.statusCode === '201') {
                req.session.username = params.username
                res.redirect('/')
            } else {
                res.send('<h3>' + response.message + '</h3')
            }
        }
    }

    const { name, usernameSign, passwordSign } = req.body
    const userParams = {
        name: name,
        username: usernameSign,
        password: generateHash(passwordSign)
    }
    Register(userParams)
})

let messages = []


async function pushMessage(message) {
    await createMessage(message)
    messages.push(message)
}

async function getPreviousMessages(socket) {
    messages = await getAllMessages()
    socket.emit('previousMessages', messages)
}

io.on('connection', socket => {
    getPreviousMessages(socket)
    socket.on('sendMessage', data => {
        pushMessage(data)
        socket.broadcast.emit('receivedMessage', data)
    })

    socket.on("Sign_Up", function (data) {
        socket.broadcast.emit('receivedMessage', data)
    });
})





server.listen(3000, function () {
    console.log('Server is running....')
})