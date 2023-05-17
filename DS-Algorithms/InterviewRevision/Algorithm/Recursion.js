// Big O(n)
const factorial = (n) => {
  if (n < 0) {
    throw new Error("Cannot find factorial of a negative number");
  }
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
};
console.log(factorial(5));

// Big O(n)
const fibIter = (n) => {
  let arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 1] + arr[i - 2]);
  }
  return arr[n];
};
console.log(fibIter(12));

// Big O(2^n)
const fibRecur = (n) => {
  // base case
  if (n <= 2) {
    return 1;
  }
  return fibRecur(n - 1) + fibRecur(n - 2);
};
console.log(fibRecur(2));

// Big O(n)
const fibDynamic = () => {
  const memo = {};
  return function fib(n) {
    if (n in memo) {
      return memo[n];
    } else {
      if (n <= 2) {
        return 1;
      } else {
        memo[n] = fib(n - 1) + fib(n - 2);
        return memo[n];
      }
    }
  };
};
console.log(fibDynamic()(12));
