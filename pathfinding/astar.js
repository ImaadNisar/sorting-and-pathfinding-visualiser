async function astar(graph, speed, heuristic) {
    graph.vertices.filter(vertex => vertex.type != 'wall').forEach(vertex => {
        vertex.g = null // distance from start
        vertex.h = null // heuristic
        vertex.f = null // f = g + h
        vertex.previous = null
    })

    // define initial 
    var open = []  
    var closed = []
    var start = graph.vertices.filter(vertex => vertex.type == 'start')[0]
    var end = graph.vertices.filter(vertex => vertex.type == 'end')[0]

    start.g = 0  // set start distance to 0

    if (heuristic == "M") {  // call relevant heuristic
        start.h = calculateManhattan(start, end)
    } else if (heuristic == "E") {
        start.h = calculateEuclidean(start, end)
    }
    
    start.f = start.h + start.g  // f = g + h

    var current = start
    while (current != end) { // iterate until end reached
        document.getElementById(current.id).style.backgroundColor = 'green' // show cell as searched

        for (var i=0;i<current.neighbours.length;i++) {  // go to all current neightbours (not visited)
            var neighbour = graph.vertices.filter(vertex => vertex.id==current.neighbours[i])[0]  // obtain neight object
            if (closed.filter(vertex => vertex.id==current.neighbours[i]).length == 0 && open.filter(vertex => vertex.id==current.neighbours[i]).length == 0) { // check if neighbour already in close or open
                open.push(neighbour) // add neighbour to open

                // calculate new g, h, f values for neighbour
                var g = current.g + 1

                if (heuristic == "M") {
                    neighbour.h = calculateManhattan(neighbour, end)
                } else if (heuristic == "E") {
                    neighbour.h = calculateEuclidean(neighbour, end)
                }

                var f = g + neighbour.h
                
                if (neighbour.f == null) {  //replace neighbour f if optimal
                    neighbour.f = f
                    neighbour.g = g
                    neighbour.previous = current.id
                } else if (f < neighbour.f) {
                    neighbour.f = f
                    neighbour.g = g
                    neighbour.previous = current.id
                }


            }
        }

        current.visited = true
        closed.push(current)  // add current to closed

        if (open.length == 0) {  // once no more options to traverse exit (no path)
            break
        }

        // gets new current from shortest of open
        current = aStarGetCurrent(open)  
        var currentIndex = open.indexOf(current)
        open.splice(currentIndex, 1)
        

        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 50/speed)) // delay 
    
    }
    
    // set current attributes and styling
    current.visited = true
    document.getElementById(current.id).style.backgroundColor = 'green'
    await highlightPath(graph)  // highlights path
    disableOptions(false)  // enables options
    // end
}


function calculateManhattan(start, end) {
    // 1st number in id = y co-ord
    // 2nd number in id = x co-ord

    var startY = parseInt(start.id.split(" ")[0])
    var startX = parseInt(start.id.split(" ")[1])
    var endY = parseInt(end.id.split(" ")[0])
    var endX = parseInt(end.id.split(" ")[1])

    //calculates absolute x and y difference between vertices
    x = Math.abs(startX-endX)
    y = Math.abs(startY-endY)

    // returns sum of two lengths (manhatatn)
    return x+y
}


function calculateEuclidean(start, end) {
    var startY = parseInt(start.id.split(" ")[0])
    var startX = parseInt(start.id.split(" ")[1])
    var endY = parseInt(end.id.split(" ")[0])
    var endX = parseInt(end.id.split(" ")[1])

    // calculates absolute x and y difference between vertices
    x = Math.abs(startX-endX)
    y = Math.abs(startY-endY)

    // returns hypotenuse of two lengths (euclidean)
    return Math.sqrt((x*x)+(y*y))
}


function aStarGetCurrent(arr) {
    var lowestFVertex = null
    var lowestF = Infinity

    arr.forEach(vertex => {  // linear search to obtain smallest f valued object in open
        if (vertex.f < lowestF) {
            lowestFVertex = vertex
            lowestF = vertex.f
        }
    })
    
    return lowestFVertex

}
