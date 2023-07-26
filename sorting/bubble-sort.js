function bubbleSort(bars, speed) {
    var length = bars.length - 1 // calculate length
    bubbleSortRecursive(bars, speed, 0, length, false) // first function call

}



async function bubbleSortRecursive(bars, speed, curIndex, length, swapped) {
    desc("bubble", "endcheck", undefined, [curIndex, length]) // calls descriptions
    await delay(speed) // description delay
    resetBarColor(bars) // reset bar colors
    if (curIndex < length) {
        // compare cur and next
        var curVal = parseInt(bars[curIndex].style.height.slice(0, bars[curIndex].style.height.length-2))
        var nextVal = parseInt(bars[curIndex+1].style.height.slice(0, bars[curIndex+1].style.height.length-2))

        // set bar styles
        bars[curIndex].style.background = "lime"
        bars[curIndex+1].style.background = 'yellow'

        desc("bubble", "compare", [curVal, nextVal])

        if (curVal > nextVal) {
            swapped = true
            setTimeout(move, 1000*speed, bars[curIndex], "right")  // moves the bars visually
            setTimeout(move, 1000*speed, bars[curIndex + 1], "left")

            setTimeout(desc, 1000*speed, "bubble", "swap")
            
            // swaps the bars ID and index in array
            var curID = bars[curIndex].id
            bars[curIndex].id = bars[curIndex+1].id
            bars[curIndex+1].id = curID

            var temp = bars[curIndex]
            bars[curIndex] = bars[curIndex+1]
            bars[curIndex+1] = temp
            // call function again
            return setTimeout(bubbleSortRecursive, 2000*speed, bars, speed, curIndex+1, length, swapped)
        }else {
            return setTimeout(bubbleSortRecursive, 1000*speed, bars, speed, curIndex+1, length, swapped)
        }

        
    }

    desc("bubble", "lengthcheck", undefined, [length, swapped]) 
    await delay(speed)
    if (length > 0 && swapped) {  // call function again as end of pass reached
        // update indexes
        length--
        curIndex = 0
        return setTimeout(bubbleSortRecursive, 1000*speed, bars, speed, curIndex, length, false)
    }else{
        checkAll(bars)  // algorithm finished
    }
}
