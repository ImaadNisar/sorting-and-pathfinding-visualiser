<?php session_start(); 
    session_destroy();  // destroys session and session storage
    header("Location: ../index.php?success=2");  // redirect to index
?>