/*
REVIEW
The function returns the index of the target value from a sorted list. If the target value is not found, the function returns null. You used the following steps to create this function:

Initialize the left and right indices as 0 and the length of the array.
Create a while loop that continues to execute until the left index equals the right index.
Get the value at the index that falls in the middle of left and right.
Return the index if the value is equal to target.
Set left equal to the current index plus one if the target is greater than the value.
Set right equal to the current index if the target is less than the value.
While the benefits of binary search are significant compared to linear search, it’s important to remember that the function will only work on sorted lists.
*/

const binarySearch = function (arr, target) {
  let left = 0;
  let right = arr.length;
  while (right > left) {
    const indexToCheck = Math.floor((left + right) / 2);
    const checking = arr[indexToCheck];
    console.log(indexToCheck);
    if (target === checking) {
      return indexToCheck;
    } else if (target > checking) {
      left = indexToCheck + 1;
    } else {
      right = indexToCheck;
    }
  }
  return null;
};

const searchable = [1, 2, 7, 8, 22, 28, 41, 58, 67, 71, 94];
const target = 71;

targetIndex = binarySearch(searchable, target);

console.log(`The target index is ${targetIndex}.`);

class BinaryTree {
  constructor(value, depth = 1) {
    this.value = value;
    this.depth = depth;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (!this.left) {
        this.left = new BinaryTree(value, this.depth + 1);
      } else {
        this.left.insert(value);
      }
    } else {
      if (!this.right) {
        this.right = new BinaryTree(value, this.depth + 1);
      } else {
        this.right.insert(value);
      }
    }
  }

  getNodeByValue(value) {
    if (this.value === value) {
      return this;
    } else if (this.left && value < this.value) {
      return this.left.getNodeByValue(value);
    } else if (this.right) {
      return this.right.getNodeByValue(value);
    } else {
      return null;
    }
  }

  depthFirstTraversal() {
    if (this.left) {
      this.left.depthFirstTraversal();
    }
    console.log(`Depth=${this.depth}, Value=${this.value}`);
    if (this.right) {
      this.right.depthFirstTraversal();
    }
  }
}

const randomize = () => Math.floor(Math.random() * 40);
const bt = new BinaryTree(15);
let numbers = [];

for (let i = 0; i < 10; i++) {
  numbers.push(randomize());
  bt.insert(numbers[i]);
}

console.log(`Inserted [ ${numbers} ] to binary tree`);

console.log("Depth First Traversal");
bt.depthFirstTraversal();
