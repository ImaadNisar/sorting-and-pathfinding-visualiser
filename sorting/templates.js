// main function from which all desc functions called
function desc(algorithm, move, vals=null, params=[,,]) { 
    text = englishDesc(algorithm, move, vals, params)
    ttsDesc(text)
}

function englishDesc(algorithm, move, vals, params) {
    if (vals != null || vals != undefined) {
        var v1 = vals[0]/20
        var v2 = vals[1]/20
    }

    
    var descriptions = {
        bubble : {
            compare: "compare the bars. is <span class='h g'>current ("+ v1 +")</span> > <span class='h y'>next ("+ v2 +")</span>",
            swap: "swap the bars",
            endcheck: "has the end of the dataset been reached. is index ("+(params[0])+") =  length ("+(params[1]) +")",
            lengthcheck: "is length ("+(params[0])+") = 0 or is swapped ("+params[1]+") = false",
        },
        insertion : {
            compare: "compare the bars. is <span class='h g'>current ("+ v1 +")</span> < <span class='h y'>previous ("+ v2 +")</span>",
            swap: "swap the bars",
            endcheck: "has the end of the dataset been reached. is index ("+(params[0])+") =  length ("+(params[1])+")",
            indexcheck: "is index2 ("+params[0]+") = 0",
        },
        merge : {
            selectsmallest: "select the <span class='h g'>smallest bar ("+params[0]+")</span> in the <span class='h b'>merged dataset</span>",
            movesmallest: "move the <span class='h g'>smallest bar ("+params[0]+")</span> to index ("+params[1]+") in the <span class='h b'>merged dataset</span>",
            inplace: "bar is in place",
        },
        quick : {
            setindexes: "set index <span class='h g'>"+params[0]+" as pointer</span> and index <span class='h y'>"+params[1]+" as pivot</span>",
            swap: "swap <span class='h g'>pointer</span> and <span class='h y'>pivot</span>",
            updatepointer: params[0]+" the <span class='h g'>pointer</span>"
        }

    }

    element = document.getElementById('english-text')
    element.innerHTML = descriptions[algorithm][move]

    return element.innerText
    
}


function ttsDesc(text) {
    ttsButton = document.getElementById('tts-button')
    if (ttsButton.getAttribute('toggle') == "unmute") {
        //tts api
        var tts = new SpeechSynthesisUtterance();

        text = text.replaceAll('>', 'greater than')
        text = text.replaceAll('<', 'less than')

        tts.text = text;
        window.speechSynthesis.speak(tts);
    }
}