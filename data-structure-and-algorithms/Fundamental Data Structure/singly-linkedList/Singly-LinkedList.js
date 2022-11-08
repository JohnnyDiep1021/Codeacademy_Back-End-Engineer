// const { Node } = require("./Node");
// class SinglyLinkedList {
//   constructor() {
//     this.head = null;
//   }

//   addToHead(data) {
//     const newHead = new Node(data);
//     const currentHead = this.head;
//     this.head = newHead;
//     if (currentHead) {
//       this.head.setNextNode(currentHead);
//     }
//   }

//   addToTail(data) {
//     let tail = this.head;
//     if (!tail) {
//       this.head = new Node(data);
//       return;
//     }
//     while (tail.getNextNode()) {
//       tail = tail.getNextNode();
//     }
//     tail = tail.setNextNode(new Node(data));
//   }

//   removeHead() {
//     const removeHead = this.head;
//     if (!removeHead) {
//       return null;
//     }
//     this.head = removeHead.getNextNode();
//     return removeHead.data;
//   }

//   removeByData(data) {
//     let removedNode = this.head;
//     let prevNode;
//     if (!removedNode) {
//       return null;
//       // if the linked list's head's data is equal to the given data, then remove head
//     } else if (removedNode.data === data) {
//       return this.removeHead();
//     } else {
//       while (removedNode) {
//         if (removedNode.data === data) {
//           prevNode.setNextNode(removedNode.getNextNode());
//           break;
//         }
//         prevNode = removedNode;
//         removedNode = removedNode.getNextNode();
//       }
//       return removedNode;
//     }
//   }

//   printSinglyLinkedList() {
//     let currentNode = this.head;
//     let output = `<head> `;
//     while (currentNode) {
//       output += currentNode.data + " ";
//       currentNode = currentNode.getNextNode();
//     }
//     output += `<end>`;
//     console.log(output);
//   }
// }

const { Node } = require("./Node");
class LinkedList {
  constructor() {
    this.head = null;
  }
  addToHead(data) {
    const newHead = new Node(data);
    const currentHead = this.head;
    this.head = newHead;
    if (currentHead) {
      this.head.setNextNode(currentHead);
    }
  }
  addToTail(data) {
    let tail = this.head;
    const newNode = new Node(data);
    if (!tail) {
      this.head = newNode;
    } else {
      while (tail.getNextNode()) {
        tail = tail.getNextNode();
      }
      tail.setNextNode(newNode);
    }
  }

  removeHead() {
    const removedHead = this.head;
    if (!removedHead) {
      return;
    }
    this.head = removedHead.getNextNode();
    return removedHead;
  }

  printList() {
    let currentNode = this.head;
    let output = "<head> ";
    while (currentNode) {
      output += currentNode.data + " ";
      currentNode = currentNode.getNextNode();
    }
    output += "<tail>";
    console.log(output);
  }
}

const subway = new LinkedList();
subway.addToHead("Lawrence");
subway.addToHead("North-York");
subway.addToHead("Finch");
subway.addToTail("King");
subway.addToTail("Queen");
subway.printList();
// subway.removeHead();
// subway.addToTail("Bathurst");
// subway.addToHead("York");
// subway.printList();
// subway.addToHead("Vaugh");
// subway.removeByData("King");
// subway.printList();
// subway.removeByData("Vaugh");
// subway.printList();
// subway.removeByData("Queen");
// subway.printList();
// subway.removeByData("Bathurst");
// subway.printList();
// swapNodes(subway, "York", "Lawrence");
// subway.printList();
// swapNodes(subway, "North-York", "Lawrence");
// subway.printList();
// swapNodes(subway, "York", "Lawrence");
// subway.printList();

