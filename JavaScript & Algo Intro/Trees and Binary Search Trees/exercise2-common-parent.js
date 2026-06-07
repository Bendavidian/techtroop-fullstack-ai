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

  // Finds the lowest node that is a strict parent of both value1 and value2.
  // When a value equals the current node, we return null so the caller
  // knows to report itself as the common parent.
  findCommonParent(value1, value2) {
    if (this.value === value1 || this.value === value2) {
      return null;
    }

    if (value1 < this.value && value2 < this.value) {
      const sub = this.leftChild.findCommonParent(value1, value2);
      return sub === null ? this.value : sub;
    }

    if (value1 > this.value && value2 > this.value) {
      const sub = this.rightChild.findCommonParent(value1, value2);
      return sub === null ? this.value : sub;
    }

    return this.value;
  }
}

const letters = ["J", "H", "R", "E", "S", "P", "G", "B", "L", "Y", "I"];

const bsTree = new BSNode();
letters.forEach(letter => bsTree.insertNode(letter));

console.log('findCommonParent("B", "I"):', bsTree.findCommonParent("B", "I")); // "H"
console.log('findCommonParent("B", "G"):', bsTree.findCommonParent("B", "G")); // "E"
console.log('findCommonParent("B", "L"):', bsTree.findCommonParent("B", "L")); // "J"
console.log('findCommonParent("L", "Y"):', bsTree.findCommonParent("L", "Y")); // "R"
console.log('findCommonParent("E", "H"):', bsTree.findCommonParent("E", "H")); // "J"
