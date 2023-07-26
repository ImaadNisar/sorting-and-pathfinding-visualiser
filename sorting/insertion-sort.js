function insertionSort(bars, speed) {
    insertionSortRecursive(bars, speed, 1, 1)

}

async function insertionSortRecursive(bars, speed, index1, index2) {
    desc("insertion", "endcheck", undefined, [index1, bars.length]) // call descriptions
    await delay(speed)
    if (index1 == bars.length) { // base case
        resetBarColor(bars)
        checkAll(bars)
        return
        //algorithm finished
    }

    
    if (index2 > 0) { // work backwards until beginning reached

        //obtain bar height values for comparison
        var curVal = parseInt(bars[index2].style.height.slice(0, bars[index2].style.height.length-2))
        var prevVal = parseInt(bars[index2-1].style.height.slice(0, bars[index2-1].style.height.length-2))

        // set bar stylings
        resetBarColor(bars)
        bars[index2].style.background = "lime"
        bars[index2-1].style.background = 'yellow'

        desc("insertion", "indexcheck", undefined, [index2, undefined])
        await delay(speed)

        desc("insertion", "compare", [curVal, prevVal])

        if (curVal < prevVal) {

            // moves bars on screen
            setTimeout(move, 1000*speed, bars[index2], "left")
            setTimeout(move, 1000*speed, bars[index2-1], "right")

            setTimeout(desc, 1000*speed, "insertion", "swap")
            
            // swap bars in array
            var curID = bars[index2].id
            bars[index2].id = bars[index2-1].id
            bars[index2-1].id = curID

            var temp = bars[index2]
            bars[index2] = bars[index2-1]
            bars[index2-1] = temp

            index2 -- 

        }else { // bar in place so move to next by incrementing index
            index1 ++
            index2 = index1
        }
        return setTimeout(insertionSortRecursive, 2000*speed, bars, speed, index1, index2, length)
    } else {// bar is in first index so cant move back further therefore move to next bar by incrementing index
        index1 ++
        index2 = index1
        return setTimeout(insertionSortRecursive, 2000*speed, bars, speed, index1, index2, length)  
    }

}