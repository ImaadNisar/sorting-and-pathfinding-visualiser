function mergeSort(bars, speed) {
    setInitTransform(bars)


    listOfBars =[]

    for (i=0; i<bars.length; i++) {
        listOfBars.push([bars[i]])
    }

    
    mergeSortRecursive(bars, speed, listOfBars , 0)
}

function mergeSortRecursive(bars, speed, listOfBars, index) {
    if (listOfBars.length != 1) {
        if (index == listOfBars.length - 1) {
            index = 0
        }

        jointLists = listOfBars[index].concat(listOfBars[index+1])

        newlist = merge(listOfBars[index], listOfBars[index+1], counter=0, merged=[], jointLists)
        listOfBars[index] = newlist
        listOfBars.splice(index, 1)

        index++
        mergeSortRecursive(bars, speed, listOfBars, index)
        
            
    } else {return} // end of sort
}

function merge(list1, list2, counter, merged, jointLists) {
    if (list1.length == 0 || list2.length == 0) {
        // do something
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

    swapMergeBars(pushedItems, counter, jointLists)
        
    
    
    setTimeout(merge, 400, list1, list2, counter, merged, jointLists)

}

function swapMergeBars(pushedItems, counter, jointLists) {
    if (pushedItems.length != 0) {
        pushedItemIndex = jointLists.indexOf(pushedItems[0])
        difference =  Math.abs(pushedItemIndex-counter) 
        // pushed item will always be on the right hand 
        // side therefore we can get absolute value and ignore direction


        var curTransformStr = bar.style.transform
        var curTransformVal = parseInt(curTransformStr.replace(/[^0-9-]/g, ""))

        if (direction == "right") {
            curTransformVal += 110
            bar.style.transform = "translateX("+curTransformVal+"%)"
        }else {
            curTransformVal -= 110
            bar.style.transform = "translateX("+curTransformVal+"%)"
        }


        pushedItems.splice(0,1)
        
        counter ++
        
    }

    return counter
}