async function dijkstras(graph, speed) {
    start = graph.vertices.filter(vertex => vertex.type == 'start')[0]
    end = graph.vertices.filter(vertex => vertex.type == 'end')[0]
    graph.vertices.forEach((vertex) => {
        vertex.distanceFromStart = Infinity
        vertex.previous = null
    })
    start.distanceFromStart = 0

    while (graph.vertices.filter(vertex => vertex.visited == false && vertex.type != 'wall').length != 0) {
        current = dijkstrasGetCurrent(graph)
        if (current == null) break
        document.getElementById(current.id).style.backgroundColor = 'green'
        if (current.type == 'end') break

        current.neighbours.forEach(id => {
            vertex = graph.vertices.filter(vertex => vertex.id == id)[0]
            distance = current.distanceFromStart + 1
            if (distance < vertex.distanceFromStart) {
                vertex.distanceFromStart = distance
                vertex.previous = current.id
            }
        })

        await new Promise(resolve => setTimeout(() => {
            resolve()
        }, 50/speed)) 

    }

    await highlightPath(graph)
    disableOptions(false)
}

function dijkstrasGetCurrent(graph) {
    current = null
    unvisited = graph.vertices.filter(vertex => vertex.visited == false && vertex.type != 'wall')
    distance = Infinity
    unvisited.forEach((vertex) => {
        if (vertex.distanceFromStart <= distance) {
            distance = vertex.distanceFromStart
            current = vertex
        }
    })

    if (distance == Infinity) {
        return null
    }

    current.visited = true
    return current
}