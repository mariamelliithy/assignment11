// Get references to form elements
var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

// Get references to buttons
var signUp = document.querySelector('#signUp');
var login = document.querySelector('#login');
var logOut = document.querySelector('#logOut');

// Initialize sign-up array from localStorage
var signUpArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

// Function to check if sign-up inputs are empty
function isEmpty() {
    return signupName.value !== "" && signupEmail.value !== "" && signupPassword.value !== "";
}

// Function to check if email already exists
function isEmailExist() {
    return signUpArray.some(user => user.email.toLowerCase() === signupEmail.value.toLowerCase());
}

// Add event listener for sign-up
if (signUp) {
    signUp.addEventListener('click', function(e){
        if (!isEmpty()) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
            return;
        }

        if (isEmailExist()) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
            return;
        }

        var newUser = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        };

        signUpArray.push(newUser);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    });
}

// Function to check if login inputs are empty
function isLoginEmpty() {
    return signinEmail.value !== '' && signinPassword.value !== '';
}
var loginButton = document.querySelector('#login a');
// Add event listener for login
if (login) {
    login.addEventListener('click', function(e){
        if (!isLoginEmpty()) {
            document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
            return;
        }

        var email = signinEmail.value;
        var password = signinPassword.value;

        var user = signUpArray.find(user => 
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password // Keep password case-sensitive
        );

        if (user) {
            for (var i = 0; i < signUpArray.length; i++) {
                if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) 
                    {
                    localStorage.setItem('sessionUsername', signUpArray[i].name)
                }
            }
            loginButton.setAttribute('href', 'home.html');
            window.location.href = 'home.html';
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">Incorrect email or password</span>';
        }
    });
}

// Display welcome message on the home page
var username = localStorage.getItem('sessionUsername');
if (username) {
    var usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.innerHTML = "Welcome " + username;
    }
}
