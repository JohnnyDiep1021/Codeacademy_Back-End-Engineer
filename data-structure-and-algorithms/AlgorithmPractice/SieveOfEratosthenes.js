/*
The Sieve of Eratosthenes is one of the oldest-known algorithms, and it’s still helpful for deriving prime numbers!

 a prime number is a positive number with no divisors but 1 and itself. 2, 3, 11, and 443 are all prime numbers.

 The algorithm works as follows:
1. Create a list of all integers from 2 to n.
2. Start with the smallest number in the list (2, the smallest prime number).
3. Mark all multiples of that number up to n as not prime.
4. Move to the next non-marked number and repeat this process until the entire list has been covered.
When the steps are complete, all remaining non-marked numbers are prime.

There are many possible ways of implementing this algorithm in JavaScript. We’ll outline a basic approach here and then walk through it step-by-step.
Create an array of all integers from 2 to n
Set all elements of the array to true
Starting with 2, iterate through the array. If the current element is true, it is still considered prime. Since we know that all multiples of that number are NOT prime, iterate through all multiples of that number up to n and set them equal to false
Change the current element to the next non-false index.
Return the corresponding number value for any element still marked as prime (value of true).
*/

function SieveOfEratosthenes(limit) {
  if (limit < 0 || typeof limit !== "number") {
    return [];
  }
  let output = new Array(limit + 1).fill(true);
  output[0] = 0;
  output[1] = 0;
  // O(n log(log n))
  // for (let i = 2; i <= limit; i++) {
  //   if (output[i]) {
  //     for (let j = i * 2; j <= limit; j += i) {
  //       output[j] = false;
  //     }
  //   }
  // }

  // Optimal - O(n)
  for (let i = 2; i <= limit; i++) {
    if (i % 2 === 0) {
      output[i] = false;
    }
  }
  return output.reduce((primes, curr, idx) => {
    if (curr) {
      primes.push(idx);
    }
    return primes;
  }, []);
}
console.log(SieveOfEratosthenes(13));
