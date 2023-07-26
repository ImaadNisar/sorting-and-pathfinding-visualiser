// clicking toggles
clicking = false

document.getElementById('load').style.pointerEvents = 'auto' //prevents mouse event before element load

function startClicking() {  // keeps track of mouse btn held down
    clicking = true
}


function stopClicking() {  // updates when mouse btn released
    clicking = false
}


function changeWall(id, clicked=false) {
    if (clicking || clicked) {  // changes wall if being clicked over or held over

        var element = document.getElementById(id)

        if (element.getAttribute('type') == 'normal') {  // normal -> wall
            element.className = "vertex unvisited wall"
            element.setAttribute('type', 'wall')
        } 
        else if (element.getAttribute('type') == 'wall') { // wall -> normal
            element.className = "vertex unvisited normal"
            element.setAttribute('type', 'normal')
        }

    }
}




function infoOpen() {  // displays the info element
    document.getElementById('wrapper').style.display = "block"
    document.getElementById('info-container').style.display = "inline-block"
}


function infoClose() {  // hides the info element
    document.getElementById('wrapper').style.display = "none"
    document.getElementById('info-container').style.display = "none"
}


function startGrid() {  // starts chosen
    disableOptions(true) // disables all options

    // obtain all relevant options
    var algorithmElement = document.getElementById('algorithm')
    var speedElement = document.getElementById('speed')

    var algorithm = algorithmElement.value
    var speed = speedElement.value

    var vertices = document.querySelectorAll('.vertex') // obtain array of all elements onscreen
    
    var graphArray = getGraph(vertices) // create graph array from html objects array

    const graph = new Graph() // create new graph object
    graph.addVertices(graphArray) // add vertices to graph using graph array

    resetColor(graph)  // clears board color

    if (algorithm == 'dijkstras') { // call correct algorithm using form value
        dijkstras(graph, speed)
    }else if (algorithm == 'astarE') {
        astar(graph, speed, 'E')
    } else if (algorithm == 'astarM') {
        astar(graph, speed, 'M')
    }
}

function getGraph(vertices) {
    graph = []  // creates empty 2d array called graph
    for (i=0; i<19; i++) {
        graph[i] = []
    }

    vertices.forEach((vertex) => {  // populates graph with vertices
        vertex.removeAttribute('onmouseover')
        vertex.removeAttribute('onmousedown')
        row = parseInt(vertex.id.split(" ")[0])
        column = parseInt(vertex.id.split(" ")[1])
        graph[row][column] = vertex //could replace with just type in future
    })
    return graph
}


function Vertex(id, type, neighbours) { // vertex class
    this.id = id
    this.type = type
    this.visited = false
    this.neighbours = neighbours
}


function Graph() {
    // defines graph atributes
    this.vertices = []

    this.addVertices = function(graph) {
        for (rowIndex=0; rowIndex<graph.length; rowIndex++) { // iterate each row
            for (vertexIndex=0; vertexIndex<graph[rowIndex].length; vertexIndex++) { // iterate each column
                let neighbours = []  // neighbours array defined

                if (graph[rowIndex][vertexIndex].getAttribute('type') != 'wall'){  // add neighbours for non-wall cells 
                    
                    // add vertices directly left, right, up, down as neighbours
                    if (0<rowIndex) { // after 1st row
                        if (graph[rowIndex-1][vertexIndex].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex-1][vertexIndex].id)
                        }
                    }
                    if (vertexIndex<graph[rowIndex].length-1) { // before last column
                        if (graph[rowIndex][vertexIndex+1].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex][vertexIndex+1].id)
                        }
                    }
                    if (rowIndex<graph.length-1) { // before last row
                        if (graph[rowIndex+1][vertexIndex].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex+1][vertexIndex].id)
                        }
                    }
                    if (0<vertexIndex) { //after 1st column
                        if (graph[rowIndex][vertexIndex-1].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex][vertexIndex-1].id)
                        }
                    }
                    
                }

                // obtain attribute values
                let id = graph[rowIndex][vertexIndex].id
                let type = graph[rowIndex][vertexIndex].getAttribute('type')
                this.vertices.push(new Vertex(id, type, neighbours))  // create new object and add to graph attribute
            }
        }
    }

}

async function highlightPath(graph) {
    end = graph.vertices.filter(vertex => vertex.type == 'end')[0] // obtain end vertex (special)

    if (end.previous == null) {  // if end not linked to path then no path therefore impossible
        graph.vertices.filter(vertex => vertex.type != 'wall' && vertex.visited != true).forEach(vertex => {  // highlight all vertices red
            document.getElementById(vertex.id).style.transition = 'background-color ease 2s'
            document.getElementById(vertex.id).style.backgroundColor = 'red'
        })
        setTimeout(()=>{  // reset color transition delay
            graph.vertices.filter(vertex => vertex.type != 'wall' && vertex.visited != true).forEach(vertex => {
                document.getElementById(vertex.id).style.transition = 'background-color ease 0.1s'
            })
        },1000)

    } else {

        //declare variables
        var vertex = end
        path = []

        // create list of vertices in path
        path.push(vertex.id)
        while (vertex.previous != null) {
            vertex = graph.vertices.filter(v => v.id == vertex.previous)[0]
            path.push(vertex.id)
        }
        path.reverse()

        // color each vertex and add delay
        for (i=0; i<path.length; i++) {
            document.getElementById(path[i]).style.backgroundColor = 'darkBlue'
            await new Promise(resolve => setTimeout(() => {
                resolve()
            }, 50)) 
        }

    }
}

function disableOptions(disable) {
    // obtain all form elements
    algorithmElement = document.getElementById('algorithm')
    speedElement = document.getElementById('speed')
    startBtn = document.getElementById('pathfinding-start')
    clearBtn = document.getElementById('pathfinding-clear')
    // disable using parameter (bool values)
    algorithmElement.disabled = disable
    speedElement.disabled = disable
    if (disable) { // set non-boolean disable values
        startBtn.removeAttribute('onclick')
        clearBtn.removeAttribute('onclick')
        algorithmElement.style.cursor = 'not-allowed'
        speedElement.style.cursor = 'not-allowed'
        startBtn.style.cursor = 'not-allowed'
        clearBtn.style.cursor = 'not-allowed'

    }else {  // set non-boolean enable values
        startBtn.setAttribute('onclick', 'startGrid()')
        clearBtn.setAttribute('onclick', 'clearGrid()')
        algorithmElement.style.cursor = 'pointer'
        speedElement.style.cursor = 'default'
        startBtn.style.cursor = 'pointer'
        clearBtn.style.cursor = 'pointer'
    }
}

function resetColor(graph) { // force each vertex color reset by overriding using inline styling
    graph.vertices.filter(vertex => vertex.type != 'wall').forEach(vertex => {
        document.getElementById(vertex.id).style.backgroundColor = '#131424'
    })
}

function clearGrid() {
    var vertices = document.querySelectorAll('.vertex')  //obtains the vertices as an array
    vertices.forEach(vertex => {  // iterate over each vertex
        var type = vertex.getAttribute('type')  // obtain vertex type
        if (type != 'start' && type != 'end'){  // change its attributes if not start or end vertex
            vertex.className = "vertex unvisited normal"
            vertex.setAttribute('type', 'normal')
            var id = vertex.getAttribute('id')
            // add mouse events back
            vertex.setAttribute('onmouseover', "changeWall('"+id+"')") 
            vertex.setAttribute('onmousedown', "changeWall('"+id+"', true)")
        }
        vertex.removeAttribute('style')  // removes inline css
    })
}