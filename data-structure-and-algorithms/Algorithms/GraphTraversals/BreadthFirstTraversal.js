/*
How would you modify this to take a recursive approach?
How would you add in a callback to expand the utility of the function?
*/
const testGraph = require("./testGraph.js");
const Queue = require("./Queue.js");

const breadthFirstTraversal = (start) => {
  // visitedVertices array ensures that it does not get enqueued into visitQueue again.
  const visitedVertices = [start];
  //  use a queue to traverse through the graph instead of recursion
  const visitQueue = new Queue();
  visitQueue.enqueue(start);
  while (!visitQueue.isEmpty()) {
    const current = visitQueue.dequeue();
    console.log(current.data);
    current.edges.forEach((edge) => {
      // Each edge contains the neighboring vertex in its end property,
      const neighbor = edge.end;

      if (!visitedVertices.includes(neighbor)) {
        visitedVertices.push(neighbor);
        visitQueue.enqueue(neighbor);
      }
    });
  }
};

breadthFirstTraversal(testGraph.vertices[0]);
