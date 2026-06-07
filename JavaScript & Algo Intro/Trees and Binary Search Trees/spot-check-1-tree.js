class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }

  // If no left child, create one. If a left child already exists,
  // insert the new node between this node and the existing left child.
  insertLeft(value) {
    if (!this.leftChild) {
      this.leftChild = new Node(value);
    } else {
      const newNode = new Node(value);
      newNode.leftChild = this.leftChild;
      this.leftChild = newNode;
    }
  }

  // Same logic as insertLeft, mirrored for the right side.
  insertRight(value) {
    if (!this.rightChild) {
      this.rightChild = new Node(value);
    } else {
      const newNode = new Node(value);
      newNode.rightChild = this.rightChild;
      this.rightChild = newNode;
    }
  }
}

//          H
//        /   \
//       E     S
//        \   / \
//         G L   Y
//          /
//         I

const root = new Node("H");

root.insertLeft("E");
root.insertRight("S");

root.leftChild.insertRight("G");

root.rightChild.insertLeft("L");
root.rightChild.insertRight("Y");

root.rightChild.leftChild.insertLeft("I");

console.log(root);
