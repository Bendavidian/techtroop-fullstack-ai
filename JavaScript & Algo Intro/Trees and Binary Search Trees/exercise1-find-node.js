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

  findNode(value) {
    if (this.value === value) return true;
    if (value > this.value) {
      if (this.rightChild) return this.rightChild.findNode(value);
      return false;
    } else {
      if (this.leftChild) return this.leftChild.findNode(value);
      return false;
    }
  }
}

const letters = ["H", "E", "S", "G", "L", "Y", "I"];

const bsTree = new BSNode();
letters.forEach(letter => bsTree.insertNode(letter));

console.log('findNode("H"):', bsTree.findNode("H")); // true
console.log('findNode("G"):', bsTree.findNode("G")); // true
console.log('findNode("Z"):', bsTree.findNode("Z")); // false
console.log('findNode("F"):', bsTree.findNode("F")); // false
console.log('findNode("y"):', bsTree.findNode("y")); // false (case-sensitive)
