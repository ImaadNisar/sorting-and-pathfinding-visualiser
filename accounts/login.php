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

$queries = array("student"=>"SELECT * FROM Students WHERE (studentEmail=? AND password=?)", "teacher"=>"SELECT * FROM Teachers WHERE (teacherEmail=? AND password=?)");

foreach ($queries as $type => $query) {
    if (accountMatch($conn, $query)) {
        $_SESSION['email'] = $_POST['email'];
        $_SESSION['type'] = $type;
        header("Location: ../index.php");
        exit;
    }
}
header("Location: ../login-page.php?error=Account+not+found");


?>