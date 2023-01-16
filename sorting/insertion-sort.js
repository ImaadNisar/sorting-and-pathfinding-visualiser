function insertionSort(bars, speed) {
    setInitTransform(bars)

    var length = bars.length - 1
    insertionSortRecursive(bars, speed, 1, 1, length)

}

function insertionSortRecursive(bars, speed, index1, index2, length) {
    if (index1 == bars.length) { // base case
        document.getElementById('algorithm').disabled = false
        document.getElementById('size').disabled = false
        document.getElementById('speed').disabled = false
        document.getElementById('random').disabled = false
        document.getElementById('custom').disabled = false
        return
    }
    if (index2 > 0) {

        var curVal = parseInt(bars[index2].style.height.slice(0, bars[index2].style.height.length-2))
        var prevVal = parseInt(bars[index2-1].style.height.slice(0, bars[index2-1].style.height.length-2))


        if (curVal < prevVal) {

            setTimeout(move, 400/speed, bars[index2], "left")
            setTimeout(move, 400/speed, bars[index2-1], "right")

            // var curID = bars[curIndex].id
            // bars[curIndex].id = bars[curIndex+1].id
            // bars[curIndex+1].id = curID

            // var temp = bars[curIndex]
            // bars[curIndex] = bars[curIndex+1]
            // bars[curIndex+1] = temp

        }
        index2 -- 
        return setTimeout(insertionSortRecursive, 800/speed, bars, speed, index1, index2, length)
    } else {
        index1 ++
        return setTimeout(insertionSortRecursive, 800/speed, bars, speed, index1, index2, length)
    }
}