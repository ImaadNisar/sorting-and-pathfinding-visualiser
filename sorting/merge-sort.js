async function mergeSort(bars, speed) {
    resetBarColor(bars)
    // declare initial variables
    var index=0
    var listOfBars =[]

    for (i=0; i<bars.length; i++) { // add all bars as array to 2D array
        listOfBars.push([bars[i]])
    }

    while (listOfBars.length != 1) {  // iterates until final merge (2D array length = 1)
        if (index >= listOfBars.length - 1) {
            index = 0 // starts at beginning if out of range
        }
        
        //old list formed from concatenating two lists
        var oldList = listOfBars[index].concat(listOfBars[index+1])

        //newlist formed from merging two lists
        var newList = merge(listOfBars[index], listOfBars[index+1])

        listOfBars.splice(index, 2, newList) // replace old lists (2) with new list (1)

        await swapMerge(bars, speed, oldList, newList) // swap bars visually
        index++
    }
    resetBarColor(bars)
    bars = listOfBars[0]
    checkAll(bars)
    // algorithm end
}


function swapMerge(bars, speed, oldList, newList, curIndex=0) {
    return new Promise(resolve => // promise allows async function to halt
        loop = setInterval(() => {

            // obtain old and new index and value of item
            // move item from its old position to its new position
            var oldIndex = oldList.indexOf(newList[curIndex])
            var difference =  Math.abs(oldIndex-curIndex) 

            var newItem = oldList[oldIndex]
            var oldItem = oldList[curIndex]

            resetBarColor(bars)
            for (i=0;i<newList.length;i++) { // sets color of merge subset blue
                newList[i].style.background = "blue"
            }
            newItem.style.background = 'lime' // highlight current selected item
            var value = parseInt(newItem.style.height.slice(0, newItem.style.height.length-2))/20
            desc("merge", "selectsmallest", undefined, [value, undefined]) // call descriptions

            setTimeout(() => {
            if (difference!=0) { // move bar if not in same position
                desc("merge", "movesmallest", undefined, [value, curIndex]) 

                // move bar by updating transform value
                // smallest item will move left (-ve)
                var newItemTransformStr = newItem.style.transform
                var newItemTransformVal = parseInt(newItemTransformStr.replace(/[^0-9-]/g, ""))
                newItemTransformVal -= 110*difference
                newItem.style.transform = "translateX("+newItemTransformVal+"%)"
                // item being displaced will move right (+ve)
                var oldItemTransformStr = oldItem.style.transform
                var oldItemTransformVal = parseInt(oldItemTransformStr.replace(/[^0-9-]/g, ""))
                oldItemTransformVal += 110*difference
                oldItem.style.transform = "translateX("+oldItemTransformVal+"%)"

            }else {
                desc("merge", "inplace",)
            }
        
            },1000*speed)
            
            // swap items in old list to reflect change visually
            var temp = oldList[curIndex]
            oldList[curIndex] = newList[curIndex]
            oldList[oldIndex] = temp
            
            curIndex++
            if (curIndex == newList.length) { // resolve promise once end of list reached
                resolve()
                clearInterval(loop)
            }
            
        }, 2000*speed)
    )
}





function merge(list1, list2) { // start merge function
    // declare index variables and final merged list
    var index1 = 0 
    var index2 = 0
    var merged = []

    // conditional iteration
    while (index1<list1.length && index2<list2.length) {

        // obtains height value of bars for comparison
        var val1 = parseInt(list1[index1].style.height.slice(0, list1[index1].style.height.length-2))
        var val2 = parseInt(list2[index2].style.height.slice(0, list2[index2].style.height.length-2))

        //compares height values and pushes smallest bars to merged 
        if (val1 > val2) {
            merged.push(list2[index2])
            index2++
        }
        else if (val1 < val2) {
            merged.push(list1[index1])
            index1++
        }
        else if (val1 == val2) {
            merged.push(list1[index1])
            index1++
            merged.push(list2[index2])
            index2++
        }
    }
    
    // pushes the rest of the non-empty array contents onto merged
    if (index1 < list1.length) {
        merged = merged.concat(list1.slice(index1, list1.length))
    }

    if (index2 < list2.length) {
        merged = merged.concat(list2.slice(index2, list2.length))
    }
    
    return merged
}