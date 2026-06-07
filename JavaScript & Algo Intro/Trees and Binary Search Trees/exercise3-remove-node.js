class BSNode {
  constructor(value) {
    this.value = value || null;
    this.leftChild = null;
    this.rightChild = null;
  }

  insertNode(newVal) {
    if (!this.value) {
      this.value = newVal;
      return;
    }
    if (newVal > this.value) {
      if (this.rightChild) {
        this.rightChild.insertNode(newVal);
      } else {
        this.rightChild = new BSNode(newVal);
      }
    } else {
      if (this.leftChild) {
        this.leftChild.insertNode(newVal);
      } else {
        this.leftChild = new BSNode(newVal);
      }
    }
  }

  // Returns the largest value in this subtree (rightmost node).
  findMaxNode() {
    if (this.rightChild) {
      return this.rightChild.findMaxNode();
    }
    return this.value;
  }

  // Removes the node with the given value and returns the root of the tree.
  // parent: the node that called this method (used to update child references).
  removeNode(parent, value) {
    if (value > this.value) {
      if (this.rightChild) {
        return this.rightChild.removeNode(this, value);
      }
    } else if (value < this.value) {
      if (this.leftChild) {
        return this.leftChild.removeNode(this, value);
      }
    } else {
      // Found the node to delete.

      if (this.leftChild && this.rightChild) {
        // Case 3: two children.
        // Replace this node's value with the max of the left subtree,
        // then remove that max node from the left subtree.
        const maxVal = this.leftChild.findMaxNode();
        this.value = maxVal;
        this.leftChild.removeNode(this, maxVal);
      } else {
        // Case 1 (no children) or Case 2 (one child).
        // Replace the parent's reference to this node with this node's only child (or null).
        const child = this.leftChild || this.rightChild;
        if (parent.leftChild === this) {
          parent.leftChild = child;
        } else if (parent.rightChild === this) {
          parent.rightChild = child;
        }
      }
    }

    return parent;
  }
}

const numbers = [8, 9, 12, 3, 5, 1, 11, 4];

let nodeWithOneChild = new BSNode();
numbers.forEach(n => nodeWithOneChild.insertNode(n));
console.log("Tree after removing 9 (node with one child):");
console.log(nodeWithOneChild.removeNode(nodeWithOneChild, 9));

let nodeWithTwoChildren = new BSNode();
numbers.forEach(n => nodeWithTwoChildren.insertNode(n));
console.log("\nTree after removing 8 (root with two children):");
console.log(nodeWithTwoChildren.removeNode(nodeWithTwoChildren, 8));
