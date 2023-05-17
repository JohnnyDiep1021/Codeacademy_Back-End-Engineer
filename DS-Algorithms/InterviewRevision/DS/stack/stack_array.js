/*
  LIFO - Last In First Out
*/

class Stack {
  constructor() {
    this.array = [];
  }

  // O(1)
  peek() {
    return this.array[this.array.length - 1];
  }

  // O(1)
  push(data) {
    this.array.push(data);
    return this;
  }

  // O(1)
  pop() {
    this.array.pop();
    return this;
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
