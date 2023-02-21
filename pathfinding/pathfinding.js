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

        var element = document.getElementById(id)

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
    document.getElementById('wrapper').style.display = "block"
    document.getElementById('info-container').style.display = "inline-block"
}


function infoClose() {
    document.getElementById('wrapper').style.display = "none"
    document.getElementById('info-container').style.display = "none"
}


function startGrid() {
    disableOptions(true)

    var algorithmElement = document.getElementById('algorithm')
    var speedElement = document.getElementById('speed')

    var algorithm = algorithmElement.value
    var speed = speedElement.value

    var vertices = document.querySelectorAll('.vertex')
    
    var graphArray = getGraph(vertices)

    const graph = new Graph()
    graph.addVertices(graphArray)

    resetColor(graph)

    if (algorithm == 'dijkstras') {
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

                let id = graph[rowIndex][vertexIndex].id
                let type = graph[rowIndex][vertexIndex].getAttribute('type')
                this.vertices.push(new Vertex(id, type, neighbours))
            }
        }
    }

}

async function highlightPath(graph) {
    end = graph.vertices.filter(vertex => vertex.type == 'end')[0]

    if (end.previous == null) {
        graph.vertices.filter(vertex => vertex.type != 'wall' && vertex.visited != true).forEach(vertex => {
            document.getElementById(vertex.id).style.transition = 'background-color ease 2s'
            document.getElementById(vertex.id).style.backgroundColor = 'red'
        })
        setTimeout(()=>{
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
    algorithmElement = document.getElementById('algorithm')
    speedElement = document.getElementById('speed')
    startBtn = document.getElementById('start')
    algorithmElement.disabled = disable
    speedElement.disabled = disable
    startBtn.disabled = disable
}

function resetColor(graph) {
    graph.vertices.filter(vertex => vertex.type != 'wall').forEach(vertex => {
        document.getElementById(vertex.id).style.backgroundColor = '#131424'
    })
}