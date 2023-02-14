async function mergeSort(bars, speed) {
    resetBarColor(bars)

    index=0
    listOfBars =[]

    for (i=0; i<bars.length; i++) {
        listOfBars.push([bars[i]])
    }

    while (listOfBars.length != 1) {
        if (index >= listOfBars.length - 1) {
            index = 0
        }
        
        oldList = listOfBars[index].concat(listOfBars[index+1])

        newList = merge(listOfBars[index], listOfBars[index+1])

        listOfBars.splice(index, 2, newList)

        await swapMerge(bars, speed, oldList, newList)
        resetBarColor(bars)
        index++
        
    }

    bars = listOfBars[0]
    checkAll(bars)
}


function swapMerge(bars, speed, oldList, newList, curIndex=0) {
    return new Promise(resolve => 
        loop = setInterval(() => {

            oldIndex = oldList.indexOf(newList[curIndex])
            difference =  Math.abs(oldIndex-curIndex) 

            var newItem = oldList[oldIndex]
            var oldItem = oldList[curIndex]

            resetBarColor(bars)
            for (i=0;i<newList.length;i++) {
                newList[i].style.backgroundColor = "darkBlue"
            }
            newItem.style.backgroundColor = 'green'

            setTimeout(() => {
            if (difference!=0) {

                var newItemTransformStr = newItem.style.transform
                var newItemTransformVal = parseInt(newItemTransformStr.replace(/[^0-9-]/g, ""))
                newItemTransformVal -= 110*difference
                newItem.style.transform = "translateX("+newItemTransformVal+"%)"

                var oldItemTransformStr = oldItem.style.transform
                var oldItemTransformVal = parseInt(oldItemTransformStr.replace(/[^0-9-]/g, ""))
                oldItemTransformVal += 110*difference
                oldItem.style.transform = "translateX("+oldItemTransformVal+"%)"

            }},400/speed)
        
            temp = oldList[curIndex]
            oldList[curIndex] = newList[curIndex]
            oldList[oldIndex] = temp
        
            curIndex++
            if (curIndex == newList.length) {

                resolve()
                clearInterval(loop)
            }

        }, 800/speed)
    )
}


function merge(list1, list2) { // start merge function
    // declare index variables and final merged list
    index1 = 0 
    index2 = 0
    merged = []

    // conditional iteration
    while (index1<list1.length && index2<list2.length) {

        // obtains height value of bars for comparison
        val1 = parseInt(list1[index1].style.height.slice(0, list1[index1].style.height.length-2))
        val2 = parseInt(list2[index2].style.height.slice(0, list2[index2].style.height.length-2))

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