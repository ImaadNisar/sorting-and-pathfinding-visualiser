<?php 
session_start();

include("../templates/dbconnect.php");

function accountExists($conn, $query) {
    $stmt = mysqli_stmt_init($conn);  // initializes the statement
    if (!mysqli_stmt_prepare($stmt, $query)) {  // checks if a prepared statement can be created
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "s", $_POST['email']);  // substitutes the email for all the placeholders
        mysqli_stmt_execute($stmt);  // executes the query
        $result = mysqli_stmt_get_result($stmt);  
        $numAccounts = count(mysqli_fetch_all($result, MYSQLI_ASSOC));  // returns the number of matches as an integer
        if ($numAccounts > 0) {return true;}  // if there are any matches then an account exists and account creation is stopped
        else {return false;}
    }
}

function addAccount($conn, $query, $teacherExists) {
    $stmt = mysqli_stmt_init($conn); 
    if (!mysqli_stmt_prepare($stmt, $query)) {  
        echo "SQL invalid";
    }else {
        if ($_POST['userType'] == "student") {  // if the user is a student then add the student details
            if (strlen($_POST['teacherEmail']) == 0) {
                mysqli_stmt_bind_param($stmt, "ssss", $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['password']);
            }else if ($teacherExists) {
                mysqli_stmt_bind_param($stmt, "sssss", $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['password'], $_POST['teacherEmail']);
            }
            else {
                header("Location: ../register-page.php?error=3"); // handle error
            }
        }else{  // otherwise add the teacher details
            mysqli_stmt_bind_param($stmt, "ssss", $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['password']);
        }
        mysqli_stmt_execute($stmt);  // execute the statement
        header("Location: ../register-page.php?success=1"); // handle successful account creation
        exit;
    }
}

function teacherExists($conn) {
    $stmt = mysqli_stmt_init($conn); 
    $query = "SELECT * FROM teachers WHERE teacherEmail=?";
    if (!mysqli_stmt_prepare($stmt, $query)) {
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "s", $_POST['teacherEmail']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);  
        $numAccounts = count(mysqli_fetch_all($result, MYSQLI_ASSOC));
        if ($numAccounts > 0) {return true;}
        else {return false;}
    }
}

function validateEmail($email) {
    return preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $email);
}

function validateName($name) {
    return strlen($name) > 0;
}

function validatePasswords($pass1, $pass2=null) {
    if ($pass2!=null) {
        if ($pass1 != $pass2) {
            return false;
        }
    }
    return strlen($pass1) >= 8;
}

function validate() {
    $valid = true;
    if ($teacherExists) {
        if (!validateEmail($_POST['teacherEmail'])) {
            $valid = false;
        }
    }
    if(!(validateName($_POST['firstName']) && validateName($_POST['lastName']) && validateEmail($_POST['email']) && validatePasswords($_POST['password']))) {
        $valid = false;
    }

    if (!$valid) {
        header("Location: ../register-page.php?error=2");
        exit;
    }
    

}



// starts here
$teacherExists = false;
if ($_POST['userType'] == "student") {  // constructs sql query for student
    $query = "INSERT INTO students(firstName, lastName, studentEmail, password) VALUES (?, ?, ?, ?)";
    if (teacherExists($conn)) {  // constructs other sql query if teacherEmail is valid
        $query = "INSERT INTO students(firstName, lastName, studentEmail, password, teacherEmail) VALUES (?, ?, ?, ? ,?)";
        $teacherExists = true;
    }
}else{
    $query = "INSERT INTO teachers(firstName, lastName, teacherEmail, password) VALUES (?, ?, ?, ?)";
}

$studentQuery = "SELECT * FROM students WHERE studentEmail=?";
$teacherQuery = "SELECT * FROM teachers WHERE teacherEmail=?";


validate($teacherExists);

if (!(accountExists($conn, $studentQuery) || accountExists($conn, $teacherQuery))) {
    addAccount($conn, $query, $teacherExists);
}else {
    header("Location: ../register-page.php?error=1"); // handle account already existing
}

// error 1 = Account already exists
// error 2 = Invalid input(s)
// error 3 = Teacher with that account does not exist
// success 1 = Account created

?>
