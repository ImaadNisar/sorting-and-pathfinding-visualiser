clicked = false  // set global click state variable

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

function showButton(password) {  // reveals passwords button
    document.getElementById(password+"Button").style.display = 'inline-block'
}

function hideButton(password) {  // hides password button
    document.getElementById(password+"Button").style.display = 'none'
}

function stopLoseFocus(id) {  // prevents the input field from losing focus when being hovered over
    document.getElementById(id).removeAttribute('onblur')
}

function continueLoseFocus(id) {
    var str = 'hideButton("'+id+'")' // constructs parameter
    var element = document.getElementById(id)
    element.setAttribute('onblur', str)  // re-adds focus loss event function
    if (clicked) {  // hides the button
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
    var first = document.getElementById('firstName').value  //obtains all form values
    var last = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var reenterpassword = document.getElementById('reenterPassword').value
    var teacherEmail = document.getElementById("teacherEmail").value
    
    var valid = true

    if (teacherEmail != "") {  // checks optional teacher email validity if entered
        if (!validateEmail(teacherEmail)) {
            valid = false
            invalidInput('teacherEmail')
        }
    }

    // checks required form element validity
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
    var email = document.getElementById('email').value  //obtains all form values
    var password = document.getElementById('password').value

    var valid = true

    // checks required form element validity
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

function invalidInput(element, element2=null) {  // adds invalid message to screen
    var element = document.getElementById(element) // highlights invalid form element
    element.style.backgroundColor = '#f3000044'
    if (element2 != null) {  // highlights re-enter password if invalid
        var element2 = document.getElementById(element2)
        element2.style.backgroundColor = '#f3000044'
    }

    setTimeout(() => {  // removes highlighting after 2s
        element.style.backgroundColor = '#131424'
        if (element2 != null) {element2.style.backgroundColor = '#131424'}
    }, 2000)
}


function validateEmail(email) {  // matches email using regex
    return String(email).toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateName(name) { // validates name if not empty
    return name.length > 0 
}

function validatePasswords(pass1, pass2=null) {  // validates password if equal and greater than 8 in length
    if (pass2!=null) {if (pass1 != pass2) {return false}}
    return pass1.length >= 8
}