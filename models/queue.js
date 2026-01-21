export default class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(id) {
    if (!this.items.includes(id)) this.items.push(id);
  }

  dequeue() {
    return this.items.shift();
  }

  remove(id) {
    this.items = this.items.filter((item) => item !== id);
  }

  has(id) {
    return this.items.includes(id);
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log("QUEUE:", this.items);
  }
}
// ;aksd
