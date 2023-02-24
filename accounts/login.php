<?php 
session_start();

include("../templates/dbconnect.php");



function accountMatch($conn, $query) {
    $stmt = mysqli_stmt_init($conn);
    if (!(mysqli_stmt_prepare($stmt, $query))) {
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "ss", $_POST['email'], $_POST['password']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $accounts = mysqli_fetch_all($result, MYSQLI_ASSOC);
        if (count($accounts) == 1) {return true;}
        else {return false;}
    }
}

function validateEmail($email) {
    return preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $email);
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
    
    if (!(validateEmail($_POST['email']) && validatePasswords($_POST['password']))) {$valid=false;}

    if (!$valid) {
        header("Location: ../login-page.php?error=2");
        exit;
    }

}

validate();

$queries = array("student"=>"SELECT * FROM Students WHERE (studentEmail=? AND password=?)", "teacher"=>"SELECT * FROM Teachers WHERE (teacherEmail=? AND password=?)");

foreach ($queries as $type => $query) {
    if (accountMatch($conn, $query)) {
        $_SESSION['email'] = $_POST['email'];
        $_SESSION['type'] = $type;
        $_SESSION['loggedin'] = true;
        header("Location: ../index.php?success=1");
        exit;
    }
}
header("Location: ../login-page.php?error=1");

// error 1 = Account not found
// error 2 = Invalid input

?>