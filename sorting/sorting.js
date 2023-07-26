// init
window.onload = function(){createBars()};
document.getElementById('tts-button').setAttribute('toggle', 'mute')
initPseudocode()

function createBars(numberOfBars = null, barSizes = null) { // creates bars onscreen
    var barContainer = document.getElementById('bar-container') 
    var defaultNumBars = document.getElementById('size').valueAsNumber;
    if (!(numberOfBars === null)) {
        defaultNumBars = numberOfBars // sets custom dataset size
    }
    var width = (100/defaultNumBars) * 0.8 // sets width of each bar as %

    for (i=1; i<(defaultNumBars + 1); i++) { // iterates to add each bar
        var randBarSize = Math.floor(Math.random() * 30) + 1 // randomly generates bar size
        if (!(barSizes === null)) {
            randBarSize = barSizes[i-1] // replaces bar size if custom
        }
        var bar = document.createElement('div') // create bar
        // set bar attributes
        var idName = 'bar'+i
        bar.setAttribute('id', idName)
        bar.setAttribute('class', 'bar')

        // style bar
        bar.style.width = width + "%"
        bar.style.height = randBarSize * 20 + "px"
        bar.style.margin = "0 "+width*0.05+"%"
        
        barContainer.appendChild(bar) // add bar to containing element
    }
}

function updateBars() { // called by size slider
    moveTag() // moves size tag
    clearBars() // removes bars from container
    createBars() // adds new dataset to container
}

function moveTag() {
    var rangeVal = document.getElementById('size').value // obtain the new range value
    var position = ((rangeVal-7)/73) * 184 // obtains the position of the tag as number of pixels from left

    // updates tag attributes
    var tag = document.getElementById('size-tag')
    tag.innerText = rangeVal
    tag.style.left = position+"px"

}

function tagOpacity(id, change) { // shows tag when slider highlighted
    var tag = document.getElementById(id)
    if (change == "show") { // show when highlighted
        tag.style.opacity = 1
    }else { // hide when left
        tag.style.opacity = 0
    }
}

function clearBars() {
    document.getElementById('english-text').innerText = "" // clears english description
    var barContainer = document.getElementById('bar-container')
    while (barContainer.firstChild) { // removes each child of barContainer until no children left
        barContainer.removeChild(barContainer.firstChild)
    }
}

function customBars() {
    clearBars() // clears bars on screen
    var custom = document.getElementById('custom').value // obtains value from input field

    // verify input using length check and regex to check format valid
    if (custom.length > 0 && custom.match(/^[0-9]+(,[0-9]+)*$/)) {
        
        var barSizes = custom.split(",").filter(Boolean) // removes whitespace character at end of string
        var numberOfBars = barSizes.length // obtain dataset length

        for (i=0; i<numberOfBars; i++) { // check each bar is within range
            barSizes[i] = parseInt(barSizes[i].trim())
            if (barSizes[i] > 30) {
                barSizes[i] = 30
            }else if (barSizes[i] == 0) { // if bar is 0 then stop before bars are displayed on screen
                return
            }
        }
        createBars(numberOfBars, barSizes) // display bars on screen passing new parameters
    }
}

