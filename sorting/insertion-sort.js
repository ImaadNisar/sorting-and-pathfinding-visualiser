function insertionSort(bars, speed) {
    insertionSortRecursive(bars, speed, 1, 1)

}

function insertionSortRecursive(bars, speed, index1, index2) {
    resetBarColor(bars)
    if (index1 == bars.length) { // base case
        checkAll(bars)
        return
    }
    if (index2 > 0) {

        var curVal = parseInt(bars[index2].style.height.slice(0, bars[index2].style.height.length-2))
        var prevVal = parseInt(bars[index2-1].style.height.slice(0, bars[index2-1].style.height.length-2))

        bars[index2].style.backgroundColor = "green"
        bars[index2-1].style.backgroundColor = 'yellow'

        if (curVal < prevVal) {

            setTimeout(move, 400/speed, bars[index2], "left")
            setTimeout(move, 400/speed, bars[index2-1], "right")

            var curID = bars[index2].id
            bars[index2].id = bars[index2-1].id
            bars[index2-1].id = curID

            var temp = bars[index2]
            bars[index2] = bars[index2-1]
            bars[index2-1] = temp

            index2 -- 

        }else {
            index1 ++
            index2 = index1
        }
        return setTimeout(insertionSortRecursive, 800/speed, bars, speed, index1, index2, length)
    } else {
        index1 ++
        index2 = index1
        return setTimeout(insertionSortRecursive, 800/speed, bars, speed, index1, index2, length)
    }
}