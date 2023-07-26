async function dijkstras(graph, speed) {  // main disjkstras
    //obtain start and end vertices (special)
    start = graph.vertices.filter(vertex => vertex.type == 'start')[0]
    end = graph.vertices.filter(vertex => vertex.type == 'end')[0]
    // set vertices attributes unique to dijkstras
    graph.vertices.forEach((vertex) => {  
        vertex.distanceFromStart = Infinity
        vertex.previous = null
    })
    start.distanceFromStart = 0

    // iterates until no more unvisited 
    while (graph.vertices.filter(vertex => vertex.visited == false && vertex.type != 'wall').length != 0) {
        current = dijkstrasGetCurrent(graph) // gets vertex with smallest distance (initially start)
        if (current == null) break  // breaks if no more reachable unvisited
        document.getElementById(current.id).style.backgroundColor = 'green' // styles vertex

        // do not include if you want dijkstras to search all vertices 
        if (current.type == 'end') break // if end vertex reached then no longer search


        current.neighbours.forEach(id => {  // searches all current vertices neighbours
            vertex = graph.vertices.filter(vertex => vertex.id == id)[0]
            distance = current.distanceFromStart + 1 // distance of neighbour is current + 1 (all edges = 1)
            if (distance < vertex.distanceFromStart) { // updates path if optimal
                vertex.distanceFromStart = distance
                vertex.previous = current.id
            }
        })

        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 50/speed)) // delay

    }

    await highlightPath(graph) // highlights path
    disableOptions(false)  // enables options
    // end
}

function dijkstrasGetCurrent(graph) { // function to get vertex with smallest distance from start
    // sets initial variable states
    current = null 
    distance = Infinity
    unvisited = graph.vertices.filter(vertex => vertex.visited == false && vertex.type != 'wall')
    unvisited.forEach((vertex) => { // linear search to find smallest
        if (vertex.distanceFromStart <= distance) {
            distance = vertex.distanceFromStart // update smallest
            current = vertex
        }
    })

    if (distance == Infinity) { // if no more unvisited end algorithm
        return null
    }

    current.visited = true
    return current  // return next smallest
}