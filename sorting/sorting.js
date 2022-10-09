window.onload = function(){createBars()};

function createBars(numberOfBars = null, barSizes = null) {
    var barContainer = document.getElementById('bar-container')
    var defaultNumBars = document.getElementById('size').valueAsNumber;
    if (!(numberOfBars === null)) {
        defaultNumBars = numberOfBars
    }
    var width = (100/defaultNumBars) * 0.8


    for (i=1; i<(defaultNumBars + 1); i++) {
        var randBarSize = Math.floor(Math.random() * 25) + 1
        if (!(barSizes === null)) {
            randBarSize = barSizes[i-1]
        }
        var bar = document.createElement('div')
        var idName = 'bar'+i

        bar.setAttribute('id', idName)
        bar.setAttribute('class', 'bar')

        bar.style.width = width + "%"
        bar.style.height = randBarSize * 20 + "px"
        bar.style.margin = "0 " +width * 0.05 + "%"
        
        barContainer.appendChild(bar)

        
        // value = (bar.style.height.slice(0, bar.style.height.length-2))  - Value of the bar
    }

    
}


function updateBars() {
    clearBars()
    createBars()
}

function clearBars() {
    barContainer = document.getElementById('bar-container')
    while (barContainer.firstChild) {
        barContainer.removeChild(barContainer.firstChild)
    }
}

function customBars() {
    clearBars()
    custom = document.getElementById('custom').value

    //VERIFY INPUT HERE USING REGEX
    if (custom.length > 0) {  // and regex valid
        var barSizes = custom.split(",")
        var numberOfBars = barSizes.length

        for (i=0; i<numberOfBars; i++) {
            barSizes[i] = barSizes[i].trim()
        }

        createBars(numberOfBars, barSizes)
    }
    
}

function startSorting() {
    var barContainer = document.getElementById('bar-container')
    if (!(barContainer.firstChild)) {
        alert("Dataset is empty")
        createBars()
        return
    }else {
        // disable all algorithm options before algorithm execution
        document.getElementById('algorithm').disabled = true
        document.getElementById('size').disabled = true
        document.getElementById('speed').disabled = true
        document.getElementById('random').disabled = true
        document.getElementById('custom').disabled = true

        // algorithm parameters
        var speed = document.getElementById('speed').valueAsNumber
        var barsHTML = barContainer.children
        bars = Array.from(barsHTML)

        var algorithm = document.getElementById('algorithm').value
        
        if (algorithm == "Bubble Sort") {
            bubbleSort(bars, speed)
        }else if (algorithm == "Insertion Sort") {
            insertionSort(bars, speed)
        }else if (algorithm == "Merge Sort") {
            mergeSort(bars, speed)
        }else {
            quickSort(bars, speed)
        }
    }
}