//  Like merge sort, the input array is partitioned into smaller parts and then combined after the elements have been rearranged. Unlike merge sort, which requires additional memory for auxiliary arrays, quicksort is space-saving because it deploys in-place sorting.

// As runtime performance goes, quicksort requires more comparisons for sorting a larger input than mergesort. Like bubble sort, quicksort has a worst case runtime of O(N^2). This can happen when quicksort’s input data set comprises:

// pre-sorted numbers,
// backward-sorted numbers, or
// all similar elements along with a poorly chosen pivot element that produces a partition of zero or one element.
// On average, like merge sort, the runtime of quicksort is O(N * log N) if partition sizes are roughly equal.

// The basic idea of the quicksort algorithm is to:

// split the initial unsorted data set into a left partition and a right partition
// sort each partition recursively until there is only one element left
// return the sorted array
// We use a pivot element to divide our unsorted array into two parts. The elements in these parts must meet these conditions after partitioning:

// all elements in the left partition must be less than or equal to the pivot element
// all elements in the right partition must be greater than or equal to the pivot element
// Determining the pivot index is done through a procedure called partitioning.Our algorithm uses an array to store the data set and stipulates the boundary of the data set with left and right pointers.The pseudocode for our quicksort algorithm is as follows:

// If there is more than one element left in the array:
//   Find the pivot index through partitioning

//   If the left pointer is less than the pivot index:
//     Call quicksort() on the portion of the array between the left pointer and the pivot.

//   If the pivot index is less than the right pointer:
//     Call quicksort() on the portion of the array between the pivot index and the right pointer.

// Return the sorted array

/*
REVIEW:

Quicksort is a divide-and-conquer algorithm that splits an unsorted data set into two partitions recursively and sorts the partitioned arrays in-place until there is only one element left in a partition.
To determine the elements that belong in a partition, we need a pivot element, pivot, that is sandwiched between the two partitions and its location called the pivotIndex.
We implemented the partition() function which groups and swaps the elements either to the left or right of the pivot element and returns the leftIndex that is the same as the pivotIndex.
We implemented the quicksort() function that first calls partition() to determine the pivotIndex then recursively calls itself to sort the smaller partitions until there is only one element left in the partition.
*/

const swap = (arr, indexOne, indexTwo) => {
  const temp = arr[indexTwo];
  arr[indexTwo] = arr[indexOne];
  arr[indexOne] = temp;
};

const quicksort = (array, leftBound = 0, rightBound = array.length - 1) => {
  if (leftBound < rightBound) {
    console.log(
      ". Calling partition",
      array,
      `with leftBound ${leftBound} and rightBound ${rightBound}`
    );
    const pivotIndex = partition(array, leftBound, rightBound);
    console.log(`. Returning pivotIndex = ${pivotIndex}`);
    console.log(
      `\nCalling quicksort for left partition with leftBound ${leftBound} and (pivotIndex-1) ${
        pivotIndex - 1
      }`
    );
    quicksort(array, leftBound, pivotIndex - 1);
    console.log(
      `\nCalling quicksort for right partition with pivotIndex ${pivotIndex} and rightBound ${rightBound}`
    );
    quicksort(array, pivotIndex, rightBound);
  }
  return array;
};

const partition = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
  console.log(
    `.. Partitioning with pivot ${pivot} leftIndex ${leftIndex} rightIndex ${rightIndex}`
  );
  while (leftIndex <= rightIndex) {
    while (array[leftIndex] < pivot) {
      leftIndex++;
      console.log(
        `.. ${
          array[leftIndex - 1]
        } < ${pivot} : Incremented leftIndex => ${leftIndex}`
      );
    }
    while (array[rightIndex] > pivot) {
      rightIndex--;
      console.log(
        `.. ${
          array[rightIndex + 1]
        } > ${pivot} : Decremented rightIndex => ${rightIndex}`
      );
    }
    if (leftIndex <= rightIndex) {
      const string = `${leftIndex} <= ${rightIndex}`;
      swap(array, leftIndex, rightIndex);
      console.log(
        `.. ${string} : Swapped leftIndex ${leftIndex} with rightIndex ${rightIndex}`,
        array
      );
      leftIndex++;
      rightIndex--;
      console.log(
        `......... : Incremented leftIndex => ${leftIndex} Decremented rightIndex => ${rightIndex}`
      );
    }
  }
  return leftIndex;
};

const randomize = () => Math.floor(Math.random() * 40);

let numbers = [];

for (let i = 0; i < 5; i++) {
  ~numbers.push(randomize());
}

console.log("Before quicksort:", [26, 18, 10, 11, 35]);
const sorted = quicksort([26, 18, 10, 11, 35]);
console.log("After  quicksort:", sorted);

module.exports = {
  quicksort,
  partition,
};
