function bubbleSort(bars, speed) {
    setInitTransform(bars)
    var swapped = true
    var length = bars.length
    while (swapped && length > 0) {
        swapped = false
        length --
        for (i=0; i<length; i++) {
            var curVal = parseInt(bars[i].style.height.slice(0, bars[i].style.height.length-2))
            var nextVal = parseInt(bars[i+1].style.height.slice(0, bars[i+1].style.height.length-2))

            bars[i].style.backgroundColor = "green"
            bars[i+1].style.backgroundColor = "yellow"
            

            if (curVal > nextVal) {
                move(bars[i], "right")
                move(bars[i+1], "left")
                
                var temp = bars[i]
                bars[i] = bars[i+1]
                bars[i+1] = temp

                swapped = true
            }
            resetBarColor(bars)
            

            //HERE
        }
    }

    document.getElementById('algorithm').disabled = false
    document.getElementById('size').disabled = false
    document.getElementById('speed').disabled = false
    document.getElementById('random').disabled = false
    document.getElementById('custom').disabled = false

}

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


function outputBars(bars) {
    arr = []
    for (i=0; i<bars.length; i++) {
        arr.push(bars[i].style.height)
    }
    console.log(arr)
}


function setInitTransform(bars) {
    for (i=0; i<bars.length; i++) {
        bars[i].style.transform = "translateX(0%)"
    }
}

function resetBarColor(bars) {
    for (j=0; j<bars.length; j++) {
        bars[j].style.backgroundColor = "#00a8f3"
    }
}