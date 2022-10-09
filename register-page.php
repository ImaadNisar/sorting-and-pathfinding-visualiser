<?php include("templates/header.php"); ?>
<?php 
if (isset($_GET['error'])) {
    echo $_GET['error'];
}
?>

<main>
<h1>Create an account</h1>
<a href="login-page.php">Already have an account?</a>
<form action="accounts/register.php" method="post"> <!-- INCLUDE JS VALIDATION HERE LATER -->
    <input type="text" name="firstName" id="firstName" placeholder="First name">
    <input type="text" name="lastName" id="lastName" placeholder="Last name">
    <input type="text" name="email" id="email" placeholder="Email address">
    <input type="password" name="password" id="password" placeholder="Password">
    <div id="showPasswordButton" class="showPasswordButton" onclick="changeType('password')">Show Password</div>
    <input type="password" name="reenterPassword" id="reenterPassword" placeholder="Re-enter password">
    <div id="showReenterPasswordButton" class="showPasswordButton" onclick="changeType('reenterPassword')">Show Password</div>
    <p>I am a: </p>
    <input type="radio" value="teacher" name="userType" id="teacher" onclick="displayTeacherEmail('teacher')">Teacher
    <input type="radio" value="student" name="userType" id="student" onclick="displayTeacherEmail('student')">Learner
    <input type="text" name="teacherEmail" id="teacherEmail" placeholder="Teacher's email address">
    <input type="submit" name="submit" value="Create" id="submit">
</form>
</main>

<script src="accounts/account-forms.js"></script>
<?php include("templates/footer.php"); ?>


