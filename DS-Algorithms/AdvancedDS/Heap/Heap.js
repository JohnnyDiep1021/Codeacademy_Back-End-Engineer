// In a max-heap, for any given element, its parent’s value is greater than or equal to its value.
// In a min-heap, for any given element, its parent’s value is less than or equal to its value.
// Heaps enable solutions for complex problems such as finding the shortest path (Dijkstra’s Algorithm) or efficiently sorting a dataset (heapsort).

class MinHeap {
  /* 
  // min heap needs to satisfy two conditions:
  // The element at index 1 is the minimum value in the entire list.
  // Every child element in the list must be larger than its parent.

  // The indices for parent and child elements (if they exist):
  // Parent: (index / 2), rounded down
  // Left Child: index * 2
  // Right Child: (index * 2) + 1
  */
  constructor() {
    this.heap = [null];
    this.size = 0;
  }
  popMin() {
    if (!this.size) {
      return null;
    }
    console.log(
      `\n.. Swap ${this.heap[1]} with last element ${this.heap[this.size]}`
    );
    this.swap(1, this.size);
    const min = this.heap.pop();
    this.size--;
    console.log(`.. Removed ${min} from heap`);
    console.log("..", this.heap);
    this.heapify();
    return min;
  }
  add(value) {
    this.heap.push(value);
    console.log(`.. adding ${value}`);
    this.size++;
    this.bubbleUp();
    console.log(`added ${value} to heap`, this.heap);
  }
  bubbleUp() {
    /*
    //       Set the current element index to be the last index of heap
    // While current element is valid and its value is less than its parent's value
    //  Swap the indexes
    //  Update the current element index to be its parent index
    */

    let current = this.size;
    while (
      current > 1 &&
      this.heap[current] < this.heap[this.getParent(current)]
    ) {
      console.log(
        `Swapping currentIdx at [${current}] and its parentIdx [${this.getParent(
          current
        )}]`
      );
      this.swap(this.getParent(current), current);
      console.log(this.heap);
      // progressing upwards, or bubbling up, the binary tree model of the min-heap.
      // console.log(current);
      current = this.getParent(current);
    }
  }
  heapify() {
    let current = 1;
    let leftChild = this.getLeft(current);
    let rightChild = this.getRight(current);
    console.log(leftChild, rightChild);
    while (this.canSwap(current, leftChild, rightChild)) {
      if (this.exists(leftChild) && this.exists(rightChild)) {
        if (this.heap[leftChild] < this.heap[rightChild]) {
          this.swap(current, leftChild);
          current = leftChild;
        } else {
          this.swap(current, rightChild);
          current = rightChild;
        }
      } else {
        this.swap(current, leftChild);
        current = leftChild;
      }
      leftChild = this.getLeft(leftChild);
      rightChild = this.getRight(rightChild);
    }
  }

  getParent = (current) => Math.floor(current / 2);
  getLeft = (current) => current * 2;
  getRight = (current) => current * 2 + 1;
  swap = (a, b) => {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  };
  exists(index) {
    return index <= this.size;
  }
  canSwap(current, leftChild, rightChild) {
    // The current element is a parent that can have either a left child or two children, but not just a right child.
    // Check that one of the possible swap conditions exists
    return (
      (this.exists(leftChild) && this.heap[current] > this.heap[leftChild]) ||
      (this.exists(rightChild) && this.heap[current] > this.heap[rightChild])
    );
  }
}

// instantiate a MinHeap class
const minHeap = new MinHeap();

// helper function to return a random integer
function randomize() {
  return Math.floor(Math.random() * 40);
}

// populate minHeap with random numbers
for (let i = 0; i < 6; i++) {
  minHeap.add(randomize());
}

// display the bubbled up numbers in the heap
console.log("Bubbled Up", minHeap.heap);

// remove the minimum value from heap
for (let i = 0; i < 6; i++) {
  minHeap.popMin();
  console.log("Heapified", minHeap.heap);
}
