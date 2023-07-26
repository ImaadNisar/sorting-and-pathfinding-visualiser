<?php require("templates/header.php"); 
require("templates/dbconnect.php");

function getDetails($conn) { // function to get logged in user's details
    if ($_SESSION['type'] == "student") { // search student table if user is student
        $query = "SELECT firstName, lastName, teacherEmail, timeSpent FROM Students WHERE studentEmail=?";
    }else { // search teacher table if user is teacher
        $query = "SELECT firstName, lastName FROM Teachers WHERE teacherEmail=?";
    }

    $stmt = mysqli_stmt_init($conn);

    if (!(mysqli_stmt_prepare($stmt, $query))) {
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "s", $_SESSION['email']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $details = mysqli_fetch_array($result, MYSQLI_ASSOC); // obtain result as assoc array (fieldname: value)
        
    }
    return $details;
}

$details = getDetails($conn);

function getLinked($conn) { // get array of all connected students
    $query = "SELECT firstName, lastName, studentEmail, timeSpent FROM Students WHERE teacherEmail=? ORDER BY timeSpent DESC";
    $stmt = mysqli_stmt_init($conn);
    if (!(mysqli_stmt_prepare($stmt, $query))) {
        echo "SQL invalid";
    }else {
        mysqli_stmt_bind_param($stmt, "s", $_SESSION['email']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $linked = mysqli_fetch_all($result, MYSQLI_ASSOC); // returns array of all connected students
    }

    return $linked;
}



?>

<main class="account-details-main">
    <section class="account-details">
    <div class="details-image"></div>
    <?php
    echo "<h1>Hello, ".$details['firstName']."</h1>";
    ?>
    
    <h2>Account details</h2>
    <hr>
    <div class="details-list-container">
        <ul class="details-list details-list1">
            <li>First Name</li>
            <li>Last Name</li>
            <li>Email Address</li>
            <?php
            if ($_SESSION['type'] == 'student') { // displays teacher email and time spent labels if user is student
                if ($details['teacherEmail'] != null) {
                    echo "<li>Teacher's Email</li>";
                }
                echo '<li>Time Spent</li>';
            }
            ?>
        </ul>
    </div><!--
    --><div class="details-list-container">
        <ul class="details-list details-list2">
            <li><?php echo htmlspecialchars($details['firstName']); // echo details (htmlspecialchars protect against xss)?></li>
            <li><?php echo htmlspecialchars($details['lastName']);?></li>
            <li><?php echo htmlspecialchars($_SESSION['email']);?></li>
            <?php
            if ($_SESSION['type'] == 'student') {
                if ($details['teacherEmail'] != null) { // displays teacher email and time spent if user is student
                    echo '<li>'.htmlspecialchars($details['teacherEmail']).'</li>';
                }
                echo '<li>'.htmlspecialchars($details['timeSpent']).' minutes</li>';
            }
            ?>
        </ul>
    </div>
    </section>


    <?php
    if ($_SESSION['type'] == "teacher") { // displays students details if user is teacher
        $linked = getLinked($conn);
        if (count($linked) > 0) {
    ?> 

    
    <section class="linked-container">
        <hr>
        <h1>Your Students</h1>
        <div class='linked-row'>
            <ul>
                <li>First Name</li>
                <li>Last Name</li>
                <li>Email Address</li>
                <li>Time Spent</li>
            </ul>
        </div>

        <?php
        foreach ($linked as $student) {
            echo "
            <div class='linked-row linked-row-student'>
                <ul>
                    <li>".htmlspecialchars($student['firstName'])."</li>
                    <li>".htmlspecialchars($student['lastName'])."</li>
                    <li>".htmlspecialchars($student['studentEmail'])."</li>
                    <li>".htmlspecialchars($student['timeSpent'])." minutes</li>
                </ul>
            </div>
            ";
        }
        ?>
    </section>

    <?php
        }
    }
    ?>
</main>

<?php require("templates/footer.php");?>