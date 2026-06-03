// Section 6: reassigning a const variable from inside a function
//
// Original code analysis:
//   isEnough   → global scope, declared with const
//   makeEnough → global scope (const at top level)
//   i          → local to the for loop block (let)
//
// What will log?
//   Nothing before the error.
//   When i reaches 6 (i > 5), the function tries to assign isEnough = true.
//   isEnough was declared with const, so reassignment is forbidden.
//   → TypeError: Assignment to constant variable.
//   The if/else after makeEnough() never runs.
//
// Is anything undefined?  No. isEnough is defined as false; the problem is
// that const prevents it from being changed.

// ─── Original behavior ───────────────────────────────────────────────────────
console.log("=== Original behavior: ===")

try {
  const isEnough = false

  const makeEnough = function () {
    for (let i = 0; i < 10; i++) {
      if (i > 5) {
        isEnough = true            // TypeError: const cannot be reassigned
      }
    }
  }

  makeEnough()

  if (isEnough) {
    console.log("Finally, sheesh")
  } else {
    console.log("Here we go again...")
  }
} catch (e) {
  console.log("Error: " + e.message)
}

// ─── Corrected behavior ──────────────────────────────────────────────────────
// Fix: declare isEnough with let instead of const so it can be reassigned.
console.log("\n=== Corrected behavior: ===")

let isEnough = false               // let allows reassignment

const makeEnough = function () {
  for (let i = 0; i < 10; i++) {
    if (i > 5) {
      isEnough = true
    }
  }
}

makeEnough()

if (isEnough) {
  console.log("Finally, sheesh")
} else {
  console.log("Here we go again...")
}
