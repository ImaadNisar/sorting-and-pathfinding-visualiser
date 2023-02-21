async function quickSort(bars, speed) {
    bars = await quickSortRecursive(bars, speed, bars)
    checkAll(bars)
}


async function quickSortRecursive(bars, speed, arr) {
    resetBarColor(bars)

    if (arr.length <= 1) {
        return arr
    }else {
        var pointer = 0
        var pivot = arr.length-1

        while (pointer != pivot) {
            resetBarColor(bars)
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
                    bar1.style.backgroundColor = 'green'
                    bar2.style.backgroundColor = 'yellow'
                    if (pivot==pointer) {
                        arr[pivot].style.backgroundColor = 'orange'
                    }
                }, 400/speed)

                await new Promise(resolve => setTimeout(() => {
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
                }, 800/speed))

                // swap items
                var temp = arr[pointer]
                arr[pointer] = arr[pivot]
                arr[pivot] = temp

                // swap pointers
                var tempPointer = pointer
                pointer = pivot
                pivot = tempPointer
            }

            if (pointer < pivot) {
                pointer++
            }else {
                pointer--
            }
            await new Promise(resolve => setTimeout(() => {
                resetBarColor(bars)
                arr[pivot].style.backgroundColor = 'yellow'
                arr[pointer].style.backgroundColor = 'green'

                if (pivot==pointer) {
                    arr[pivot].style.backgroundColor = 'orange'
                }

                resolve()
            }, 400/speed))

            await new Promise(resolve => setTimeout(() => {
                resolve()
            }, 400/speed)) 

        }
        
        var left = await quickSortRecursive(bars, speed, arr.slice(0,pointer))
        var right = await quickSortRecursive(bars, speed, arr.slice(pointer+1,arr.length))

        return left.concat([arr[pointer]], right)

    }

}












