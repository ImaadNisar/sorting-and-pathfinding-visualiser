// clicking toggles
clicking = false

document.getElementById('load').style.pointerEvents = 'auto' //prevents mouse event before element load

function startClicking() {
    clicking = true
}


function stopClicking() {
    clicking = false
}


function changeWall(id, clicked=false) {
    if (clicking || clicked) {

        element = document.getElementById(id)

        if (element.getAttribute('type') == 'normal') {
            element.className = "vertex unvisited wall"
            element.setAttribute('type', 'wall')
        } 
        else if (element.getAttribute('type') == 'wall') {
            element.className = "vertex unvisited normal"
            element.setAttribute('type', 'normal')
        }

    }
}




function infoOpen() {
    element = document.getElementById('wrapper')
    element.style.display = "block"
    element = document.getElementById('info-container')
    element.style.display = "inline-block"
}


function infoClose() {
    element = document.getElementById('wrapper')
    element.style.display = "none"
    element = document.getElementById('info-container')
    element.style.display = "none"
}


function startGrid() {
    algorithmElement = document.getElementById('algorithm')
    speedElement = document.getElementById('speed')
    startBtn = document.getElementById('start')

    algorithm = algorithmElement.value
    speed = speedElement.value

    algorithmElement.disabled = true
    speedElement.disabled = true
    startBtn.disabled = true

    vertices = document.querySelectorAll('.vertex')
    
    graphArray = getGraph(vertices)

    const graph = new Graph()
    graph.addVertices(graphArray)

    if (algorithm == 'dijkstras') {
        dijkstras(graph, speed)
    }else {
        astar(graph, speed)
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


function Vertex(id, type, neighbours) {
    this.id = id
    this.type = type
    this.visited = false
    this.neighbours = neighbours
}


function Graph() {
    this.vertices = []

    this.addVertices = function(graph) {
        for (rowIndex=0; rowIndex<graph.length; rowIndex++) {
            for (vertexIndex=0; vertexIndex<graph[rowIndex].length; vertexIndex++) {
                let neighbours = []

                if (graph[rowIndex][vertexIndex].getAttribute('type') != 'wall'){

                    if (0<vertexIndex) { //after 1st column
                        if (graph[rowIndex][vertexIndex-1].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex][vertexIndex-1].id)
                        }
                    }
                    if (vertexIndex<graph[rowIndex].length-1) { // before last column
                        if (graph[rowIndex][vertexIndex+1].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex][vertexIndex+1].id)
                        }
                    }
                    if (0<rowIndex) { // after 1st row
                        if (graph[rowIndex-1][vertexIndex].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex-1][vertexIndex].id)
                        }
                    }
                    if (rowIndex<graph.length-1) { // before last row
                        if (graph[rowIndex+1][vertexIndex].getAttribute('type') != 'wall'){
                            neighbours.push(graph[rowIndex+1][vertexIndex].id)
                        }
                    }

                }

                let id = graph[rowIndex][vertexIndex].id
                let type = graph[rowIndex][vertexIndex].getAttribute('type')
                this.vertices.push(new Vertex(id, type, neighbours))
            }
        }
    }

}

