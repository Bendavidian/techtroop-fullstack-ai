// Section 1: if block scope, for loop with var, let inside block
//
// Original code analysis:
//   run        → global scope (const at top level)
//   distance   → block-scoped to the if block (let inside {})
//   i          → function/global scope (var inside a block, NOT inside a function)
//
// What will log?
//   "running" × 8  (loop runs while i < 8)
//   "Finished running 8 miles"
//   Then ReferenceError: distance is not defined
//     → distance is declared with let inside the if block.
//       Outside that block it does not exist at all.
//
// Is anything undefined?  No. distance is simply not defined in the outer scope.

// ─── Original behavior ───────────────────────────────────────────────────────
console.log("=== Original behavior: ===")

try {
  const run = true

  if (run) {
    let distance = 8
    for (var i = 0; i < distance; i++) {
      console.log("running")
    }
    console.log("Finished running " + distance + " miles")
  }

  // distance is not accessible here — let is block-scoped to the if block above
  console.log("Damn, you see this gal? She ran " + distance + " miles")
} catch (e) {
  console.log("Error: " + e.message)
}

// ─── Corrected behavior ──────────────────────────────────────────────────────
// Fix: declare distance outside the if block so the final log can reach it.
// Wrapped in {} so the let declaration does not hoist into the try/catch above.
console.log("\n=== Corrected behavior: ===")

{
  const run = true
  let distance = 0          // declared in the outer block scope

  if (run) {
    distance = 8
    for (let i = 0; i < distance; i++) {
      console.log("running")
    }
    console.log("Finished running " + distance + " miles")
  }

  console.log("Damn, you see this gal? She ran " + distance + " miles")
}
