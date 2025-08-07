/*
Explain the concept of a Binary Search Tree and provide its implementation in JavaScript.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value
  insert(value) {
    const newNode = new Node(value);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // No duplicates
      
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  // Search for a value
  find(value) {
    if (!this.root) return false;
    
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  // Find minimum value
  findMin(node = this.root) {
    while (node && node.left) {
      node = node.left;
    }
    return node;
  }

  // Find maximum value
  findMax(node = this.root) {
    while (node && node.right) {
      node = node.right;
    }
    return node;
  }

  // Remove a value
  remove(value, node = this.root) {
    if (!node) return null;
    
    if (value < node.value) {
      node.left = this.remove(value, node.left);
    } else if (value > node.value) {
      node.right = this.remove(value, node.right);
    } else {
      // Node with only one child or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      
      // Node with two children
      const temp = this.findMin(node.right);
      node.value = temp.value;
      node.right = this.remove(temp.value, node.right);
    }
    return node;
  }

  // In-order traversal (left, root, right)
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Pre-order traversal (root, left, right)
  preOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Post-order traversal (left, right, root)
  postOrder(node = this.root, result = []) {
    if (node) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }
}

// Example Usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(12);
bst.insert(18);

console.log("In-order traversal:", bst.inOrder()); // [3, 5, 7, 10, 12, 15, 18]
console.log("Pre-order traversal:", bst.preOrder()); // [10, 5, 3, 7, 15, 12, 18]
console.log("Post-order traversal:", bst.postOrder()); // [3, 7, 5, 12, 18, 15, 10]

console.log("Search for 7:", bst.find(7)); // true
console.log("Search for 99:", bst.find(99)); // false

console.log("Min value:", bst.findMin().value); // 3
console.log("Max value:", bst.findMax().value); // 18

bst.remove(15);
console.log("After removing 15:", bst.inOrder()); // [3, 5, 7, 10, 12, 18]

//BST implementation provides efficient O(log n) operations when balanced, but degenerates to O(n) when unbalanced