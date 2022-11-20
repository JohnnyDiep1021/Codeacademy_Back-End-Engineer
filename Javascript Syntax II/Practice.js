// Write a function factorial() that takes a number as an argument and returns the factorial of the number.
function factorial(num) {
  // base case
  if (num === 0) {
    return 1;
  }
  // recursive step
  return num * factorial(num - 1);
}

// // Sample Solution
// const factorial = (n) => {
//   let result = 1;

//   for (let i = n; i > 0; i--) {
//     result *= i;
//   }

//   return result;
// };

console.log(factorial(6));

// Write a function subLength() that takes 2 parameters, a string and a single character. The function should search the string for the two occurrences of the character and return the length between them including the 2 characters. If there are less than 2 or more than 2 occurrences of the character the function should return 0.
function subLength(str, char) {
  const arrIdx = []; // O(n) - space complexity
  str.split("").forEach((ele, idx) => {
    if (ele === char) {
      arrIdx.push(idx);
    }
  }); // O(n) - time complexity
  if (arrIdx.length != 2) {
    return 0;
  }
  return str.split("").slice(arrIdx[0], arrIdx[1] + 1).length;
}

// // Sample Solution
// const subLength = (str, char) => {
//   let charCount = 0;
//   let len = -1;

//   for (let i = 0; i < str.length; i++) {
//     if (str[i] == char) {
//       charCount++;
//       if (charCount > 2) {
//         return 0;
//       }
//       if (len == -1) {
//         len = i;
//       } else {
//         len = i - len + 1;
//       }
//     }
//   }
//   if (charCount < 2) {
//     return 0;
//   }

//   return len;
// };
console.log(subLength("Saturday", "a"));
console.log(subLength("summer", "m"));
console.log(subLength("digitize", "i"));
console.log(subLength("cheesecake", "k"));

// Write a function groceries() that takes an array of object literals of grocery items. The function should return a string with each item separated by a comma except the last two items should be separated by the word 'and'. Make sure spaces (' ') are inserted where they are appropriate.
function groceries(arr) {
  const itemList = arr.map((ele) => ele.item);
  if (itemList.length === 1) {
    return itemList[0];
  }
  return (
    itemList.slice(0, itemList.length - 1).join(", ") +
    " and " +
    itemList.slice(-1)
  );
}
console.log(
  groceries([
    { item: "Carrots" },
    { item: "Hummus" },
    { item: "Pesto" },
    { item: "Rigatoni" },
  ])
);

// // Sample Solution
// const groceries = (list) => {
//   let listString = "";

//   for (let i = 0; i < list.length; i++) {
//     listString += list[i].item;
//     if (i < list.length - 2) {
//       listString += ", ";
//     } else if (i == list.length - 2) {
//       listString += " and ";
//     }
//   }

//   return listString;
// };

console.log(groceries([{ item: "Bread" }, { item: "Butter" }]));
console.log(groceries([{ item: "Cheese Balls" }]));
