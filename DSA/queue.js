class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.items.length === 0) {
            return "Empty queue";
        }
        return this.items.shift();
    }

    search(element) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] === element) {
                return i;
            }
        }
        return "Can't find the data";
    }
}

const q = new Queue();
q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
console.log(q.search(20));
console.log(q.search(40));
console.log(q.dequeue());
console.log(q.items);
console.log(q.dequeue());
console.log(q.items);
console.log(q.dequeue());
console.log(q.dequeue());
console.log(q.items);
