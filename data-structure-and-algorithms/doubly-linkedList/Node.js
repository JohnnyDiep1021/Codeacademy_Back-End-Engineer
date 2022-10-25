class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.previous = null;
  }
  setNextNode(data) {
    this.next = data;
  }
  setPreviousNode(data) {
    this.previous = data;
  }
  getNextNode() {
    return this.next;
  }
  getPreviousNode() {
    return this.previous;
  }
}

module.exports = {
  Node,
};
