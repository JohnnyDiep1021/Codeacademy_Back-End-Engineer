/*
The capturing rainwater problem asks you to calculate how much rainwater would be trapped in the empty spaces in a histogram (a chart which consists of a series of bars). Consider the following histogram

Like with the road, the amount of water that can be captured at any given space cannot be higher than the bounds around it. 

The Naive Solution
1. Traverse every element in the array
2. Find the highest left bound for that index
3. Find the highest right bound for that index
4. Take the lower of those two values
5. Subtract the height of that index from that minimum
6. Add the difference to the total amount of water
*/

// Brute force - O(n^2)
function naiveSolution(heights) {
  let totalWater = 0;
  for (let i = 1; i < heights.length - 1; i++) {
    let leftBound = 0;
    let rightBound = 0;
    // We only want to look at the elements to the left of i, which are the elements at the lower indices
    for (let j = 0; j <= i; j++) {
      leftBound = Math.max(leftBound, heights[j]);
    }
    // Likewise, we only want the elements to the right of i, which are the elements at the higher indices
    for (let j = i; j < heights.length; j++) {
      rightBound = Math.max(rightBound, heights[j]);
    }
    totalWater += Math.min(leftBound, rightBound) - heights[i];
  }
  return totalWater;
}

// The Optimized Solution - Two-pointer approach
/*
totalWater = 0
leftPointer = 0 
rightPointer = heights.length - 1
leftBound = 0
rightBound = 0

while leftPointer < rightPointer
  if the element at leftPointer <= the element at rightPointer
    if the element is larger than leftBound, set leftBound to the element
    add the difference between leftBound and the element at leftPointer to totalWater
    move leftPointer forward by one
  else
    if the element is larger than rightBound, set rightBound to the element
    add the difference between rightBound and the element at rightPointer to totalWater
    move rightPointer back by one 

return totalWater
*/

function captureWater(heights) {
  let totalWater = 0;
  let leftPointer = 0;
  let rightPointer = heights.length - 1;
  let leftBound = 0;
  let rightBound = 0;

  // Linear runtime O(n) - Space complexity O(1)
  while (leftPointer < rightPointer) {
    if (heights[leftPointer] <= heights[rightPointer]) {
      leftBound = Math.max(heights[leftPointer], leftBound);
      totalWater += leftBound - heights[leftPointer];
      leftPointer++;
    } else {
      rightBound = Math.max(heights[rightPointer], rightBound);
      totalWater += rightBound - heights[rightPointer];
      rightPointer--;
    }
  }
  return totalWater;
}
// console.log(captureWater([4, 2, 1, 3, 0, 1, 2]));

/*
Takeaway: The Two Pointer Approach
The two-pointer approach is one that you can, and should, use in many interview questions. When you see a problem that requires you to iterate through an array (or string), take a moment and think about if it would be possible to iterate through it in sections at the same time instead of in separate loops. Common problems that can be solved using the two-pointer technique are the two sum problem (finding two numbers in an array that sum to a specified number) and reversing the characters in a string.
*/
/*
1. clarify the problem
2. producing the input + edge cases
3. outline the solution
4. code the solution
5. test with the input
6. analyze/ optimize/ refactor (time & space complexity)
*/
// the two sum problem (finding two numbers in an array that sum to a specified number)
function findSum(arr, num) {
  arr = arr.filter((ele) => ele <= num).sort((a, b) => b - a); // space complexity - O(1)
  let leftPointer = 0;
  let rightPointer = arr.length - 1;
  console.log(arr);
  while (leftPointer < rightPointer) {
    // Time complexity O(n)
    sum = arr[leftPointer] + arr[rightPointer];
    // if (arr[leftPointer] >= num) {
    //   leftPointer++;
    // } else if (arr[rightPointer] >= num) {
    //   rightPointer--;
    // } else {
    if (sum === num) {
      return [arr[leftPointer], arr[rightPointer]];
    } else {
      // leftPointer++;
      rightPointer--;
    }
    // }
  }
  return null;
}
// console.log(findSum([4, 2, 1, 6, 7, 12, 24, 17, 4, 0, 1, 2], 6));

function reverseStr(str) {
  let arr = str.split(""),
    leftIdx = 0;
  rightIdx = str.length - 1;
  while (leftIdx < rightIdx) {
    let temp = arr[leftIdx];
    arr[leftIdx] = arr[rightIdx];
    arr[rightIdx] = temp;
    leftIdx++;
    rightIdx--;
  }
  return arr.join("");
}

console.log(reverseStr(`Johnny`));
