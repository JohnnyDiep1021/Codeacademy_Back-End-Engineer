const { Node } = require("../Node");

class LinkedList {
  constructor() {
    this.head = null;
  }

  addToHead(data) {
    const newNode = new Node(data);
    const currentNode = this.head;
    this.head = newNode;
    if (currentNode) {
      this.head.next = currentNode;
    }
  }

  addToTail(data) {
    const newNode = new Node(data);
    let currentNode = this.head;
    if (!currentNode) {
      this.head = newNode;
    } else {
      // traverse down the linkedList to look for the final node.
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  insert(position, data) {
    const newNode = new Node(data);
    let currentNode = this.head;
    if (!currentNode) {
      currentNode = newNode;
    } else if (position <= 0) {
      // edge case 1: position <= 0
      newNode.next = currentNode;
      this.head = newNode;
    } else {
      let counter = 1;
      while (counter < position) {
        if (!currentNode.next) {
          // edge case: position > linkedList.length
          currentNode.next = newNode;
          return;
        }
        currentNode = currentNode.next;
        counter++;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
  }

  removeHead() {
    const removedNode = this.head;
    if (!removedNode) return removedNode;
    this.head = removedNode.next;
    return removedNode;
  }

  printList() {
    let currentNode = this.head;
    let output = "";
    while (currentNode) {
      output += currentNode.data;
      if (currentNode.next) {
        output += "->";
      }
      currentNode = currentNode.next;
    }
    console.log(output);
  }
}

const reverse = (llist) => {
  // base case
  if (!llist || !llist.next) {
    return llist;
  }
  const reversedLlist = reverse(llist.next);
  llist.next.next = llist;
  llist.next = null;
  return reversedLlist;
};

const printReverse = () => {
  // base case
  let output = "";
  return function print(llist) {
    if (llist.next) {
      print(llist.next);
    }
    output += llist.data;
    return output;
  };
};

const llist = new LinkedList();

llist.addToHead(4);
llist.addToHead(5);
llist.addToHead(6);
// llist.addToTail(1);
// llist.addToTail(12);
// llist.addToTail(11);
// llist.addToTail(31);
// llist.printList();
// llist.insert(224, 21);
// llist.printList();
// llist.insert(5, 21221);
// llist.printList();
// llist.insert(0, 224);
// llist.removeHead();
// llist.printList();
// const printRevLlist = printReverse();
// console.log(printRevLlist(llist.head));
// const reversedlList = reverse(llist.head);
// console.log(reversedlList);
// console.log(llist);

module.exports = { LinkedList };
