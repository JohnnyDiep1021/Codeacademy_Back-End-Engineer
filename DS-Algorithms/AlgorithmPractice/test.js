// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// function solution(N) {
//   // Implement your solution here

//   // Code outline
//   /*
//         N = 16 => 79
//         N = 19 => 199
//         N = 7 => 7
//         Given the logical pattern abobe, it is obvious that most of smallest positive integer will have digit of 9.

//     */

//   // Time complexity O(N) - space complexity (1)
//   // console.log(Math.pow(10, parseInt(N / 9)));
//   console.log((7 % 9) + 1);
//   return ((N % 9) + 1) * Math.pow(10, parseInt(N / 9, 10)) - 1;
// }

// console.log(solution(16));

// function solution(P, S) {
//   // Implement your solution here
//   let total_passenger = P.reduce((pre, cur) => pre + cur, 0);
//   let car = 0;
//   S.sort((a, b) => b - a);
//   for (const i of S) {
//     if (total_passenger > 0) {
//       total_passenger = total_passenger - i;
//       car++;
//     }
//   }
//   return car;
// }

// console.log(solution([1, 4, 1], [1, 5, 1]));

function solution(AA, AB, BB) {
  // // Implement your solution here
  if (AA === 0) return "BB".repeat(BB) + "AB".repeat(AB);
  if (AB === 0) return "AABB".repeat(AA + BB);
  if (BB === 0) return "AB".repeat(AB) + "AA".repeat(AA);
  if ((AA === AB) === BB) return "AABBAB" + solution(AA - 1, AB - 1, BB - 1);
  if (AA > AB || AA > BB) return "AABBAB" + solution(AA - 2, AB - 1, BB - 1);
  if (AB > AA || AB > BB) return "ABAABB" + solution(AA - 1, AB - 2, BB - 1);
  return "BBABAA" + solution(AA - 1, AB - 1, BB - 2);
  // return "BBA" + solution(AA - 1, BB - 2);
}

console.log(solution(5, 0, 2));
