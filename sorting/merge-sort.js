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

        mindex1, mindex2 = 0, 0
        newlist = merge(listOfBars[index], listOfBars[index+1], 0, 0)
        listOfBars[index] = newlist
        listOfBars.splice(index, 1)
        index++

        mergeSortRecursive(bars, speed, listOfBars, index)
        
            
    } else {return}
}

function merge(list1, list2, index1, index2) {
    if (index1<list1.length && index2<list2.length) {

        list1Val = parseInt(list1[index1].style.height.slice(0, list1[index1].style.height.length-2))
        list2Val = parseInt(list2[index2].style.height.slice(0, list2[index2].style.height.length-2))

        if (list1Val > list2Val) {
            
        } else if (list2val < list2Val) {

        }
    }else {

    }

}