// Swapping Elements in a Linked List
// Given an input of a linked list, data1, and data2, the general steps for doing so is as follows:
// 1. Iterate through the list looking for the node that matches data1 to be swapped (node1), keeping track of the node’s previous node as you iterate (node1Prev)
// 2. Repeat step 1 looking for the node that matches data2 (giving you node2 and node2Prev)
// 3. If node1Prev is null, node1 was the head of the list, so set the list’s head to node2
// 4. Otherwise, set node1Prev‘s next node to node2
// 5. If node2Prev is null, set the list’s head to node1
// 6. Otherwise, set node2Prev‘s next node to node1
// 7. Set node1‘s next node to node2‘s next node
// 8. Set node2‘s next node to node1‘s next node
function swapNodes(linkedList, data1, data2) {
  if (!(linkedList instanceof LinkedList)) {
    throw new Error(`List data must be linkedList type`);
  }
  let node1 = this.head;
  let node1Prev = null;
  let node2 = this.head;
  let node2Prev = null;
  while (node1) {
    if (node1.data === data1) {
      break;
    }
    node1Prev = node1;
    node1 = node1.getNextNode();
  }
  while (node2) {
    if (node2.data === data2) {
      break;
    }
    node2Prev = node2;
    node2 = node2.getNextNode();
  }
  if (node1 === null || node2 === null) {
    console.log("Swap not possible - one or more element is not in the list");
    return;
  }
  if (!node1Prev) {
    this.head = node2;
  } else {
    node1Prev.setNextNode(node2);
  }
  if (!node2Prev) {
    this.head = node1;
  } else {
    node2Prev.setNextNode(node1);
  }
  let temp = node1.getNextNode();
  node1.setNextNode(node2.getNextNode());
  node2.setNextNode(temp);
}
// Time and Space Complexity
// The worst case for time complexity in swapNodes() is if both while loops must iterate all the way through to the end (either if there are no matching nodes, or if the matching node is the tail). This means that it has a linear big O runtime of O(n), since each while loop has a O(n) runtime, and constants are dropped.

// There are four new variables created in the function regardless of the input, which means that it has a constant space complexity of O(1).

// approach Linked List problems with multiple iterator pointers
//  find the nth last element of a singly linked list => Two Pointers Moving in Parallel

// solve this problem by using two pointers at different positions in the list but moving at the same rate. As in the previous example, we will use one pointer to iterate through the entire list, but we’ll also move a second pointer delayed n steps behind the first one.

function nthLastNode(linkedList, n) {
  let nthLastNode = null; // O(1)
  let tailNode = linkedList.head; // O(1)
  // counter ver to delay n step
  let count = 0;
  while (tailNode) {
    // O(n)
    tailNode = tailNode.getNextNode();
    if (count <= n) {
      if (!nthLastNode) {
        nthLastNode = linkedList.head;
      }
      nthLastNode = nthLastNode.getNextNode();
    }
    count++;
  }
  return nthLastNode;
}
console.log(nthLastNode(subway, 1));

// approach this problem efficiently–in O(n) time (iterate through the entire list once), and O(1) space complexity (always use only three variables no matter what size the list is: two pointers and a counter).

// Pointers at Different Speeds
// Another two-pointer technique involves sending pointers through the list at different iteration “speeds”.
// variations on the two-pointer technique can be used to detect a cycle in a linked list or rotate a linked list by k places

// Use two pointers to move through the list. The first pointer takes two steps through the list for every one step that the second takes, so it iterates twice as fast. When the first pointer reaches the end of the list, the “slower” second pointer will be pointing to the middle element.

// Pseudo code
// fastPointer = list head
// slowPointer = list head
// while fastPointer is not null
//   move fastPointer forward
//   if the end of the list has not been reached
//     move fastPointer forward again
//     move slowPointer forward
// return slowPointer

function findMiddle(linkedList) {
  let fastPointer = linkedList.head;
  let slowPointer = linkedList.head;
  while (fastPointer) {
    fastPointer = fastPointer.getNextNode();
    if (fastPointer) {
      fastPointer = fastPointer.getNextNode();
      slowPointer = slowPointer.getNextNode();
    }
  }
  return slowPointer;
}
console.log(findMiddle(subway));
// As with the nth - to - last solution, this solution has O(n) time complexity, and O(1) space complexity, since only two nodes are created no matter the size of the input list.

// Half-Speed
// Another equally valid solution is to move the fast pointer once with each loop iteration but only move the slow pointer every-other iteration.
const findMiddleAlternate = (linkedList) => {
  let count = 0;
  let fast = linkedList.head;
  let slow = linkedList.head;

  while (fast !== null) {
    fast = fast.getNextNode();
    if (count % 2 !== 0) {
      // odd numbers
      slow = slow.getNextNode();
    }
    count++;
  }
  return slow;
};

console.log(findMiddleAlternate(subway));

exports.module = {
  LinkedList,
};
