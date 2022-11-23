/*
To recap, Depth-first traversals iterate down each vertex, one neighbor at a time, before going back up and looking at the neighbor’s connected vertices. In this exercise, we will focus on traversing down the full length of one path and logging each vertex’s data value.

Depth-First Traversal (Callbacks)
Our current implementation of the depth-first traversal simply prints out the vertices of the graph as they are traversed. This would be useful in scenarios where we want to see the order that the traversal occurs in. For example, if the graph was an instruction list, we need the exact order that the steps will occur to determine which dependencies need to be resolved first.

However, there may be other instances where we want to do something other than printing out the traversal order. For example, if we just need to determine if a path exists, like seeing if a maze is solvable, we just need a true or false value. We can do this by opening up a callback parameter for the user.

This wraps up our implementation of depth-first traversal! If you’re feeling up for it, here are some challenge tasks to tackle:

This is currently a pre-order traversal. How would you modify the implementation to be a post-order traversal?
How would you modify the implementation to use a queue instead of recursion?
*/
const testGraph = require("./testGraph.js");

const depthFirstTraversal = (start, callback, visitedVertices = [start]) => {
  // optional callback func customized by user's needs.
  callback(start);
  // traverse down each neighbor's existed paths
  start.edges.forEach((edge) => {
    const neighbor = edge.end;
    if (!visitedVertices.includes(neighbor)) {
      // re-assign a visited neighbor
      visitedVertices.push(neighbor);
      depthFirstTraversal(neighbor, callback, visitedVertices);
    }
  });
};

depthFirstTraversal(testGraph.vertices[0], (vertex) => {
  console.log(vertex.data);
});
