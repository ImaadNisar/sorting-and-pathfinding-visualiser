<?php include("templates/header.php"); ?>

<main class="sorting-main">

<div class="sorting-left-container">
    <section class="options-container sorting-box-shadow">

            <span id="tts-button" onclick='toggleTTS()'></span>

            <span class="algorithm-span top-span">
                <select name="algorithm" id="algorithm" oninput="initPseudocode()">
                    <option value="Bubble Sort">Bubble Sort</option>
                    <option value="Insertion Sort">Insertion Sort</option>
                    <option value="Merge Sort">Merge Sort</option>
                    <option value="Quick Sort">Quick Sort</option>
                </select>
            </span><!--
            --><span class="range-span top-span">
                <label for="size">Size:</label>
                <span class="range-container">
                    <input type="range" min="7" max="80" step="1" name="size" value="15" id="size" oninput="updateBars()" onmouseover="tagOpacity('size-tag', 'show')" onmouseleave="tagOpacity('size-tag', 'hide')">
                    <span id="size-tag" class="tag">15</span>
                </span>
            </span>
            
            <div class="bottom-div">
                <input type="button" onclick="updateBars()" value="Randomize" id="random">
                <span>or</span>
                <input type="text" id="custom" placeholder="Customize e.g. 2, 12, 4" onkeyup="customBars()" spellcheck="false">
            </div>
    </section>



    <div class="sorting-container ">
        <section id="bar-container" class="sorting-box-shadow"></section>
    </div>
    <div class="english-container">
        <p id="english-text"></p>
    </div>
    <section class="media-container sorting-box-shadow">
        <div id="start" onclick="startSorting()"></div> <!-- START ALGORITHM HERE -->
        <span class="speed-span">
            <label for="speed">Speed:</label>
            <span class="speed-container">
                <input type="range" min="0.01" max="20" step="0.01" name="speed" value="1" id="speed" onmouseover="tagOpacity('speed-tag', 'show')" onmouseleave="tagOpacity('speed-tag', 'hide')" oninput="updateSpeed()">
                <span id="speed-tag" class="tag">1.00s</span>
            </span>
        </span>
    </section>
</div>

<div class="sorting-right-container">
    <section class="psuedocode-tile-container">
        <h1 id="pseudocode-name"></h1>
        <hr>
        <div id="pseudocode-container">
        </div>
    </section>
</div>

</main>

<script src="sorting/templates.js"></script>
<script src="sorting/quick-sort.js"></script>
<script src="sorting/merge-sort.js"></script>
<script src="sorting/insertion-sort.js"></script>
<script src="sorting/bubble-sort.js"></script>
<script src="sorting/sorting.js"></script>


<?php include('templates/footer.php'); ?>