function startSorting() {
    var barContainer = document.getElementById('bar-container')
    if (!(barContainer.firstChild)) { // checks dataset not empty
        alert("Dataset is empty")
        createBars()
        return
    }else {
        // disable all algorithm options before algorithm execution
        var a = document.getElementById('algorithm')
        var s = document.getElementById('size')
        var r = document.getElementById('random')
        var c = document.getElementById('custom')
        var sp = document.getElementById('speed')
        a.disabled = true
        s.disabled = true
        r.disabled = true
        c.disabled = true
        sp.disabled = true
        a.style.cursor = 'not-allowed'
        s.style.cursor = 'not-allowed'
        r.style.cursor = 'not-allowed'
        c.style.cursor = 'not-allowed'
        sp.style.cursor = 'not-allowed'
        var start = document.getElementById('start')
        start.removeAttribute('onclick')
        start.style.cursor = 'not-allowed'
        start.style.filter = 'brightness(0.7)'

        // algorithm parameters
        var speed = document.getElementById('speed').valueAsNumber
        var barsHTML = barContainer.children
        var bars = Array.from(barsHTML)

        var algorithm = document.getElementById('algorithm').value

        setInitTransform(bars) // moves all bars to start position

        document.getElementById('english-text').innerText = ""

        //check tts
        var button = document.getElementById('tts-button')
        if (button.getAttribute('toggle') == 'unmute') {
            speed = 7
        }
        button.removeAttribute('onclick')
        button.style.cursor = 'not-allowed'
        
        // call selected algorithm
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

function move(bar, direction) { // swaps bars positions
    // obtain current transform value and filter for numerical value
    var curTransformStr = bar.style.transform
    var curTransformVal = parseInt(curTransformStr.replace(/[^0-9-]/g, "")) 

    // 110% = element width (100%) + 2 x margin (5%)

    if (direction == "right") { // move right by adding 110%
        curTransformVal += 110
        bar.style.transform = "translateX("+curTransformVal+"%)"
    }else { // move left by subtracting 110% 
        curTransformVal -= 110
        bar.style.transform = "translateX("+curTransformVal+"%)"
    }
    
}

function setInitTransform(bars) { // move all bars to original position by resetting transform value
    for (i=0; i<bars.length; i++) {
        bars[i].style.transform = "translateX(0%)"
    }
}

function resetBarColor(bars) { // resetting bar color by changing background back to default
    for (j=0; j<bars.length; j++) {
        bars[j].style.background = "linear-gradient(#36d1dc, #5b86e5)"
    }
}

function checkAll(bars, i=0) {
    if (i<bars.length) { // continually call function with delay until all bars highlighted
        bars[i].style.background = "linear-gradient(#56ab2f, #a8e063)"
        i++
        setTimeout(checkAll, 800/bars.length, bars, i)
    }else{// once highlighting finished
        // set form values back to default
        var a = document.getElementById('algorithm')
        var s = document.getElementById('size')
        var r = document.getElementById('random')
        var c = document.getElementById('custom')
        var sp = document.getElementById('speed')
        a.disabled = false
        s.disabled = false
        r.disabled = false
        c.disabled = false
        sp.disabled = false
        a.style.cursor = 'pointer'
        s.style.cursor = 'default'
        r.style.cursor = 'pointer'
        c.style.cursor = 'text'
        sp.style.cursor = 'default'

        // set start button and tts button back to default
        var start = document.getElementById('start')
        start.setAttribute('onclick', 'startSorting()')
        start.style.cursor = 'pointer'
        start.style.filter = 'brightness(1)'

        var button = document.getElementById('tts-button')
        button.setAttribute('onclick', 'toggleTTS()')
        button.style.cursor = 'pointer'

        // complete descriptions
        pseudocodeComplete()
        sortCompleteMsg()
        return true
    }
}

function pseudocodeComplete() {
    // obtain all lines of pseudocode
    var container = document.getElementById('pseudocode-container') 
    var children = container.children
    for (var i=0;i<children.length;i++) { // set background to transparent (unhighlight)
        children[i].style.backgroundColor = 'transparent'
        children[i].style.color = "grey"
    }
}

function sortCompleteMsg() { // set english text to 'sort complete'
    var element = document.getElementById('english-text')
    element.innerText = 'sort complete'
    ttsDesc('sort complete')
}

async function delay(speed) { // delay used in algorithms
    return new Promise(resolve => // resolve promise after timeout
        setTimeout(() => {
            resolve()
        }, 1000*speed)
    )
}

function updateSpeed() { // change the speed value after using the slider
    speedVal = document.getElementById('speed').value
    speedTag = document.getElementById('speed-tag')
    speedVal = parseFloat(speedVal).toFixed(2) // format value as string to 2dp
    speedTag.innerText = speedVal+'s'
}

function toggleTTS() { // function called when tts button clicked
    button = document.getElementById('tts-button')
    
    if (button.getAttribute('toggle') == 'mute') { // change image and disable speed slider when unmuted
        button.style.backgroundImage = 'url("images/unmute.png")'
        button.setAttribute('toggle', 'unmute') // unmuted
        document.getElementById('speed').disabled = true
        document.getElementById('speed').style.cursor = 'not-allowed'
    }else { // change image and enable speed slider when muted
        button.style.backgroundImage = 'url("images/mute.png")' 
        button.setAttribute('toggle', 'mute')
        document.getElementById('speed').disabled = false
        document.getElementById('speed').style.cursor = 'default'
    }
}

function initPseudocode() {
    var algorithm = document.getElementById('algorithm').value // get algorithm name
    var h1 = document.getElementById('pseudocode-name') // get h1 element by id
    h1.innerText = algorithm+" Pseudocode" // set h1 text to selected algorithm name
    pseudocodeDesc(algorithm) // add psuedocode lines to screen
}