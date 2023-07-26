// main function from which all desc functions called
function desc(algorithm, move, vals=null, params=[,,]) { 
    text = englishDesc(algorithm, move, vals, params)
    ttsDesc(text)
    psuedocodeUpdate(algorithm, move)
}

function englishDesc(algorithm, move, vals, params) {
    if (vals != null || vals != undefined) { // obtain value of bars when bubble or insertion sorting
        var v1 = vals[0]/20
        var v2 = vals[1]/20
    }

    var descriptions = { // description object for each algorithm
        bubble : { // moves performed by bubble sort - key value pairs
            compare: "compare the bars. is <span class='h g'>current ("+ v1 +")</span> > <span class='h y'>next ("+ v2 +")</span>",
            swap: "swap the bars",
            endcheck: "has the end of the dataset been reached. is index ("+(params[0])+") =  length ("+(params[1]) +")",
            lengthcheck: "is length ("+(params[0])+") = 0 or is swapped ("+params[1]+") = false",
        },
        insertion : { // moves performed by insertion sort - key value pairs
            compare: "compare the bars. is <span class='h g'>current ("+ v1 +")</span> < <span class='h y'>previous ("+ v2 +")</span>",
            swap: "swap the bars",
            endcheck: "has the end of the dataset been reached. is index ("+(params[0])+") =  length ("+(params[1])+")",
            indexcheck: "is index2 ("+params[0]+") = 0",
        },
        merge : { // moves performed by merge sort - key value pairs
            selectsmallest: "select the <span class='h g'>smallest bar ("+params[0]+")</span> in the <span class='h b'>merged dataset</span>",
            movesmallest: "move the <span class='h g'>smallest bar ("+params[0]+")</span> to index ("+params[1]+") in the <span class='h b'>merged dataset</span>",
            inplace: "bar is in place",
        },
        quick : { // moves performed by quick sort - key value pairs
            setindexes: "set index <span class='h g'>"+params[0]+" as pointer</span> and index <span class='h y'>"+params[1]+" as pivot</span>",
            swap: "swap <span class='h g'>pointer</span> and <span class='h y'>pivot</span>",
            updatepointer: params[0]+" the <span class='h g'>pointer</span>"
        }
    }
    element = document.getElementById('english-text') // obtain english element
    element.innerHTML = descriptions[algorithm][move] // set innerHTML as text for formatted text

    return element.innerText // return text for tts descriptions
    
}

function ttsDesc(text) {
    ttsButton = document.getElementById('tts-button') 
    if (ttsButton.getAttribute('toggle') == "unmute") { // check if tts enabled
        //tts api
        var tts = new SpeechSynthesisUtterance(); // create new utterance obj

        // replace all non-spoken character with literals
        text = text.replaceAll('>', 'greater than') 
        text = text.replaceAll('<', 'less than')

        tts.text = text; // set text attribute
        window.speechSynthesis.speak(tts); // start tts speak
    }
}

