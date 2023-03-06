async function quickSort(bars, speed) {
    bars = await quickSortRecursive(bars, speed, bars)
    resetBarColor(bars)
    checkAll(bars)
}


async function quickSortRecursive(bars, speed, arr) {
    if (arr.length <= 1) {
        return arr
    }else {
        var pointer = 0
        var pivot = arr.length-1

        while (pointer != pivot) {

            if (
                (parseInt(arr[pointer].style.height.slice(0, arr[pointer].style.height.length-2)) > 
                parseInt(arr[pivot].style.height.slice(0, arr[pivot].style.height.length-2))
                && pointer < pivot)
                || (parseInt(arr[pointer].style.height.slice(0, arr[pointer].style.height.length-2)) <
                parseInt(arr[pivot].style.height.slice(0, arr[pivot].style.height.length-2))
                && pointer > pivot)
            ) {

                var bar1 = arr[pointer]
                var bar2 = arr[pivot]

                setTimeout(function() {
                    desc("quick", "setindexes", undefined, [pointer, pivot])
                    resetBarColor(bars)
                    bar1.style.background = 'green'
                    bar2.style.background = 'yellow'
                    if (pivot==pointer) {
                        arr[pivot].style.background = 'orange'
                    }
                }, 1000*speed)

                await new Promise(resolve => setTimeout(() => {
                    desc("quick", "swap")
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
            var update = null
            if (pointer < pivot) {
                pointer++
                update = "increment"
            }else {
                pointer--
                update = "decrement"
            }
            await new Promise(resolve => setTimeout(() => {
                desc("quick", "updatepointer", undefined, [update, undefined])
                resetBarColor(bars)
                arr[pivot].style.background = 'yellow'
                arr[pointer].style.background = 'green'

                if (pivot==pointer) {
                    arr[pivot].style.background = 'orange'
                }

                resolve()
            }, 1000*speed))
            await new Promise(resolve => setTimeout(() => {
                resolve()
            }, 1000*speed)) 
        }
        
        var left = await quickSortRecursive(bars, speed, arr.slice(0,pointer))
        var right = await quickSortRecursive(bars, speed, arr.slice(pointer+1,arr.length))

        return left.concat([arr[pointer]], right)
    }
}