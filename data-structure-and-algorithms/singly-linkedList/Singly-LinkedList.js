const { Node } = require("./Node");
class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    this.head = newHead;
    if (currentHead) {
      this.head.setNextNode(currentHead);
    }
  }

  addToTail(data) {
    let tail = this.head;
    if (!tail) {
      this.head = new Node(data);
      return;
    }
    while (tail.getNextNode()) {
      tail = tail.getNextNode();
    }
    tail = tail.setNextNode(new Node(data));
  }

  removeHead() {
    const removeHead = this.head;
    if (!removeHead) {
      return null;
    }
    this.head = removeHead.getNextNode();
    return removeHead.data;
  }

  removeByData(data) {
    let removedNode = this.head;
    let prevNode;
    if (!removedNode) {
      return null;
      // if the linked list's head's data is equal to the given data, then remove head
    } else if (removedNode.data === data) {
      return this.removeHead();
    } else {
      while (removedNode) {
        if (removedNode.data === data) {
          prevNode.setNextNode(removedNode.getNextNode());
          break;
        }
        prevNode = removedNode;
        removedNode = removedNode.getNextNode();
      }
      return removedNode;
    }
  }

  printSinglyLinkedList() {
    let currentNode = this.head;
    let output = `<head> `;
    while (currentNode) {
      output += currentNode.data + " ";
      currentNode = currentNode.getNextNode();
    }
    output += `<end>`;
    console.log(output);
  }
}

function swapNodes(list, data1, data2) {
  let node1 = list.head;
  let node2 = list.head;
  let node1Prev = null;
  let node2Prev = null;
  // edge case 1 - swapped values are equal
  if (data1 === data2) {
    console.log("Elements are the same - no swap needed.");
    return;
  }
  while (node1) {
    if (node1.data === data1) {
      break;
    }
    node1Prev = node1;
    node1 = node1.getNextNode();
  }
  while (node2) {
    if (node2.data === data2) {
      break;
    }
    node2Prev = node2;
    node2 = node2.getNextNode();
  }
  // edge case 2 - one of the swapped nodes is null
  if (!node1 || !node2) {
    console.log(`Swap not possible or more element is not in the list`);
    return;
  }
  if (!node1Prev) {
    list.head = node2;
  } else {
    node1Prev.setNextNode(node2);
  }
  if (!node2Prev) {
    list.head = node1;
  } else {
    node2Prev.setNextNode(node1);
  }
  let temp = node1.getNextNode();
  node1.setNextNode(node2.getNextNode());
  node2.setNextNode(temp);
}

const subway = new SinglyLinkedList();
subway.addToHead("Lawrence");
subway.addToHead("North-York");
subway.addToHead("Finch");
subway.addToTail("King");
subway.addToTail("Queen");
subway.printSinglyLinkedList();
subway.removeHead();
subway.addToTail("Bathurst");
subway.addToHead("York");
subway.printSinglyLinkedList();
subway.addToHead("Vaugh");
subway.removeByData("King");
subway.printSinglyLinkedList();
subway.removeByData("Vaugh");
subway.printSinglyLinkedList();
subway.removeByData("Queen");
subway.printSinglyLinkedList();
subway.removeByData("Bathurst");
subway.printSinglyLinkedList();
swapNodes(subway, "York", "Lawrence");
subway.printSinglyLinkedList();
swapNodes(subway, "North-York", "Lawrence");
subway.printSinglyLinkedList();
swapNodes(subway, "York", "Lawrence");
subway.printSinglyLinkedList();

exports.module = {
  SinglyLinkedList,
};
