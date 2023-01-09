<?php include("templates/header.php"); ?>

<?php 
if (isset($_GET['error'])) {
    echo $_GET['error'];
}
?>

<main>
<h1>Login to Visualize It</h1>
<a href="register-page.php">Don't have an account?</a>
<form action="accounts/login.php" method="post">
    <input type="text" name="email" id="email" placeholder="Email address">
    <input type="password" name="password" id="password" placeholder="Password">
    <div class="showPasswordLogin" onclick="changeType('password')">Show password</div>
    <input type="submit" name="submit" id="submit" value="Login">
</form>
</main>

<script src="accounts/account-forms.js"></script>
<?php include("templates/footer.php"); ?>