// ─── Exercise 1: Factorial ───────────────────────────────────────────────────

const findFactorial = function (n) {
  if (n === 0 || n === 1) return 1
  return n * findFactorial(n - 1)
}

console.log("--- Exercise 1: findFactorial ---")
console.log(findFactorial(5))  // 120
console.log(findFactorial(8))  // 40320
console.log(findFactorial(1))  // 1
console.log(findFactorial(0))  // 1

// ─── Exercise 2: Reverse String ──────────────────────────────────────────────

const reverseString = function (str) {
  if (str.length <= 1) return str
  return str[str.length - 1] + reverseString(str.slice(0, str.length - 1))
}

console.log("\n--- Exercise 2: reverseString ---")
console.log(reverseString("hello"))      // "olleh"
console.log(reverseString("recursion"))  // "noisrucer"
console.log(reverseString("a"))          // "a"
console.log(reverseString(""))           // ""

// ─── Exercise 3: Swap arrays ─────────────────────────────────────────────────

const swap = function (arr1, arr2) {
  if (arr1.length === 0) return
  arr2.push(arr1.shift())
  swap(arr1, arr2)
}

const arr1 = [1, 2, 3]
const arr2 = []
swap(arr1, arr2)

console.log("\n--- Exercise 3: swap ---")
console.log(arr1)  // []
console.log(arr2)  // [1, 2, 3]

// ─── Exercise 3 Extension: Stack-based swap ──────────────────────────────────

class Stack {
  constructor() {
    this._data = []
  }

  push(value) {
    this._data.push(value)
  }

  pop() {
    return this._data.pop()
  }

  isEmpty() {
    return this._data.length === 0
  }

  print() {
    console.log(this._data)
  }
}

const swapStacks = function (stack1, stack2) {
  if (stack1.isEmpty()) return
  stack2.push(stack1.pop())
  swapStacks(stack1, stack2)
}

const stack1 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(3)

const stack2 = new Stack()

swapStacks(stack1, stack2)

console.log("\n--- Exercise 3 Extension: swapStacks ---")
console.log("stack1 after swap:")
stack1.print()   // []
console.log("stack2 after swap:")
stack2.print()   // [3, 2, 1]
