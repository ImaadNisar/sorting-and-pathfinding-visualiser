<?php include("templates/header.php") ?>

<main class="index-main">
    <section class="index-section-container">
        <h1 class="index-title">Visualize It</h1>
        <a href="register-page.php"><div class="index-get-started-button">Create an account</div></a>
    </section>
    <section class="index-pages-preview-container">
        <div class="hover-container"><a href="sorting.php" class="index-tile-link"><article class="index-sort-preview-container preview-container preview-container1">
            <img src="images/sorting-image.png" alt="Sorting Preview Image">
            <h2>Sorting Visualizer</h2>
        </article></a></div><!--
        --><div class="hover-container"><a href="pathfinding-grid.php" class="index-tile-link"><article class="index-find-grid-preview-container preview-container preview-container2">
            <img src="images/pathfinding-grid-image.png" alt="Grid Preview Image">
            <h2>Pathfinding Visualizer: Grid</h2>
        </article></a></div><!--
        --><div class="hover-container"><a href="pathfinding-map.php" class="index-tile-link"><article class="index-find-grid-preview-container preview-container preview-container3">
            <img src="images/pathfinding-map-image.png" alt="Map Preview Image">
            <h2>Pathfinding Visualizer: Map</h2>
        </article></a></div>

    </section>



</main>


<?php include("templates/footer.php") ?>