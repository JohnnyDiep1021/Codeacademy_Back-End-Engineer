class Node {
  constructor(data) {
    this.data = data;
    this._left = null;
    this._right = null;
  }

  get left() {
    return this._left;
  }
  get right() {
    return this._right;
  }
  set left(node) {
    if (node instanceof Node || node === null) {
      this._left = node;
    } else {
      throw new Error(`Data must be an instance of Node`);
    }
  }
  set right(node) {
    if (node instanceof Node || node === null) {
      this._right = node;
    } else {
      throw new Error(`Data must be an instance of Node`);
    }
  }
}

// Left Node < right node
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Big O(log N)
  insert(data) {
    const newNode = new Node(data);
    let currentNode = this.root;
    if (!currentNode) {
      this.root = newNode;
    }
    while (currentNode) {
      if (currentNode.data > data) {
        // left child
        if (!currentNode.left) {
          currentNode.left = newNode;
          return this;
        }
        currentNode = currentNode.left;
      } else if (currentNode.data < data) {
        // right child
        if (!currentNode.right) {
          currentNode.right = newNode;
          return this;
        }
        currentNode = currentNode.right;
      } else {
        return this;
      }
    }
  }

  // Big O(log N)
  lookup(data) {
    let currentNode = this.root;
    if (!currentNode) {
      return null;
    }
    while (currentNode) {
      if (currentNode.data > data) {
        // left child
        currentNode = currentNode.left;
      } else if (currentNode.data < data) {
        // right child
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  // Big O(log N)
  remove() {}

  // Big O(N)
  breadFirstSearch() {
    let currentNode = this.root;
    let list = [];
    let queue = [currentNode];
    while (queue.length > 0) {
      currentNode = queue.shift();
      list.push(currentNode.data);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    return list;
  }
  breadFirstSearchRecurisve(queue, list) {
    // base length
    if (!queue.length) return list;
    let currentNode = queue.shift();
    list.push(currentNode.data);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
    return this.breadFirstSearchRecurisve(queue, list);
  }

  // Big O(N)
  DFSInorder() {
    return traverseInOrder(this.root, []);
  }

  // Big O(N)
  DFSPreorder() {
    return traversePreOrder(this.root, []);
  }
  // Big O(N)
  DFSPostorder() {
    return traversePostOrder(this.root, []);
  }
}

function traverseInOrder(node, list) {
  if (node.left) {
    traverseInOrder(node.left, list);
  }
  console.log(node.data);
  list.push(node.data);
  if (node.right) {
    traverseInOrder(node.right, list);
  }
  return list;
}

// re-generate the tree again
function traversePreOrder(node, list) {
  list.push(node.data);
  if (node.left) {
    traversePreOrder(node.left, list);
  }
  if (node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

// from the leftmost node to the rightmost node, then to its parent node
function traversePostOrder(node, list) {
  if (node.left) {
    traversePostOrder(node.left, list);
  }
  if (node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.data);
  return list;
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);

console.log(tree.lookup(20));
console.log(tree.breadFirstSearch());
console.log(tree.DFSInorder());
console.log(tree.DFSPreorder());
console.log(tree.DFSPostorder());
console.log(tree.breadFirstSearchRecurisve([tree.root], []));
