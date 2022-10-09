<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
    <title>Visualize It</title>
    <link rel="icon" type="image/x-icon" href="images/favicon.ico">
</head>
<body>
    <header>
        <nav>
        <a href="index.php"><img src="images/logo.png" alt="V" class="logo"></a>
        <ul class="nav-list">
            <a href="sorting.php" class="nav-links"><div class="nav-element-container"><li>Sort It</li></div></a><!--
            --><div class="nav-element-container nav-links dropdown">
                <li class="dropbtn">Find It</li>
                <div class="dropdown-content">
                    <a href="pathfinding-grid.php">Grid</a>
                    <a href="pathfinding-map.php">Map</a>
                </div>
            </div><!--
            --><a href="login-page.php" class="nav-links"><div class="nav-element-container"><li>Login/Register</li></div></a>
            <!-- ACCOUNT INCLUDE HERE -->
        </ul>
        </nav>
    <hr class="separator">
    </header>
