<?php require("templates/header.php");?>

<main class="account-main">
<section class="account-container">
    <h1>Login to Visualize It</h1>
    <a href="register-page.php" class="account-redirect-link">Don't have an account?</a>
    <?php 
    if (isset($_GET['error'])) { // display errors if error returned
        if ($_GET['error'] == 1) {
            echo "<div class='error'>Account does not exist</div>";
        }
        elseif ($_GET['error'] == 2) {
            echo "<div class='error'>Invalid input</div>";
        };
    }
    ?>
    <form onsubmit="return validateLogin()"action="accounts/login.php" method="post" class="account-form login-form" spellcheck="false">
        <input type="text" name="email" id="email" placeholder="Email address" class="login-email">
        <div class="password-container">
            <input type="password" name="password" id="password" placeholder="Password" onfocus="showButton('password')" onblur="hideButton('password')">
            <div class="showPasswordButton" onclick="changeType('password')" id="passwordButton" onmouseover="stopLoseFocus('password')" onmouseleave="continueLoseFocus('password')"></div>
        </div>
        <input type="submit" name="submit" id="submit" value="Login">
    </form>
</section>
</main>

<script src="accounts/account-forms.js"></script>
<?php include("templates/footer.php"); ?>