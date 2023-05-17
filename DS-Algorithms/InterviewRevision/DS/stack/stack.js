const { LinkedList } = require("../linkedlist/linkedList");
const { Node } = require("../Node");

class StackLinkedList {
  constructor(maxSize) {
    this.stack = new LinkedList();
    this.size = 0;
    this.maxSize = maxSize;
  }

  hasRoom() {
    return this.size < this.maxSize;
  }

  isEmpty() {
    return this.size === 0;
  }

  // Big O(1)
  peek() {
    if (!this.isEmpty()) {
      return this.stack.head.data;
    }
    return null;
  }

  // Big O(1)
  push(data) {
    if (this.hasRoom()) {
      this.stack.addToHead(data);
      this.size++;
    } else {
      throw new Error("Exceed max size of stack");
    }
  }

  // Big O(1)
  pop() {
    if (!this.isEmpty()) {
      const value = this.stack.removeHead();
      this.size--;
      return value;
    }
    throw new Error("Cannot remove, stack is empty.");
  }
}

// const pizzaStack = new StackLinkedList(6);
// for (let i = 1; i < 7; i++) {
//   pizzaStack.push(`Pizza #${i}`);
// }

// // 4. Peek at the pizza on the top of stack and log its value
// console.log("The first pizza to deliver is ", pizzaStack.peek());

// // 5. Deliver all the pizzas from the top of the stack down
// for (let i = 0; i < 6; i++) {
//   const value = pizzaStack.pop();
//   console.log(value);
// }

// // 6. Try popping another pizza to check for empty stack
// try {
//   pizzaStack.pop();
// } catch (e) {
//   console.log(e);
// }

class Stack {
  constructor() {
    this.top = null;
    this.bottom = null;
    this.size = 0;
  }

  // Big O(1)
  peek() {
    return this.top;
  }

  // Big O(1)
  push(data) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      const currentNode = this.top;
      this.top = newNode;
      this.top.next = currentNode;
    }
    this.size++;
    return this;
  }

  // Big O(1)
  pop() {
    if (this.size === 0) {
      return null;
    }
    if (this.top === this.bottom) {
      this.bottom = null;
    }
    const removedNode = this.top;
    this.top = this.top.next;
    this.size--;
    return removedNode;
  }
}

const myStack = new Stack();
console.log(myStack.push("Google"));
console.log(myStack.push("Udemy"));
console.log(myStack.push("Discord"));
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.pop());
console.log(myStack.peek());
