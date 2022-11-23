const LinkedList = require("./LinkedList");
class Queue {
  constructor(maxSize = Infinity) {
    this.queue = new LinkedList();
    this.size = 0;
    this.maxSize = maxSize;
  }
  hasRoom() {
    return this.size < this.maxSize;
  }
  isEmpty() {
    return this.size === 0;
  }
  enqueue(data) {
    if (!this.hasRoom()) {
      throw new Error(`Queue is full!`);
    }
    this.queue.addToTail(data);
    this.size++;
    console.log(`Added "${data}"! Queue size is now ${this.size}`);
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error(`Queue is empty`);
    }
    const data = this.queue.removeHead();
    this.size--;
    console.log(`Removed "${data}"! Queue size is ${this.size}`);
    return data;
  }
}

const restaurantOrder = new Queue(3);
restaurantOrder.enqueue("apple pie");
restaurantOrder.enqueue("roast chicken");
restaurantOrder.enqueue("quinoa salad");
console.log(restaurantOrder.queue);
// restaurantOrder.enqueue("chicken salad");
console.log("\nFood preparing...\n");
restaurantOrder.dequeue();
restaurantOrder.dequeue();
restaurantOrder.dequeue();
restaurantOrder.dequeue();

console.log("All orders ready!");
module.exports = Queue;
