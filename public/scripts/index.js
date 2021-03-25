function onHideSignUp(event) {
    event.preventDefault();
    document.title = 'Socket.io Chat - Login'
    let SignUp = document.getElementById('SignUp');
    SignUp.style.display = 'none';
    let Login = document.getElementById('Login');
    Login.style.display = 'flex';
}

function onHideLogin(event) {
    event.preventDefault();
    document.title = 'Socket.io Chat - SignUp'
    let SignUp = document.getElementById('SignUp');
    SignUp.style.display = 'flex';
    let Login = document.getElementById('Login');
    Login.style.display = 'none';
}

async function verifyUser(username){
    var userExists = document.getElementById('userExists')
    let result = await verifyUsername(username)
    if (result === true){
        
    }
}

var hideSignUp = document.getElementById('hideSignUp');
hideSignUp.addEventListener('click', function (event) {
    onHideSignUp(event);
})

var hideLogin = document.getElementById('hideLogin');
hideLogin.addEventListener('click', function (event) {
    onHideLogin(event);
})




