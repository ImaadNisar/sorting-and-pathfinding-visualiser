<?php
session_start(); 
require("../templates/dbconnect.php");



// GET CURRENT TIME SPENT
$query = "SELECT timeSpent FROM students WHERE studentEmail=?";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $query)) {  
    echo "SQL invalid";
}else {
    mysqli_stmt_bind_param($stmt, "s", $_SESSION['email']);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $time = mysqli_fetch_array($result, MYSQLI_ASSOC);
}

$newTime = $time['timeSpent'] + 1;

// UPDATE TIME SPENT
$query = "UPDATE students SET timeSpent=? WHERE studentEmail=?";
$stmt = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt, $query)) {  
    echo "SQL invalid";
}else {
    mysqli_stmt_bind_param($stmt, "ss", $newTime, $_SESSION['email']);
    mysqli_stmt_execute($stmt);
}

?>