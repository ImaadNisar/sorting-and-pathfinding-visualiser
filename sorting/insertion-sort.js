function insertionSort(bars, speed) {
    insertionSortRecursive(bars, speed, 1, 1)

}

async function insertionSortRecursive(bars, speed, index1, index2) {
    desc("insertion", "endcheck", undefined, [index1, bars.length])
    await delay(speed)
    if (index1 == bars.length) { // base case
        resetBarColor(bars)
        checkAll(bars)
        return
    }

    
    if (index2 > 0) {

        var curVal = parseInt(bars[index2].style.height.slice(0, bars[index2].style.height.length-2))
        var prevVal = parseInt(bars[index2-1].style.height.slice(0, bars[index2-1].style.height.length-2))

        resetBarColor(bars)
        bars[index2].style.background = "green"
        bars[index2-1].style.background = 'yellow'

        desc("insertion", "indexcheck", undefined, [index2, undefined])
        await delay(speed)

        desc("insertion", "compare", [curVal, prevVal])

        if (curVal < prevVal) {

            setTimeout(move, 1000*speed, bars[index2], "left")
            setTimeout(move, 1000*speed, bars[index2-1], "right")

            setTimeout(desc, 1000*speed, "insertion", "swap")

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
        return setTimeout(insertionSortRecursive, 2000*speed, bars, speed, index1, index2, length)
    } else {
        index1 ++
        index2 = index1
        return setTimeout(insertionSortRecursive, 2000*speed, bars, speed, index1, index2, length)
    }

}