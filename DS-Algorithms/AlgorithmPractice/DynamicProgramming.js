/*
Dynamic Programming is a programming technique used to solve recursive problems more efficiently. 

Memoization
Memoization is a specialized form of caching used to store the result of a function call. The next time that function is called, instead of running the function itself, the result is used directly. Memoization can result in much faster overall execution times (although it can increase memory requirements as function results are stored in memory).

Memoization is a great technique to use alongside recursion. The memo can even be saved between function calls if it’s being used for common calculations in a program.

Dynamic programming and memoization are great techniques breaking up complex recursive problems into smaller chunks. They are especially useful when tackling problems that involve combinations. 

*/
const fibonacci = () => {
  // Time complexity O(n);
  let memo = {};
  return function fib(n) {
    if (n in memo) {
      return memo[n];
    } else {
      if (n < 2) {
        return n;
      }
      memo[n] = fib(n - 1) + fib(n - 2);
      return memo[n];
    }
  };
};
const fibbo = fibonacci();

// Test your code with calls here:
console.log(fibbo(200));
console.log(fibbo(20));
