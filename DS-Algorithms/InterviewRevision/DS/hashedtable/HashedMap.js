const { LinkedList } = require("../linkedlist/linkedList");
const { Node } = require("../Node.js");

// Using separate chaining
class HashMapLinkedList {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill().map(() => new LinkedList());
  }

  _hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode + key.charCodeAt(i)) % this.hashmap.length;
    }
    return hashCode;
  }

  assign(key, value) {
    const arrayIndex = this._hash(key);
    const linkedList = this.hashmap[arrayIndex];
    if (!linkedList.head) {
      this.hashmap[arrayIndex].addToHead({
        key,
        value,
      });
      return;
    }
    let currentNode = linkedList.head;
    while (currentNode) {
      if (currentNode.data.key === key) {
        currentNode.data = { key, value };
      }
      if (!currentNode.next) {
        currentNode.next = new Node({ key, value });
        break;
      }
      currentNode = currentNode.next;
    }
  }

  retrieve(key) {
    const arrayIndex = this._hash(key);
    let currentNode = this.hashmap[arrayIndex].head;
    while (currentNode) {
      if (currentNode.data.key === key) {
        return currentNode.data.value;
      }
      currentNode = currentNode.next;
    }
    return null;
  }
}
// const birdCensus = new HashMapLinkedList(16);
// birdCensus.assign("mandarin duck", "Central Park Pond");
// birdCensus.assign("monk parakeet", "Brooklyn College");
// birdCensus.assign("horned owl", "Pelham Bay Park");
// console.log(birdCensus.retrieve("mandarin duck"));
// console.log(birdCensus.retrieve("monk parakeet"));
// console.log(birdCensus.retrieve("horned owl"));
// console.log(birdCensus.hashmap);

class HashTable {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null);
  }

  _hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode + key.charCodeAt(i)) % this.hashmap.length;
    }
    return hashCode;
  }

  // Big O(1)
  assign(key, value) {
    const arrayIndex = this._hash(key);
    if (!this.hashmap[arrayIndex]) {
      this.hashmap[arrayIndex] = [];
    }
    this.hashmap[arrayIndex].push([key, value]);
  }

  // Big O(1) => no collisions
  retrieve(key) {
    const arrayIndex = this._hash(key);
    let currentBucket = this.hashmap[arrayIndex];
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i];
        }
      }
    }
    return undefined;
  }

  keys() {
    if (!this.hashmap.length) {
      return undefined;
    }
    let result = [];
    for (let i = 0; i < this.hashmap.length; i++) {
      if (this.hashmap[i] && this.hashmap[i].length) {
        // if (this.hashmap.length > 1) {
        for (let j = 0; j < this.hashmap[i].length; j++) {
          result.push(this.hashmap[i][j][0]);
        }
      }
    }
    return result;
  }
}

const hashTable = new HashTable(5);
hashTable.assign("burger", 24);
hashTable.assign("pizza", 20);
hashTable.assign("squid", 10);
hashTable.assign("guava", 5);
hashTable.assign("shrimp", 15);
console.log(hashTable.hashmap);
console.log(hashTable.retrieve("burger"));
console.log(hashTable.retrieve("squid"));
console.log(hashTable.retrieve("guava"));
console.log(hashTable.retrieve("pizza"));
console.log(hashTable.retrieve("shrimp"));
console.log(hashTable.keys());
