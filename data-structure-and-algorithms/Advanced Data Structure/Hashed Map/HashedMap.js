class HashMap {
  constructor(size = 0) {
    this.hashmap = new Array(size).fill(null);
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
    this.hashmap[arrayIndex] = value;
  }

  retrieve(key) {
    const arrayIndex = this.hash(key);
    return this.hashmap[arrayIndex];
  }
}
const employees = new HashMap(3);
employees.assign("34-567", "Mara");
console.log(employees.hashmap);

module.exports = HashMap;
