/*
// pseudocode example:
// while array is not sorted
// for each value in array
// if current value > next value
// swap current value and next value
// return array 

Bubble sort is not the most efficient sorting algorithm. Bubble sort’s worst-case runtime is O(n^2). This is because we have to compare the current element we are looking at, to each element in the array after it and repeat this check for every single element in the array. Its best-case runtime is O(n) for an already-sorted list.

An array with the elements already sorted from smallest to greatest would only need to be looped over one time since it requires no sorting. O(n)

An array with the elements reverse-sorted where the elements sorted from largest to smallest. O(n^2)

*/

// One loop that will execute an inner loop depending on the state of a variable representing whether the input array might be sorted or not
// An inner loop to compare and swap pairs of elements in the array

/*
What real-life examples of bubble sort can you come up with?
Cars overtaking one another on a one-lane highway illustrate the comparison and swap of bubble sort. If one car is faster than the car in front of it, the first car will “swap” positions and overtake the other car. This might repeat until the fastest car overtakes all other cars in front of it.
*/
const swap = (arr, idx1, idx2) => {
  const temp = arr[idx2];
  arr[idx2] = arr[idx1];
  arr[idx1] = arr[idx2];
};

const bubbleSort = (input) => {
  if (!(input instanceof Array)) {
    return input;
  }
  if (input.length === 1) {
    return input;
  }
  let swapping = true;
  let count = 0;
  while (swapping) {
    swapping = false;
    for (let i = 0; i < input.length - 1; i++) {
      if (input[i] > input[i + 1]) {
        swap(input, i, i + 1);
        swapping = true;
        count++;
      }
    }
  }
  console.log(`Swapped ${count} times`);
  return input;
};

console.log(bubbleSort([9, 8, 7, 6, 5, 4, 3, 2, 1])); // O(n^2) quadratic runtime
console.log(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9])); // O(n) linear runtime
