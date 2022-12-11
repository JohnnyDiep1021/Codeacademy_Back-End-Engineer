// Big O(log N)
function divideByTwo(n) {
  let countIterations = 0;
  while (n > 1) {
    n = n / 2;
    countIterations++;
  }
  return countIterations;
}

// divideByTwo() has a big O runtime of log n because the function divides n by two every iteration, and terminates when n is 1. countIterations counts how many times the while loop runs, and you can see in the output that it is log2(n). Since we drop constants for asymptotic notation, the big O runtime is just log n.

console.log(divideByTwo(1));
console.log(divideByTwo(2));
console.log(divideByTwo(4));
console.log(divideByTwo(8));
console.log(divideByTwo(16));
console.log(divideByTwo(32));
console.log(divideByTwo(64));

// Finding the Maximum Value in a Linked List
function findMax(list) {
  let current = list.head;
  let max = current.data;
  while (current.getNextNode() !== null) {
    current = current.getNextNode();
    let val = current.data;
    if (val > max) {
      max = val;
    }
  }
  return max;
}
// Big O(n) => The big O runtime is n since you iterate through the list one time.

// Sorting a Linked List
// sort a linked list from the smallest value to the largest value.
// There are many ways to sort a linked list, but one way is as follows:
// 1.Instantiate a new linked list
// 2.Find the maximum value of the linked list input
// 3.Insert the maximum to the beginning of the new linked list
// 4.Remove the maximum value from the linked list input
// 5.Repeat steps 2-4 until the linked list input is empty
// 6.Return the new linked list

function sortLinkedList(list) {
  let newList = new LinkedList();
  while (list.head !== null) {
    let currentMax = findMax(list);
    list.remove(currentMax);
    newList.addToHead(currentMax);
  }
  return newList;
}
// Big O(n^2) => there are nested while loops (one in findMax() and one in sortLinkedList()), the big O runtime is n^2.
