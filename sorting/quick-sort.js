async function quickSort(bars, speed) {
    bars = await quickSortRecursive(bars, speed, bars) // halt until algorithm ends
    resetBarColor(bars)
    checkAll(bars)
    // algorithm end
}


async function quickSortRecursive(bars, speed, arr) {
    if (arr.length <= 1) { // return when item is atomic
        return arr
    }else {
        // initialize pointer and pivot values
        var pointer = 0
        var pivot = arr.length-1

        while (pointer != pivot) { // iterate until pointer = pivot

            if (
                (parseInt(arr[pointer].style.height.slice(0, arr[pointer].style.height.length-2)) > 
                parseInt(arr[pivot].style.height.slice(0, arr[pivot].style.height.length-2))
                && pointer < pivot)
                || (parseInt(arr[pointer].style.height.slice(0, arr[pointer].style.height.length-2)) <
                parseInt(arr[pivot].style.height.slice(0, arr[pivot].style.height.length-2))
                && pointer > pivot)
            ) { // swap bars if condition met
                
                // obtain bars using indexes
                var bar1 = arr[pointer]
                var bar2 = arr[pivot]

                setTimeout(function() { // highlight bars after delay
                    desc("quick", "setindexes", undefined, [pointer, pivot]) // call descriptions
                    resetBarColor(bars)
                    bar1.style.background = 'lime'
                    bar2.style.background = 'yellow'
                    if (pivot==pointer) {
                        arr[pivot].style.background = 'orange' // bar highlighted as orange if selected by pivot and pointer
                    }
                }, 1000*speed)

                await new Promise(resolve => setTimeout(() => { // swap bar positions
                    desc("quick", "swap")
                    // distance to move = pointer - pivot
                    // sign of difference determines which direction values are translated
                    var difference = pointer - pivot
            
                    var bar2TransformStr = bar2.style.transform
                    var bar2TransformVal = parseInt(bar2TransformStr.replace(/[^0-9-]/g, ""))
                    bar2TransformVal += 110*difference
                    bar2.style.transform = "translateX("+bar2TransformVal+"%)"
            
                    var bar1TransformStr = bar1.style.transform
                    var bar1TransformVal = parseInt(bar1TransformStr.replace(/[^0-9-]/g, ""))
                    bar1TransformVal -= 110*difference
                    bar1.style.transform = "translateX("+bar1TransformVal+"%)"
                    
                    resolve()
                }, 2000*speed))

                // swap items
                var temp = arr[pointer]
                arr[pointer] = arr[pivot]
                arr[pivot] = temp

                // swap pointers
                var tempPointer = pointer
                pointer = pivot
                pivot = tempPointer
            }
            var update = null // records what update to pointer was made
            if (pointer < pivot) { // increment pointer
                pointer++
                update = "increment"
            }else { // decrement pointer
                pointer--
                update = "decrement"
            }
            await new Promise(resolve => setTimeout(() => { // shows change in pointer
                desc("quick", "updatepointer", undefined, [update, undefined])
                resetBarColor(bars)
                arr[pivot].style.background = 'yellow'
                arr[pointer].style.background = 'lime'

                if (pivot==pointer) {
                    arr[pivot].style.background = 'orange'
                }

                resolve()
            }, 1000*speed))
            await new Promise(resolve => setTimeout(() => { // delay before function called again
                resolve()
            }, 1000*speed)) 
        }
        
        //divide and conquer
        // call function for left side of array
        var left = await quickSortRecursive(bars, speed, arr.slice(0,pointer))
        // call function for right side of array
        var right = await quickSortRecursive(bars, speed, arr.slice(pointer+1,arr.length))

        //return joint array consisting of left+middle+right
        return left.concat([arr[pointer]], right)
    }
}