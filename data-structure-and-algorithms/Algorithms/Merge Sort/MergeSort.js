// The algorithm consists of two distinct steps:

// 1. Splitting the input array – The algorithm recursively splits the input array until each element is in its own array. This portion of the algorithm is represented in the top half of the image to the right.
// 2. Merging sorted arrays – The algorithm compares and combines the elements of arrays until the input array is sorted. This is shown in the bottom half of the image.

// Regardless of the order or length (including odd or even lengths) of an input array, the merge sort algorithm will always split the elements into their own arrays first, and then combine them into a sorted array. The fact that the same steps are taken regardless of the input (order and length) results in an average, best, and worst case complexity all equal to the same value, O(n log n).

// This time complexity makes merge sort one of the most efficient and popular sorting algorithms. Take a look at merge sort compared to a few others on toptal.com.

//  An important point to remember about merge sort is that the algorithm is broken into two parts: splitting and merging.
const mergeSort = (startArray) => {
  const length = startArray.length;
  // base case => the input array has only one element in it.
  if (length === 1) {
    return startArray;
  }

  // recursive case
  const mid = Math.floor(length / 2);
  // split the input array into a leftArray and rightArray
  const leftArray = startArray.slice(0, mid);
  const rightArray = startArray.slice(mid, length);

  // recursive call
  return merge(mergeSort(leftArray), mergeSort(rightArray));
}; // O(N log N)

const merge = (leftArray, rightArray) => {
  const sortedArray = [];
  // Because the while loop continues until either leftArray or rightArray is empty, you need to concatenate whatever is left in the other array to the sorted array
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0] < rightArray[0]) {
      sortedArray.push(leftArray[0]);
      // If we did not call the .shift() method, the while loop would continue infinitely and compare the same two numbers over and over again.
      leftArray.shift();
    } else {
      sortedArray.push(rightArray[0]);
      rightArray.shift();
    }
  }

  // Return sortedArray, with leftArray and rightArray concatenated.
  // The remaining elements in the array will be greater than any of the numbers in sortedArray.
  return sortedArray.concat(leftArray).concat(rightArray);
};

const inputArr = [3, 5, 2, 90, 4, 7];

console.log(mergeSort(inputArr));

module.exports = {
  mergeSort,
};
