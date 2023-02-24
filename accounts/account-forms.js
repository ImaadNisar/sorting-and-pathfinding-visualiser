clicked = false
function changeType(id) {  // recieves password field id as parameter
    clicked = true
    var input = document.getElementById(id);  // retrvies password field element from DOM
    var button = document.getElementById(id+"Button")

    if (input.type == "text") { // checks the type of the input field and changes it
        input.type = "password"
        button.style.backgroundImage = "url('images/view-password.png')"
        

    }  
    else {
        input.type = "text"
        button.style.backgroundImage = "url('images/hide-password.png')"
    }
}

function showButton(password) {
    document.getElementById(password+"Button").style.display = 'inline-block'
}

function hideButton(password) {
    document.getElementById(password+"Button").style.display = 'none'
}


function stopLoseFocus(id) {
    document.getElementById(id).removeAttribute('onblur')
}

function continueLoseFocus(id) {
    var str = 'hideButton("'+id+'")' 
    var element = document.getElementById(id)
    element.setAttribute('onblur', str)
    if (clicked) {
        document.getElementById(id+"Button").style.display = "none"
        clicked = false
    }
}


function displayTeacherEmail(userType) {  // recieves the user type as parameter
    var teacherEmail = document.getElementById("teacherEmail")  // gets the teacher email element from the DOM
    teacherEmail.value = ""
    if (userType == "student") {teacherEmail.style.display = "inline-block"}  // changes the teacher email display property
    else if (userType == "teacher") {teacherEmail.style.display = "none"}     // depending on what user type is selected
}

function validateRegister() {
    var first = document.getElementById('firstName').value
    var last = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var reenterpassword = document.getElementById('reenterPassword').value
    var teacherEmail = document.getElementById("teacherEmail").value
    
    var valid = true

    if (teacherEmail != "") {
        if (!validateEmail(teacherEmail)) {
            valid = false
            invalidInput('teacherEmail')
        }
    }

    if (!validateName(first)) {
        valid = false
        invalidInput('firstName')
    }
    if (!validateName(last)) {
        valid = false
        invalidInput('lastName')
    }
    if (!validateEmail(email)) {
        valid = false
        invalidInput('email')
    }
    if (!validatePasswords(password, reenterpassword)) {
        valid = false
        invalidInput('password', 'reenterPassword')
    }

    return valid

}


function validateLogin() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value

    var valid = true

    if (!validateEmail(email)) {
        valid = false
        invalidInput('email')
    }
    if (!validatePasswords(password)) {
        valid = false
        invalidInput('password')
    }

    return valid
}

function invalidInput(element, element2=null) {
    var element = document.getElementById(element)
    element.style.backgroundColor = '#f3000044'
    console.log(element)
    if (element2 != null) {
        var element2 = document.getElementById(element2)
        element2.style.backgroundColor = '#f3000044'
    }

    setTimeout(() => {
        element.style.backgroundColor = '#131424'
        if (element2 != null) {element2.style.backgroundColor = '#131424'}
    }, 2000)
}


function validateEmail(email) {
    return String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateName(name) {
    return name.length > 0 
}

function validatePasswords(pass1, pass2=null) {
    if (pass2!=null) {if (pass1 != pass2) {return false}}
    return pass1.length >= 8
}