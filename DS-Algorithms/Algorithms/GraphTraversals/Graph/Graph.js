class Edge {
  constructor(start, end, weight = null) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}
class Vertex {
  constructor(data) {
    this.data = data;
    this.edges = [];
  }
  addEdge(vertex, weight) {
    if (!(vertex instanceof Vertex)) {
      throw new Error(`Data must be an instance of Vertex`);
    }
    this.edges.push(new Edge(this, vertex, weight));
  }
  removeEdge(vertex) {
    this.edges = this.edges.filter((edge) => edge.end !== vertex);
  }
  print() {
    const edgeList = this.edges.map((edge) =>
      edge.weight !== null ? `${edge.end.data} (${edge.weight})` : edge.end.data
    );

    const output = `${this.data} --> ${edgeList.join(", ")}`;
    console.log(output);
  }
}

class Graph {
  constructor(isWeighted = false, isDirected = false) {
    this.vertices = [];
    this.isWeighted = isWeighted;
    this.isDirected = isDirected;
  }
  addVertex(data) {
    const vertex = new Vertex(data);
    this.vertices.push(vertex);
    return vertex;
  }
  removeVertex(vertex) {
    this.vertices = this.vertices.filter((vertices) => vertices !== vertex);
  }
  addEdge(vertexOne, vertexTwo, weight) {
    if (!(vertexOne instanceof Vertex) && !(vertexTwo instanceof Vertex)) {
      throw new Error(`Input must be instance of vertex`);
    }
    const edgeWeight = this.isWeighted ? weight : null;
    vertexOne.addEdge(vertexTwo, edgeWeight);
    !this.isDirected && vertexTwo.addEdge(vertexOne, edgeWeight);
  }
  removeEdge(vertexOne, vertexTwo) {
    if (!(vertexOne instanceof Vertex) && !(vertexTwo instanceof Vertex)) {
      throw new Error(`Input must be instance of vertex`);
    }
    vertexOne.removeEdge(vertexTwo);
    !this.isDirected && vertexTwo.removeEdge(vertexOne);
  }
  print() {
    this.vertices.forEach((vertex) => vertex.print());
  }
}

const trainNetwork = new Graph(true, true);
const losAngeles = trainNetwork.addVertex("Los Angeles");
const sanFrancisco = trainNetwork.addVertex("San Francisco");
const newYork = trainNetwork.addVertex("New York");
const atlanta = trainNetwork.addVertex("Atlanta");
const denver = trainNetwork.addVertex("Denver");
const calgary = trainNetwork.addVertex("Calgary");
trainNetwork.addEdge(sanFrancisco, losAngeles, 400);
trainNetwork.addEdge(losAngeles, sanFrancisco, 400);
trainNetwork.addEdge(newYork, denver, 1800);
trainNetwork.addEdge(denver, newYork, 1800);
trainNetwork.addEdge(calgary, denver, 1000);
trainNetwork.addEdge(denver, calgary, 1000);
trainNetwork.addEdge(losAngeles, atlanta, 2100);
trainNetwork.addEdge(atlanta, losAngeles, 2100);
// trainNetwork.print();
// console.log(`----------------------`);
trainNetwork.removeEdge(newYork, denver);
trainNetwork.removeEdge(calgary, denver);
trainNetwork.removeEdge(denver, calgary);
trainNetwork.removeVertex(calgary);
// trainNetwork.print();

module.exports = { Graph, Vertex, Edge };
