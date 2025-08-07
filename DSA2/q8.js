/*
Implement singly linked list. Operations on the linked list should be:
Append: Add data at the end
Prepend: Add data at  the beginning
RemoveAt: Removes data from the given index
InsertAt: Add data at the given index
Size: returns the size of list
isEmpty: Checks if list is empty or not
Search: Finds data from linked list.
*/

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Add data at the end of the list
  append(data) {
    const newNode = new Node(data);
    
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.length++;
  }

  // Add data at the beginning of the list
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.length++;
  }

  // Remove data at a specific index
  removeAt(index) {
    if (index < 0 || index >= this.length || this.head === null) {
      return null;
    }
    
    if (index === 0) {
      const removedData = this.head.data;
      this.head = this.head.next;
      this.length--;
      return removedData;
    }
    
    let current = this.head;
    let previous = null;
    let currentIndex = 0;
    
    while (currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }
    
    previous.next = current.next;
    this.length--;
    return current.data;
  }

  // Insert data at a specific index
  insertAt(index, data) {
    if (index < 0 || index > this.length) {
      return false;
    }
    
    if (index === 0) {
      this.prepend(data);
      return true;
    }
    
    if (index === this.length) {
      this.append(data);
      return true;
    }
    
    const newNode = new Node(data);
    let current = this.head;
    let previous = null;
    let currentIndex = 0;
    
    while (currentIndex < index) {
      previous = current;
      current = current.next;
      currentIndex++;
    }
    
    newNode.next = current;
    previous.next = newNode;
    this.length++;
    return true;
  }

  // Get the size of the list
  size() {
    return this.length;
  }

  // Check if the list is empty
  isEmpty() {
    return this.length === 0;
  }

  // Search for data in the list
  search(data) {
    let current = this.head;
    let index = 0;
    
    while (current !== null) {
      if (current.data === data) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1; // Not found
  }

  // Optional: Helper method to print the list
  print() {
    let current = this.head;
    const elements = [];
    while (current !== null) {
      elements.push(current.data);
      current = current.next;
    }
    console.log(elements.join(' -> '));
  }
}

// Example usage:
const list = new LinkedList();
list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(2, 15);
list.print(); // Output: 5 -> 10 -> 15 -> 20
console.log(list.size()); // Output: 4
console.log(list.search(15)); // Output: 2
list.removeAt(1);
list.print(); // Output: 5 -> 15 -> 20
console.log(list.isEmpty()); // Output: false


//TIme Complexity = O(n)