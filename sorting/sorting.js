window.onload = function(){createBars()};
document.getElementById('tts-button').setAttribute('toggle', 'mute') // init

function createBars(numberOfBars = null, barSizes = null) {
    var barContainer = document.getElementById('bar-container')
    var defaultNumBars = document.getElementById('size').valueAsNumber;
    if (!(numberOfBars === null)) {
        defaultNumBars = numberOfBars
    }
    var width = (100/defaultNumBars) * 0.8


    for (i=1; i<(defaultNumBars + 1); i++) {
        var randBarSize = Math.floor(Math.random() * 30) + 1
        if (!(barSizes === null)) {
            randBarSize = barSizes[i-1]
        }
        var bar = document.createElement('div')
        var idName = 'bar'+i

        bar.setAttribute('id', idName)
        bar.setAttribute('class', 'bar')


        bar.style.width = width + "%"
        bar.style.height = randBarSize * 20 + "px"
        bar.style.margin = "0 "+width*0.05+"%"
        
        barContainer.appendChild(bar)

        
        // value = (bar.style.height.slice(0, bar.style.height.length-2))  - Value of the bar
    }

    
}


function updateBars() {
    moveTag()
    clearBars()
    createBars()
}


function moveTag() {
    rangeVal = document.getElementById('size').value


    position = ((rangeVal-7)/73) * 184

    tag = document.getElementById('size-tag')
    tag.innerText = rangeVal
    tag.style.left = position+"px"

}

function tagOpacity(id, change) {
    tag = document.getElementById(id)
    if (change == "show") {
        tag.style.opacity = 1
    }else {
        tag.style.opacity = 0
    }
}

function clearBars() {
    document.getElementById('english-text').innerText = ""
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
        var barSizes = custom.split(",").filter(Boolean) // removes whitespace character at end of string
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

        setInitTransform(bars)

        document.getElementById('english-text').innerText = ""

        //check tts
        var button = document.getElementById('tts-button')
        if (button.getAttribute('toggle') == 'unmute') {
            speed = 7
        }
        button.removeAttribute('onclick')
        button.style.cursor = 'not-allowed'
        
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


// REUSABLE FILES ---------------
function move(bar, direction) {
    var curTransformStr = bar.style.transform
    var curTransformVal = parseInt(curTransformStr.replace(/[^0-9-]/g, ""))

    if (direction == "right") {
        curTransformVal += 110
        bar.style.transform = "translateX("+curTransformVal+"%)"
    }else {
        curTransformVal -= 110
        bar.style.transform = "translateX("+curTransformVal+"%)"
    }
    
}


function setInitTransform(bars) {
    for (i=0; i<bars.length; i++) {
        bars[i].style.transform = "translateX(0%)"
    }
}


function resetBarColor(bars) {
    for (j=0; j<bars.length; j++) {
        bars[j].style.background = "linear-gradient(#36d1dc, #5b86e5)"
    }
}


function checkAll(bars, i=0) {
    if (i<bars.length) {
        bars[i].style.background = "linear-gradient(#56ab2f, #a8e063)"
        i++
        setTimeout(checkAll, 800/bars.length, bars, i)
    }else{
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


        var start = document.getElementById('start')
        start.setAttribute('onclick', 'startSorting()')
        start.style.cursor = 'pointer'
        start.style.filter = 'brightness(1)'

        var button = document.getElementById('tts-button')
        button.setAttribute('onclick', 'toggleTTS()')
        button.style.cursor = 'pointer'

        sortCompleteMsg()
        return true
    }
}


function sortCompleteMsg() {
    element = document.getElementById('english-text')
    element.innerText = 'sort complete'
    ttsDesc('sort complete')
}

async function delay(speed) {
    return new Promise(resolve => 
        setTimeout(() => {
            resolve()
        }, 1000*speed)
    )
}

function updateSpeed() {
    speedVal = document.getElementById('speed').value
    speedTag = document.getElementById('speed-tag')
    speedVal = parseFloat(speedVal).toFixed(2)
    speedTag.innerText = speedVal+'s'
}







function toggleTTS() {
    button = document.getElementById('tts-button')
    
    if (button.getAttribute('toggle') == 'mute') {
        button.style.backgroundImage = 'url("images/unmute.png")'
        button.setAttribute('toggle', 'unmute') // unmuted
        document.getElementById('speed').disabled = true
        document.getElementById('speed').style.cursor = 'not-allowed'
    }else {
        button.style.backgroundImage = 'url("images/mute.png")'
        button.setAttribute('toggle', 'mute')
        document.getElementById('speed').disabled = false
        document.getElementById('speed').style.cursor = 'default'
    }


}

