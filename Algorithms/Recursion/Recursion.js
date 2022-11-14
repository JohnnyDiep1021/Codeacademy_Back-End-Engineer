// Factorial - iterative approach
const iterativeFactorial = (n) => {
  let result = 1;
  while (n > 0) {
    result *= n;
    n -= 1;
  }
  return result;
};

// Set fourFactorial
const fourFactorial = iterativeFactorial(4);
console.log(fourFactorial);

module.exports = {
  iterativeFactorial,
};

// Factorial - recursive approach
const recursiveFactorial = (n) => {
  if (n === 0) {
    return 1;
  } else if (n > 0) {
    return n * recursiveFactorial(n - 1);
  }
};

const fiveFactorial = recursiveFactorial(4);
console.log(fiveFactorial);

// implement a recursive solution to a linked list search
// Method 1: iterative approach.
const findNodeIteratively = (data) => {
  let currentNode = this.head;
  while (currentNode !== null) {
    if (currentNode.data === data) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  return null;
};

// Method 2: recursive approach
const findNodeRecursively = (data, currentNode = this.head) => {
  if (currentNode === null) {
    // Base case 1 – return null if the end of the linked list is reached.
    return null;
  } else if (currentNode.data === data) {
    // Base case 2 – return the current node if it matches the data argument.
    return currentNode;
  } else {
    // Recursive Case – return a call to .findNodeRecursively() with the next node as an argument.
    return this.findNodeRecursively(data, currentNode.getNextNode());
  }
};

// The recursive approach laid out in this lesson is similar to implementations for traversing other data structures, like trees and directories.

// Code Challenges:
// Beginner - Fibonacci Number
// https://leetcode.com/problems/fibonacci-number/

// Beginner - Power of Three
// https://leetcode.com/problems/power-of-three/

// Advanced - Egg Dropper
// https://www.codecademy.com/code-challenges/code-challenge-egg-dropper-javascript
