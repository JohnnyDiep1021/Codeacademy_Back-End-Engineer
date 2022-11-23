const LinkedList = require("./LinkedList");
const Node = require("./Node");
class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null).map(() => new LinkedList());
  }
  // hasing function
  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode + key.charCodeAt(i);
    }
    // compression
    hashCode %= this.hashmap.length;
    return hashCode;
  }

  assign(key, value) {
    const arrayIndex = this.hash(key);
    const linkedList = this.hashmap[arrayIndex];
    if (!linkedList.head) {
      this.hashmap[arrayIndex].addToHead({
        key,
        value,
      });
      return;
    }
    let current = linkedList.head;
    while (current) {
      if (current.data.key === key) {
        current.data = { key, value };
      }
      if (!current.getNextNode()) {
        current.setNextNode(new Node({ key, value }));
        break;
      }
      current = current.getNextNode();
    }
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    let current = this.hashmap[arrayIndex].head;
    while (current) {
      if (current.data.key === key) {
        return current.data.value;
      }
      current = current.getNextNode();
    }
    return null;
  }
}
const birdCensus = new HashMap(16);
birdCensus.assign("mandarin duck", "Central Park Pond");
birdCensus.assign("monk parakeet", "Brooklyn College");
birdCensus.assign("horned owl", "Pelham Bay Park");
console.log(birdCensus.retrieve("mandarin duck"));
console.log(birdCensus.retrieve("monk parakeet"));
console.log(birdCensus.retrieve("horned owl"));
console.log(birdCensus.hashmap);
module.exports = HashMap;

// How would you delete a key-value pair from this hash map?

// Are there any other ways of handling collisions besides separate chaining? What would be the advantages or disadvantages of a method of avoiding separate chaining?
