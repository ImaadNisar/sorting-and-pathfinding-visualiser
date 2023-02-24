<?php require("templates/header.php"); ?>

<div id="wrapper"></div>
<div id="info-container">
    <span id="info-exit" onclick="infoClose()"></span>
</div>

<main class="pathfinding-grid-main">
<section class="pathfinding-grid-input-container">
    <label for="algorithm">Algorithm:</label>
    <select name="algorithm" id="algorithm">
        <option value="dijkstras">Dijkstra's Pathfinding</option>
        <option value="astarE">A* Pathfinding (Euclidean)</option>
        <option value="astarM">A* Pathfinding (Manhattan)</option>
    </select>
    <label for="speed">Speed:</label>
    <input type="range" name="speed" id="speed" min="0.25" max="10" step="0.25" value="1">
</section>

<section class="pathfinding-grid-graph-container" id="load" onmousedown="startClicking()" onmouseup="stopClicking()" onmouseleave="stopClicking()">

    <?php
    for ($i=0;$i<19;$i++) {
        echo('<div class="row" id="'.($i).'">');

        for ($j=0; $j<40; $j++) {
            $id = $i.' '.$j;
            if ($i == 9 and $j == 6) {
                echo("<div class='vertex unvisited start' id='".$id."' type='start'></div>");
            }
            else if ($i ==9 and $j == 32) {
                echo("<div class='vertex unvisited end' id='".$id."' type='end'></div>");
            }
            else {
                echo("<div class='vertex unvisited normal' id='".$id."' onmouseover='changeWall(\"$id\")' onmousedown='changeWall(\"$id\", true)' type='normal'></div>");
            }

        }

        echo('</div>');
    }
    ?>

</section>

<section>
    <span onclick="infoOpen()">How to use</span>
    <input type="button" value="start" id="start" onclick="startGrid()">
</section>




</main>

<script src="pathfinding/astar.js"></script>
<script src="pathfinding/dijkstras.js"></script>
<script src="pathfinding/pathfinding.js"></script>

<?php include('templates/footer.php'); ?>