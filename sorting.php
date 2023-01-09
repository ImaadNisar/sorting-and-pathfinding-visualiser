<?php include("templates/header.php"); ?>

<main>

<div class="sorting-container">
    <section class="options-container">
        <label for="algorithm">Algorithm:</label>
        <select name="algorithm" id="algorithm">
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Quick Sort">Quick Sort</option>
        </select>
        
        <label for="size">Size:</label>
        <input type="range" min="7" max="50" step="1" name="size" value="15" id="size" oninput="updateBars()">


        <label for="speed">Speed:</label>
        <input type="range" min="0.25" max="10" step="0.25" name="speed" value="1" id="speed">
        <div>
            <input type="button" onclick="updateBars()" value="Randomize" id="random">
            <span>or</span>
            <input type="text" id="custom" placeholder="Customize e.g. 2, 12, 4, 30" onkeyup="customBars()">
        </div>
    </section>

    <section id="bar-container"></section>

    <section class="media-container">
        <!-- MEDIA CONTROLS HERE -->
    </section>

    <div onclick="startSorting()">Start</div> <!-- START ALGORITHM HERE -->
</div>


<div class="cards-container">
    <!-- CARDS GO HERE -->
</div>

</main>

<script src="sorting/insertion-sort.js"></script>
<script src="sorting/bubble-sort.js"></script>
<script src="sorting/sorting.js"></script>


<?php include('templates/footer.php'); ?>