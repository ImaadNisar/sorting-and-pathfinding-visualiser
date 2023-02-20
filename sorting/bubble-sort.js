function bubbleSort(bars, speed) {
    var length = bars.length - 1
    bubbleSortRecursive(bars, speed, 0, length)

}



function bubbleSortRecursive(bars, speed, curIndex, length) {
    resetBarColor(bars)
    if (curIndex < length) {
        // compare cur and next
        var curVal = parseInt(bars[curIndex].style.height.slice(0, bars[curIndex].style.height.length-2))
        var nextVal = parseInt(bars[curIndex+1].style.height.slice(0, bars[curIndex+1].style.height.length-2))

        bars[curIndex].style.backgroundColor = "green"
        bars[curIndex+1].style.backgroundColor = 'yellow'

        if (curVal > nextVal) {
            setTimeout(move, 400/speed, bars[curIndex], "right")  // moves the bars visually
            setTimeout(move, 400/speed, bars[curIndex + 1], "left")
            
            // swaps the bars ID and index in array
            var curID = bars[curIndex].id
            bars[curIndex].id = bars[curIndex+1].id
            bars[curIndex+1].id = curID

            var temp = bars[curIndex]
            bars[curIndex] = bars[curIndex+1]
            bars[curIndex+1] = temp

        }

        return setTimeout(bubbleSortRecursive, 800/speed, bars, speed, curIndex+1, length)
    }

    if (length > 0) {
        length--
        curIndex = 0
        return setTimeout(bubbleSortRecursive, 800/speed, bars, speed, curIndex, length)
    }else{
        checkAll(bars)
    }
}
