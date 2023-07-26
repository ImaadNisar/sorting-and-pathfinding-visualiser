<?php include("templates/header.php");

if (isset($_SESSION['loggedin'])) { // redirects to index if user already logged in
    header("Location: ../index.php");
}
?>

<main class='account-main'>
<section class='account-container'>
    <h1>Create an account</h1>
    <a href="login-page.php" class="account-redirect-link">Already have an account?</a>

    <?php 
    if (isset($_GET['error'])) { // displays registration error if returned
        if ($_GET['error'] == 1) {
            echo "<div class='error'>Account already exists</div>";
        }
        elseif ($_GET['error'] == 2) {
            echo "<div class='error'>Invalid input</div>";
        }
        elseif ($_GET['error'] == 3) {
            echo "<div class='error'>Teacher with that account does not exist</div>";
        };
    }
    if (isset($_GET['success'])) { // displays success message if registration successful
        echo "<div class='error success'>Account created</div>";
    }
    ?>
    
    <form action="accounts/register.php" onsubmit="return validateRegister()" method="post" class="account-form" spellcheck="false"> <!-- INCLUDE JS VALIDATION HERE LATER -->
        <input type="text" name="firstName" id="firstName" placeholder="First name"><!--
        --><input type="text" name="lastName" id="lastName" placeholder="Last name">

        <input type="text" name="email" id="email" placeholder="Email address">
        
        <div class="password-container">
            <input type="password" name="password" id="password" placeholder="Password (8+)" onfocus="showButton('password')" onblur="hideButton('password')">
            <div id="passwordButton" class="showPasswordButton" onclick="changeType('password')" onmouseover="stopLoseFocus('password')" onmouseleave="continueLoseFocus('password')"></div>
        </div><!--
        --><div class="password-container">
            <input type="password" name="reenterPassword" id="reenterPassword" placeholder="Re-enter password" onfocus="showButton('reenterPassword')" onblur="hideButton('reenterPassword')">
            <div id="reenterPasswordButton" class="showPasswordButton" onclick="changeType('reenterPassword')" onmouseover="stopLoseFocus('reenterPassword')" onmouseleave="continueLoseFocus('reenterPassword')"></div>
        </div>
        <p>I am a: </p>

        <div class="radio-container">
            <input type="radio" checked="true" value="teacher" name="userType" id="teacher" onclick="displayTeacherEmail('teacher')">
            <label for="teacher">Teacher</label><!--
            --><input type="radio" value="student" name="userType" id="student" onclick="displayTeacherEmail('student')">
            <label for="student">Student</label>
        </div>

        <input type="text" name="teacherEmail" id="teacherEmail" placeholder="Teacher's email address">
        <input type="submit" name="submit" value="Create" id="submit">
    </form>
</section>
</main>

<script src="accounts/account-forms.js"></script>
<?php include("templates/footer.php"); ?>


