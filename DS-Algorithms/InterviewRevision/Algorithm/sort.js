const swap = (arr, idx1, idx2) => {
  const temp = arr[idx2];
  arr[idx2] = arr[idx1];
  arr[idx1] = temp;
};

function bubbleSort(input) {
  if (!(input instanceof Array)) {
    return input;
  }
  if (input.length === 1) {
    return input;
  }
  let swapping = true;
  while (swapping) {
    swapping = false;
    for (let i = 0; i < input.length - 1; i++) {
      if (input[i] > input[i + 1]) {
        swap(input, i, i + 1);
        swapping = true;
      }
    }
  }
  return input;
}

console.log(bubbleSort([9, 8, 7, 6, 5, 4, 3, 2, 1])); // O(n^2) quadratic runtime
console.log(bubbleSort([1, 2, 3, 4, 5, 6, 7, 8, 9])); // O(n) linear runtime

function selectionSort(arr) {
  // space complexity O(1); time complexity O(n^2)
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    // set current index as min
    let min = i;
    for (let j = i + 1; j < length; j++) {
      // update min if current > next index
      if (arr[min] > arr[j]) {
        min = j;
      }
    }
    swap(arr, i, min);
  }
  return arr;
}
console.log(selectionSort(numbers));

function insertionSort(arr) {
  // Best case: O(n) - nearly sorted data;
  // Worst Case: time complexity O(n ^ 2) - space complexity O(1)
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    if (arr[i] < arr[0]) {
      // move number to the 1st position
      arr.unshift(arr.splice(i, 1)[0]);
    } else {
      //  find where number should go
      for (let j = 1; j < i; j++) {
        if (arr[i] > arr[j - 1] && arr[i] < arr[j]) {
          // move number to the right spot
          arr.splice(j, 0, arr.splice(i, 1)[0]);
        }
      }
    }
  }
  return arr;
}
console.log(insertionSort(numbers));

function insertionSort() {}
