<?php require("templates/header.php"); ?>

<div id="wrapper"></div>
<div id="info-container">
    <span id="info-exit" onclick="infoClose()"></span>
    <div class='articles'>
        <article class="article1">
            <h2>1. Choose an algorithm</h2>
            <p>At the top of the screen, you can select an algorithm from the drop-down menu and change it's speed using the slider</p>
        </article>
        <article class="article2">
            <h2>2. Create a graph</h2>
            <p>By clicking on any cell in the grid, you can toggle between a normal cell and a wall - walls are blue cannot be traversed</p>
        </article>
        <article class="article3">
            <h2>3. Run the algorithm</h2>
            <p>At the bottom, you can run the algorithm with the selected settings or clear the grid</p>
        </article>
    </div><!--
    --><img src="images\pathfinding-grid-image-info.png">
</div>

<main class="pathfinding-grid-main">
<section class="pathfinding-grid-input-container">
    <span class="pathfinding-algorithm-container pathfinding-option-container">
        <select name="algorithm" id="algorithm">
            <option value="dijkstras">Dijkstra's Pathfinding</option>
            <option value="astarE">A* Pathfinding (Euclidean)</option>
            <option value="astarM">A* Pathfinding (Manhattan)</option>
        </select>
    </span>
    <span class="pathfinding-speed-container pathfinding-option-container">
        <label for="speed">Speed:</label>
        <input type="range" name="speed" id="speed" min="0.25" max="10" step="0.25" value="1">
    </span>
</section>

<section class="pathfinding-grid-graph-container" id="load" onmousedown="startClicking()" onmouseup="stopClicking()" onmouseleave="stopClicking()">

    <?php
    for ($i=0;$i<19;$i++) { // create graph of 19x40
        echo('<div class="row" id="'.($i).'">');

        for ($j=0; $j<40; $j++) {
            $id = $i.' '.$j; // constuct id from row and column
            if ($i == 9 and $j == 6) {
                echo("<div class='vertex unvisited start' id='".$id."' type='start'></div>"); // set vertex as start
            }
            else if ($i ==9 and $j == 32) {
                echo("<div class='vertex unvisited end' id='".$id."' type='end'></div>"); // set verted as end
            }
            else {
                echo("<div class='vertex unvisited normal' id='".$id."' onmouseover='changeWall(\"$id\")' onmousedown='changeWall(\"$id\", true)' type='normal'></div>"); // set vertex as normal
            }

        }

        echo('</div>');
    }
    ?>

</section>

<section class="pathfinding-button-container">
    <span onclick="infoOpen()" class="howtouse">How to use</span>
    <input type="button" id="pathfinding-start" onclick="startGrid()">
    <input type="button" id="pathfinding-clear" onclick="clearGrid()">
</section>




</main>

<script src="pathfinding/astar.js"></script>
<script src="pathfinding/dijkstras.js"></script>
<script src="pathfinding/pathfinding.js"></script>

<?php include('templates/footer.php'); ?>