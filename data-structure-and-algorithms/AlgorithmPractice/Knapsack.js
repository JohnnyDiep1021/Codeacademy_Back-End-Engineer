/*
The first step to solving this problem is to understand the parameters involved. You will be given:

the total amount of weight you can carry (weightCap)
the weights of all of the items in an array (weights)
the values of all of the items in an array (values)
Your function should return the maximum value that you will be able to carry.

Let’s say that you have a knapsack that can only carry 5 pounds, and the house you’re robbing has three items that you want to steal:

A ring that weighs 1 pound with a value of $250
Earrings that weigh 3 pounds with a value of $300
A necklace that weighs 5 pounds with a value of $500
This information can be summarized as follows:

weightCap = 5 
weights = [1, 3, 5]
values = [250, 300, 500]

You have four possible ways to fill your knapsack:
Take only the ring, giving you $250
Take only the earrings, giving you $300
Take only the necklace, giving you $500
Take the ring and the earrings, giving you $550
Since the ring and the earrings have a combined weight of 4 pounds, taking both gives you the maximum value while staying within your weight capacity.
*/

// Recursive approach - big O runtime of O(2^n)
//  In the worst case, each step would require us to evaluate two subproblems, sometimes repeatedly, as there’s overlap between subproblems.
const recursiveKnapsack = function (weightCap, weights, values, i) {
  if (weightCap === 0 || i === 0) {
    return 0;
  } else if (weights[i - 1] > weightCap) {
    return recursiveKnapsack(weightCap, weights, values, i - 1);
  } else {
    const includeItem =
      values[i - 1] +
      recursiveKnapsack(weightCap - weights[i - 1], weights, values, i - 1);
    const excludeItem = recursiveKnapsack(weightCap, weights, values, i - 1);
    return Math.max(includeItem, excludeItem);
  }
};

/*
// Dynamic Programming approach
The knapsack problem is suited for dynamic programming because memoization will allow us to store information instead of making duplicate calls. We will store this information in a two-dimensional array that has a row for every item and weightCap + 1 number of columns where each element in the 2D array (matrix) represents a subproblem. The element at the bottom right will be the optimal solution.
the rows and columns represent? 
The rows represent the items we have seen.
The columns represent how much weight the knapsack can hold. 

The number stored inside matrix is the maximum value we can take given the weight capacity and number of items we have seen for that subproblem. By the time we get to the bottom right space in matrix, we have considered every possible subproblem and taken the maximum possible value.

Every element in the zeroeth row represents a subproblem with 0 items to consider => no value

 Likewise, every element in the zeroeth column represents a subproblem where our knapsack has a capacity of 0, giving us no value to take
*/

/*
matrix = array with length equal to number of items
for every number of items you can carry (index):
  fill matrix[index] with an array of length weightCap + 1
  for every weight < weightCap (weight):
    if index or weight == 0:
      set element at [index][weight] to 0  
    else if the weight of element at index - 1 <= weight:
      find possible values of including and excluding the item
      set element at [index][weight] to max of those values
    else:
      set element at [index][weight] to element one above
return element at bottom right of matrix
*/
const dynamicKnapsack = function (weightCap, weights, values) {
  const numItem = weights.length;
  const matrix = new Array(numItem);

  // big O(index * weight);
  for (let index = 0; index <= numItem; index++) {
    matrix[index] = new Array(weightCap + 1);
    for (let weight = 0; weight <= weightCap; weight++) {
      // Write your code here:
      if (index === 0 || weight === 0) {
        matrix[index][weight] = 0;
      } else if (weights[index - 1] <= weight) {
        const includeItem =
          values[index - 1] + matrix[index - 1][weight - weights[index - 1]];
        const excludeItem = matrix[index - 1][weight];
        matrix[index][weight] = Math.max(includeItem, excludeItem);
      } else {
        matrix[index][weight] = matrix[index - 1][weight];
      }
    }
  }
  return matrix[numItem][weightCap];
};

// Use this to test your function:
const weightCap = 50;
const weights = [31, 10, 20, 19, 4, 3, 6];
const values = [70, 20, 39, 37, 7, 5, 10];
console.log(dynamicKnapsack(weightCap, weights, values));
