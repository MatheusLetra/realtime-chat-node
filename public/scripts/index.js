$('#Login').submit(function (event) {
    event.preventDefault();
    var username = $('input[name=username]').val()
    var password = $('input[name=password]').val()

    if (username.trim() && password.trim()) {
        // var messageError = document.getElementById("messageError")
        // messageError.style.display = 'none';
    }
    else {
        // var messageError = document.getElementById("messageError")
        // messageError.style.display = 'block';
        Alert('Please entry your username and your password!')
    }
})

$('#SignUp').submit(function (event) {
    event.preventDefault();
    var fullName = $('input[name=name]').val()
    var username = $('input[name=usernameSign]').val()
    var password = $('input[name=passwordSign]').val()

    if (fullName.trim() && username.trim() && password.trim()) {
        socket.emit("Sign_Up", {
            name: fullName,
            username: username,
            password: generateHash(password)
        });
    }
    else {
        Alert('Please entry your Full name and your username and your password!')
    }
})

$(document).ready(function () {
    $("#hideSignUp").click(function (event) {
        event.preventDefault();
        document.title = 'Socket.io Chat - Login'
        const signUp = document.getElementById("SignUp")
        signUp.style.display = 'none'
        const login = document.getElementById("Login")
        login.style.display = 'flex'
    });

    $("#hideLogin").click(function (event) {
        event.preventDefault();
        document.title = 'Socket.io Chat - SignUp'
        const signUp = document.getElementById("SignUp")
        signUp.style.display = 'flex'
        const login = document.getElementById("Login")
        login.style.display = 'none'
    });
});