function pseudocodeDesc(algorithm) {
    var descriptions = {  // init descriptions object
        bubble: [  // each key has array value to iterate
            ["function bubble_sort(bars, speed)",0], // each element in the array is an array itself
                ["n = bars.length",1],               // comprising of the line and no of indents
                ["swapped = true",1],
                ["WHILE swapped AND n > 0",1],
                    ["swapped = false",2],
                    ["n = n - 1",2],
                    ["FOR i=0 to n",2],
                        ["IF bars[i] > bars[i+1]",3],
                            [ "bars[i] = temp",4],
                            ["bars[i] = bars[i+1]",4],
                            ["bars[i+1] = temp",4],
                            ["swapped = true",4],
                        ["ENDIF",3],
                    ["NEXT i",2],
                ["ENDWHILE",1],
                ["return bars",1],
            ["endfunction",0],
        ],
        insertion: [
            ["function insertion_sort(bars, speed):",0],
                ["FOR i=1 to bars.length",1],
                    ["index2 = i",2],
                    ["WHILE bars[index2] < bars[index2 - 1] AND index2 > 0",2],
                        ["temp = bars[index2]",3],
                        ["bars[index2] = bars[index2 - 1]",3],
                        ["bars[index2 - 1] = temp",3],
                        ["index2 = index2 - 1",3],
                    ["ENDWHILE",2],
                ["NEXT i",1],
                ["return bars",1],
            ["endfunction",0],
        ],
        merge: [
            ["function merge_sort(bars, speed)",0],
                ["listOfBars = []",1],
                ["FOR bar in bars",1],
                    ["listOfBars.push bar.array",2],
                ["NEXT bar",1],
                ["WHILE listOfBars.length != 1",1],
                    ["index = 0",2],
                    ["WHILE index < listOfBars.length-1",2],
                        ["merged = merge(listOfBars[index], listOfBars[index+1])",3],
                        ["listOfBars[index] = merged",3],
                        ["delete listOfBars[index+1]",3],
                        ["index = index + 1",3],
                    ["ENDWHILE",2],
                ["ENDWHILE",1],
                ["return listOfBars[0]",1],
            ["endprocedure",0],
            ["​",0],  // zero width character
            ["function merge(list1, list2)",0],
                ["index1, index2 = 0",1],
                ["merged = []",1],
                ["WHILE index1 < list1.length AND index2 < list2.length",1],
                    ["IF list1[index1] > list2[index2] THEN",2],
                        ["merged.push(list2[index2])",3],
                        ["index2 = index2 + 1",3],
                    ["ELIF list1[index1] < list2[index2] THEN",2],
                        ["merged.push(list1[index1])",3],
                        ["index1 = index1 + 1",3],
                    ["ELSE",2],
                        ["merged.push(list1[index1])",3],
                        ["merged.push(list2[index2])",3],
                        ["index1 = index1 + 1",3],
                        ["index2 = index2 + 1",3],
                    ["ENDIF",2],
                ["ENDWHILE",1],
                ["IF index1 < list1.length THEN",1],
                    ["FOR i=index1 to list1.length",2],
                        ["merged.push(list1[index1])",3],
                ["ELIF index2 < list2.length THEN",1],
                    ["FOR i=index2 to list2.length",2],
                        ["merged.push(list2[index2])",3],
                ["ENDIF",1],
                ["return merged",1],
            ["endfunction",0],
        ],
        quick: [
            ["function quick_sort(bars, speed)",0],
                ["IF bars.length <= 1 THEN",1],
                    ["return bars",2],
                ["ELSE",1],
                    ["pointer = 0",2],
                    ["pivot = bars.length - 1",2],
                    ["WHILE pointer != pivot",2],
                        ["IF bars[pointer] > bars[pivot] AND pointer < pivot",3],
                        ["OR bars[pointer] < bars[pivot] AND pointer > pivot THEN",3],
                            ["temp = bars[pivot]",4],
                            ["bars[pivot] = bars[pointer]",4],
                            ["bars[pointer] = temp",4],
                            
                            ["temp = pointer",4],
                            ["pointer = pivot",4],
                            ["pivot = temp",4],
                        ["ENDIF",3],

                        ["IF pointer < pivot THEN",3],
                            ["pointer = pointer + 1",4],
                        ["ELSE",3],
                            ["pointer = pointer - 1",4],
                        ["ENDIF",3],
                    ["ENDWHILE",2],
                    
                    ["l = quick_sort(bars[0:pointer], speed)",2],
                    ["r = quick_sort(bars[pointer+1:bars.length], speed)",2],

                    ["return l + bars[pointer] + r",2],
                ["ENDIF",1],
            ["endfunction",0],
        ]
    }

    var algorithm = algorithm.split(" ")[0].toLowerCase() // converts 'X Sort' to 'x' by selecting only first word
    // get array and container
    var pseudocode = descriptions[algorithm]
    var container = document.getElementById('pseudocode-container')

    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    var i=1 // counter for line id
    pseudocode.forEach(line => {
        var element = document.createElement('p')  // creates new p tag
        element.setAttribute('id', "p"+i.toString())  // sets id

        //style element
        element.style.marginLeft = (line[1]*20).toString()+"px"  // calculates margin based on array value
        element.innerHTML = line[0]  // sets text
        container.appendChild(element)  // adds to container
        i++  
    })
}

function psuedocodeUpdate(algorithm, move) {
    var container = document.getElementById('pseudocode-container')
    var children = container.children
    for (var i=0;i<children.length;i++) { // reset color styling done to every line of pseudocode
        children[i].style.backgroundColor = "transparent"
        children[i].style.color = "grey"
    }

    highlightIndex = { // highlight index - stores index of all lines to be highlighted for each algorithm
        bubble : {
            compare: [8],
            swap: [9,10,11],
            endcheck: [7],
            lengthcheck: [4],
        },
        insertion : {
            compare: [4],
            swap: [5,6,7],
            endcheck: [2],
            indexcheck: [4],
        },
        merge : {
            selectsmallest: [22,25,28],
            movesmallest: [23,26,29,30],
            inplace: [36,37,39,40]
        },
        quick : {
            setindexes: [5,6],
            swap: [10,11,12,13,14,15],
            updatepointer: [18,20]
        }
    }
    var ids = highlightIndex[algorithm][move] // obtain list of ids
    ids.forEach(id => { // change color of p tag with that id
        // p tag id in the format p1, p2, p3...
        document.getElementById("p"+id.toString()).style.backgroundColor = '#1cb5fc5b' 
        document.getElementById("p"+id.toString()).style.color = 'whitesmoke'
    })
}