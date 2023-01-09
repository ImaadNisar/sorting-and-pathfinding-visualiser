function changeType(id) {  // recieves password field id as parameter
    var input = document.getElementById(id);  // retrvies password field element from DOM
    if (input.type == "text") {input.type = "password"}  // checks the type of the input field and changes it
    else {input.type = "text"}
}

function displayTeacherEmail(userType) {  // recieves the user type as parameter
    teacherEmail = document.getElementById("teacherEmail")  // gets the teacher email element from the DOM
    if (userType == "student") {teacherEmail.style.display = "inline-block"}  // changes the teacher email display property
    else if (userType == "teacher") {teacherEmail.style.display = "none"}     // depending on what user type is selected
}