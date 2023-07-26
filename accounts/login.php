<?php 
session_start();

include("../templates/dbconnect.php");



function accountMatch($conn, $query) {  // retrieves account if exists
    $stmt = mysqli_stmt_init($conn);
    if (!(mysqli_stmt_prepare($stmt, $query))) {
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "ss", $_POST['email'], $_POST['password']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $accounts = mysqli_fetch_all($result, MYSQLI_ASSOC);  // returns all matches (max 1)
        if (count($accounts) == 1) {return true;}  // returns true if match
        else {return false;} // returns false if no match
    }
}

function validateEmail($email) {  // server-side email validation using regex
    return preg_match('/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/', $email);
}


function validatePasswords($pass1, $pass2=null) {  // server-side password-validation by checking equivilance and length
    if ($pass2!=null) {
        if ($pass1 != $pass2) {
            return false;
        }
    }
    return strlen($pass1) >= 8;
}

function validate() {  // function to call validation functions
    $valid = true;
    
    if (!(validateEmail($_POST['email']) && validatePasswords($_POST['password']))) {$valid=false;}

    if (!$valid) {
        header("Location: ../login-page.php?error=2");  // redirects to login with error if validation failed
        exit;
    }

}


validate(); // first validate before processing

$queries = array("student"=>"SELECT * FROM Students WHERE (studentEmail=? AND password=?)", "teacher"=>"SELECT * FROM Teachers WHERE (teacherEmail=? AND password=?)");  // construct select query

foreach ($queries as $type => $query) {  // foreach loop to search in teacher and student tables
    if (accountMatch($conn, $query)) {
        // declare superglobals
        $_SESSION['email'] = $_POST['email'];
        $_SESSION['type'] = $type;
        $_SESSION['loggedin'] = true;
        header("Location: ../index.php?success=1");  // redirects to index if matched
        exit;
    }
}
header("Location: ../login-page.php?error=1");  // redirect with error if no match

// error 1 = Account not found
// error 2 = Invalid input

?>