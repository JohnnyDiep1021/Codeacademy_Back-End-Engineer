class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }

  setNextNode(node) {
    if (node instanceof Node || node === null) {
      this.next = node;
    } else {
      throw new Error(`Data must be an instance of Node class`);
    }
  }
  getNextNode() {
    return this.next;
  }
}

const vanillaNode = new Node("Vanilla");
const strawberryNode = new Node("Berry Tasty");
const coconutNode = new Node("Coconuts for Coconut");
vanillaNode.setNextNode(strawberryNode);
strawberryNode.setNextNode(coconutNode);

let currentNode = vanillaNode;
while (currentNode) {
  console.log(currentNode.data);
  currentNode = currentNode.getNextNode();
}

module.exports = Node;
