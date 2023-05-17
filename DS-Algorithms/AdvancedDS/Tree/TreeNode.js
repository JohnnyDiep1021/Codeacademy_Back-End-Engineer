// A tree is composed of tree nodes. A tree node is a very simple data structure that contains:
// 1. Data
// 2. A list of children, where each child is itself a tree node

// We can add data to and remove data from a tree and traverse it in two different ways:
// 1.Depth-first Tree Traversal
// Depth-first traversal visits the first child in the children array and that node’s children recursively before visiting its siblings and their children recursively. The algorithm is as follows:
// For each node
//   Display its data
//   For each child in children, call itself recursively

// 2.Breadth-first Tree Traversal
// Breadth-first traversal visits each child in the children array starting from the first child before visiting their children and further layers until the bottom level is visited. The algorithm is as follows:
// Assign an array to contain the current root node
// While the array is not empty
//   Extract the first tree node from the array
//   Display tree node's data
//   Append tree node's children to the array

class TreeNode {
  constructor(data) {
    this.data = data;
    this.children = [];
  }
  addChild(child) {
    if (child instanceof TreeNode) {
      this.children.push(child);
    } else {
      this.children.push(new TreeNode(child));
    }
  }
  removeChild(childToRemove) {
    const length = this.children.length;
    this.children = this.children.filter((child) => {
      if (childToRemove instanceof TreeNode) {
        return child !== childToRemove;
      } else {
        return child.data !== childToRemove;
      }
    });
    if (length === this.children.length) {
      this.children.forEach((child) => child.removeChild(childToRemove));
    }
  }

  print(level = 0) {
    let result = "";
    for (let i = 0; i < level; i++) {
      result += "-- ";
    }
    console.log(`${result}${this.data}`);
    this.children.forEach((child) => child.print(level + 1));
  }

  depthFirstTraversal() {
    console.log(this.data);
    this.children.forEach((child) => child.depthFirstTraversal());
  }
  breadthFirstTraversal() {
    let queue = [this];
    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current.data);
      queue = queue.concat(current.children);
    }
  }
}

const tree = new TreeNode(1);
// const node = new TreeNode(30);
// tree.addChild(15);
// tree.addChild(node);
// console.log(tree);

// tree.removeChild(15);
// console.log(tree);

// tree.removeChild(node);
// console.log(tree);

const randomize = () => Math.floor(Math.random() * 20);

// add first-level children
for (let i = 0; i < 3; i++) {
  tree.addChild(randomize());
}

// add second-level children
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    tree.children[i].addChild(randomize());
  }
}

// add third-level children
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < 2; k++) {
      tree.children[i].children[j].addChild(randomize());
    }
  }
}

console.log(tree);
tree.print();
tree.depthFirstTraversal();
tree.breadthFirstTraversal();

// Review
// In this lesson, you have successfully built a tree data structure in JavaScript. You have implemented:
// a TreeNode class that contains data and maintains a collection of TreeNode classes called children.
// an .addChild() method that adds a child to the tree as either data or TreeNode
// a .removeChild() method that removes a child from the tree as either data or TreeNode
// a .depthFirstTraversal() recursive method that fully traverses the tree with a top-down approach for each child of the tree
// a .breadthFirstTraversal() iterative method that fully traverses the tree a level at a time, instead of a child at a time
