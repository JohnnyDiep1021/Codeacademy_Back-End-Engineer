/*
arr.sort()
return an altered array that is more sorted than before

The numbers are ordered by the first digit
The same pattern can be seen in the sorting of the strings, where it’s sorted according to the first character. This is because .sort()‘s default comparator converts the values in the array to strings and then compares them lexically.

The comparator function will compare two elements in the array and return a value that .sort() will use to determine the sorting order. The function should take two arguments, usually named a and b:

There are three possible categories of return values:

1. A value less than zero, which means a will be sorted at a lower index than b
2. A value greater than zero, which means b will be sorted at a lower index than a
3. The value zero, which means the two elements were equal and won’t be moved

// If we want to sort an array by each element’s length in ascending order, we should return _____ when a is shorter than b, and _____ when a is longer than b.
=> 1, -1; A negative return value means that a will be placed before b and a positive value means a will be placed after b
*/

// comparator function
const sortByLength = (a, b) => {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
};

const ascendingOrder = (a, b) => {
  if (a < b) return a - b;
  if (a > b) return a;
  if (a === b) return 0;
};
// Use this array to test your code:
const testArray = [10, 43, 5, 0, -2, -20, 4, 3, 2, 1, 11];
testArray.sort(ascendingOrder);
console.log(testArray);

const testArray2 = ["car", "train", "plane", "bike", "skateboard", "jet"];
testArray2.sort(sortByLength);
console.log(testArray2);

/*
Explicit Ordering 
- Given an input array, we want to sort the array given to an explicit order. If elements aren’t in the given explicit order, put them at the back in the same order they appeared

const inputArray = ['a', 'b', 'c', 'd', 'e', 'f', 'n', 'y', 'g'];
const order = ['a', 'n', 'd', 'y'];
=> ['a', 'n', 'd', 'y', 'b', 'c', 'e', 'f', 'g']

explicitComparator() function:
indexA and indexB are initialized to the length of the order array
if a is in order
  indexA = a's index in order
if b is in order
  indexB = b's index in order
return indexA - indexB
*/
const explicitSortWithComparator = (inputArray, order) => {
  const explicitComparator = (a, b) => {
    // Write your code here:
    let idxA = order.length,
      idxB = order.length;
    if (order.includes(a)) {
      idxA = order.indexOf(a);
    }
    if (order.includes(b)) {
      idxB = order.indexOf(b);
    }
    return idxA - idxB;
  };

  return inputArray.sort(explicitComparator).slice();
};
// Use this array to test your code:
const inputArray = ["a", "b", "c", "d", "e", "f", "n", "y", "g"];
const order = ["a", "n", "d", "y"];
console.log(explicitSortWithComparator(inputArray, order));

/*
The time and space complexities of JavaScript’s internal .sort() method
=> depends on the length of the array used to sort. If the array has 10 or fewer elements, then the method will use insertion sort, with a time complexity of O(n^2) and a space complexity of O(1). If the array is longer, then the method will use quicksort, giving it a time complexity of O(n log n) and a space complexity of O(log n).
*/
