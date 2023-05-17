/*
FIFO - First In First Out
*/
const { LinkedList } = require("../linkedlist/linkedList");
const { Node } = require("../Node.js");

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // Big O(1)
  peek() {
    return this.first;
  }

  // Big O(1) - add to last
  enqueue(data) {
    const newNode = new Node(data);
    if (!this.size) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.size++;
    return this;
  }

  // Big O(1) - remove from first
  dequeue() {
    if (!this.size) {
      return null;
    }
    if (this.first === this.last) {
      this.last = null;
    }
    const removedNode = this.first;
    this.first = this.first.next;
    this.size--;
    return this;
  }
}

// const myQueue = new Queue();
// console.log(myQueue.enqueue(`Joy`));
// console.log(myQueue.enqueue(`Matt`));
// console.log(myQueue.enqueue(`Pavel`));
// console.log(myQueue.enqueue(`Samir`));
// console.log(myQueue.peek());
// console.log(myQueue.dequeue());
// console.log(myQueue.dequeue());
// console.log(myQueue.dequeue());
// console.log(myQueue.dequeue());

class QueueLinkedList {
  constructor(maxSize) {
    this.queue = new LinkedList();
    this.size = 0;
    this.maxSize = maxSize;
  }

  isEmpty() {
    return this.size === 0;
  }
  hasRoom() {
    return this.size < this.maxSize;
  }

  // Big O(1)
  peek() {
    return this.queue.head;
  }

  // Big O(1)
  enqueue(data) {
    if (!this.hasRoom()) {
      throw new Error("Exceed queue max size");
    }
    this.queue.addToTail(data);
    this.size++;
  }

  // Big O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Cannot dequeue. Queue is empty!");
    }
    const removedNode = this.queue.removeHead();
    this.size--;
    return removedNode;
  }
}
const restaurantOrder = new QueueLinkedList(3);
restaurantOrder.enqueue("apple pie");
restaurantOrder.enqueue("roast chicken");
restaurantOrder.enqueue("quinoa salad");
console.log(restaurantOrder.queue);
// restaurantOrder.enqueue("chicken salad");
console.log("\nFood preparing...\n");
restaurantOrder.dequeue();
restaurantOrder.dequeue();
restaurantOrder.dequeue();
console.log(restaurantOrder.queue);
// restaurantOrder.dequeue();

console.log("All orders ready!");
