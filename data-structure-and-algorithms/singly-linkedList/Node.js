class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  setNextNode(data) {
    this.next = data;
  }
  getNextNode() {
    return this.next;
  }
}

module.exports = {
  Node,
};
