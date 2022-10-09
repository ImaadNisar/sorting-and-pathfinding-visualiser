<?php 

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
                header("Location: ../register-page.php?error=Teacher+with+that+account+does+not+exist");
            }
        }else{  // otherwise add the teacher details
            mysqli_stmt_bind_param($stmt, "ssss", $_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['password']);
        }
        mysqli_stmt_execute($stmt);  // execute the statement
        header("Location: ../index.php?register=Account+successfully+created");
        
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

if (!(accountExists($conn, $studentQuery) || accountExists($conn, $teacherQuery))) {
    addAccount($conn, $query, $teacherExists);
}else {
    header("Location: ../register-page.php?error=Account+already+exists.");
}


?>