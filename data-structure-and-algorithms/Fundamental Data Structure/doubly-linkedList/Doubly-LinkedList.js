const { Node } = require("./Node");

// class DoublyLinkedList {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }
//   addToHead(data) {
//     const newHead = new Node(data);
//     const currentHead = this.head;
//     if (currentHead) {
//       currentHead.setPreviousNode(newHead);
//       newHead.setNextNode(currentHead);
//     }
//     this.head = newHead;
//     if (!this.tail) {
//       this.tail = newHead;
//     }
//   }
//   addToTail(data) {
//     const newTail = new Node(data);
//     const currentTail = this.tail;
//     if (currentTail) {
//       currentTail.setNextNode(newTail);
//       newTail.setPreviousNode(currentTail);
//     }
//     this.tail = newTail;
//     if (!this.head) {
//       this.head = newTail;
//     }
//   }

//   removeHead() {
//     const removedNode = this.head;
//     if (!removedNode) {
//       return;
//     }
//     this.head = removedNode.getNextNode();
//     if (this.head) {
//       this.head.setPreviousNode(null);
//     }
//     if (removedNode === this.tail) {
//       this.removeTail();
//     }
//     return removedNode.data;
//   }

//   removeTail() {
//     const removedNode = this.tail;
//     if (!removedNode) {
//       return;
//     }
//     this.tail = removedNode.getPreviousNode();
//     if (this.tail) {
//       this.tail.setNextNode(null);
//     }
//     if (removedNode === this.head) {
//       this.removeHead();
//     }
//     return removedNode.data;
//   }

//   removeByData(data) {
//     let nodeToRemove;
//     let currentNode = this.head;
//     while (currentNode) {
//       if (currentNode.data === data) {
//         nodeToRemove = currentNode;
//         break;
//       }
//       currentNode = currentNode.getNextNode();
//     }
//     if (!nodeToRemove) {
//       return null;
//     }
//     if (nodeToRemove === this.head) {
//       this.removeHead();
//     } else if (nodeToRemove === this.tail) {
//       this.removeTail();
//     } else {
//       let nextNode = nodeToRemove.getNextNode();
//       let previousNode = nodeToRemove.getPreviousNode();
//       nextNode.setPreviousNode(previousNode);
//       previousNode.setNextNode(nextNode);
//     }
//     return nodeToRemove.data;
//   }

//   printLinkedList() {
//     let currentNode = this.head;
//     let output = `<head> `;
//     while (currentNode) {
//       output += currentNode.data + " ";
//       currentNode = currentNode.getNextNode();
//     }
//     output += "<tail>";
//     console.log(output);
//   }
// }

// const subway = new DoublyLinkedList();
// subway.addToHead("Lawrence");
// subway.addToHead("Sheppard Yonge");
// subway.addToHead("North York");
// subway.addToHead("Finch");
// subway.removeHead();
// subway.printLinkedList();
// subway.addToTail("King");
// subway.addToTail("Queen");
// subway.addToTail("Union");
// subway.removeByData("Sheppard Yonge");
// subway.removeTail();
// subway.printLinkedList();

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    if (currentHead) {
      currentHead.setPreviousNode(newHead);
      newHead.setNextNode(currentHead);
    }
    this.head = newHead;
    if (!this.tail) {
      this.tail = newHead;
    }
  }
  addToTail(data) {
    const newTail = new Node(data);
    const currentTail = this.tail;
    if (currentTail) {
      currentTail.setNextNode(newTail);
      newTail.setPreviousNode(currentTail);
    }
    this.tail = newTail;
    if (!this.head) {
      this.head = newTail;
    }
  }
  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {
      return;
    }
    this.head = removedHead.getNextNode();
    if (this.head) {
      this.head.setPreviousNode(null);
    }
    if (removedHead === this.tail) {
      this.removeTail();
    }
    return removedHead.data;
  }
  removeTail() {
    const removedTail = this.tail;
    if (!removedTail) {
      return;
    }
    this.tail = removedTail.getPreviousNode();
    if (this.tail) {
      this.tail.setNextNode(null);
    }
    if (removedTail === this.head) {
      this.removeHead();
    }
    return removedTail.data;
  }
  removeByData(data) {
    let nodeToRemove;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.data === data) {
        nodeToRemove = currentNode;
        break;
      }
      currentNode = currentNode.getNextNode();
    }
    if (!nodeToRemove) {
      return null;
    }
    if (nodeToRemove === this.head) {
      this.removeHead();
    } else if (nodeToRemove === this.tail) {
      this.removeTail();
    } else {
      const previousNode = nodeToRemove.getPreviousNode();
      const nextNode = nodeToRemove.getNextNode();
      previousNode.setNextNode(nextNode);
      nextNode.setPreviousNode(previousNode);
    }
    return nodeToRemove;
  }
  printList() {
    let currentNode = this.head;
    let output = "<head> ";
    while (currentNode !== null) {
      output += currentNode.data + " ";
      currentNode = currentNode.getNextNode();
    }
    output += "<tail>";
    console.log(output);
  }
}

const subway = new DoublyLinkedList();
subway.addToHead("Lawrence");
subway.addToHead("Sheppard Yonge");
subway.addToHead("North York");
subway.addToHead("Finch");
subway.removeHead();
subway.printList();
subway.addToTail("King");
subway.addToTail("Queen");
subway.addToTail("Union");
subway.printList();
subway.removeByData("Sheppard Yonge");
subway.removeTail();
subway.printList();
exports = DoublyLinkedList;
