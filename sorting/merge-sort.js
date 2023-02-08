function mergeSort(bars, speed) {
    setInitTransform(bars)


    listOfBars =[]

    for (i=0; i<bars.length; i++) {
        listOfBars.push([bars[i]])
    }

    
    mergeSortRecursive(bars, speed, listOfBars , 0)
}

async function mergeSortRecursive(bars, speed, listOfBars, index) {
    if (listOfBars.length != 1) {
        if (index == listOfBars.length - 1) {
            index = 0
        }

        jointLists = listOfBars[index].concat(listOfBars[index+1])
        
        newlist = await merge(listOfBars[index], listOfBars[index+1], counter=0, merged=[], jointLists) // could use await
        

        listOfBars.splice(index, 2, newlist)

        console.log(listOfBars[0])

        index++
        setTimeout(mergeSortRecursive, 400, bars, speed, listOfBars, index)
        
            
    } else {return} // end of sort
}

async function merge(list1, list2, counter, merged, jointLists) {
    if (list1.length == 0 || list2.length == 0) {
        if (list1.length == 0) {
            pushedItems=list2
            for (i=0;i<list2.length;i++) {
                merged.push(list2[i])
            }
        }
        else if (list2.length == 0) {
            pushedItems=list1
            for (i=0;i<list1.length;i++) {
                merged.push(list1[i])
            }
        }


        counter, jointLists = swapMergeBars(pushedItems, counter, jointLists)
        return merged
    }
    
    val1 = parseInt(list1[0].style.height.slice(0, list1[0].style.height.length-2))
    item1 = list1[0]
    val2 = parseInt(list2[0].style.height.slice(0, list2[0].style.height.length-2))
    item2 = list2[0]


    if (val1 > val2) {
        pushedItems = [item2]
        merged.push(item2)
        list2.splice(0, 1)
    }
    else if (val1 < val2) {
        pushedItems = [item1]
        merged.push(item1)
        list1.splice(0, 1)
    }
    else if (val1 == val2) {
        pushedItems = [item1, item2]
        merged.push(item1)
        merged.push(item2)
        list1.splice(0, 1)
        list2.splice(0, 1)
    }

    counter, jointLists = swapMergeBars(pushedItems, counter, jointLists)
        
    setTimeout(merge, 500*pushedItems.length, list1, list2, counter, merged, jointLists)

}

function swapMergeBars(pushedItems, counter, jointLists) {
    if (pushedItems.length != 0) {
        rightItem = pushedItems[0]
        leftItem = jointLists[counter]

        rightItemIndex = jointLists.indexOf(rightItem)
        difference =  Math.abs(rightItemIndex-counter) 
        // pushed item will always be on the right hand 
        // side therefore we can get absolute value and ignore direction


        // 110 pixels is the amount to translate 1 bars width therefore, must be multiplied
        var rightItemTransformStr = rightItem.style.transform
        var rightItemTransformVal = parseInt(rightItemTransformStr.replace(/[^0-9-]/g, ""))
        rightItemTransformVal -= 110*difference
        rightItem.style.transform = "translateX("+rightItemTransformVal+"%)"

        var leftItemTransformStr = leftItem.style.transform
        var leftItemTransformVal = parseInt(leftItemTransformStr.replace(/[^0-9-]/g, ""))
        leftItemTransformVal += 110*difference
        leftItem.style.transform = "translateX("+leftItemTransformVal+"%)"

        // swaps the position of items in the jointLists array
        jointLists[counter] = rightItem
        jointLists[rightItemIndex] = leftItem

        pushedItems.splice(0,1)
        counter ++

        return setTimeout(swapMergeBars, 400, pushedItems, counter, jointLists)
        
        
    }else {
        return counter, jointLists

    }
}