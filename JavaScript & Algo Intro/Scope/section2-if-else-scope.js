// Section 2: let declared in one branch, accessed in another branch
//
// Original code analysis:
//   cowSound → block-scoped to the if block only (let inside {})
//
// What will log?
//   Nothing — the if condition (13 == "space") is false, so the if block never runs.
//   The else block tries to log cowSound, but cowSound was declared with let
//   inside the if block. It does not exist in the else scope.
//   → ReferenceError: cowSound is not defined
//
// Is anything undefined?  No. cowSound was never created at all in this scope.

// ─── Original behavior ───────────────────────────────────────────────────────
console.log("=== Original behavior: ===")

try {
  if (13 == "space") {
    let cowSound = "moo"           // only lives inside this if block
  } else {
    console.log("Cow says " + cowSound)   // cowSound does not exist here
  }
} catch (e) {
  console.log("Error: " + e.message)
}

// ─── Corrected behavior ──────────────────────────────────────────────────────
// Fix: declare cowSound before the if/else so both branches can access it.
// Wrapped in {} so the let declaration does not hoist into the try/catch above.
console.log("\n=== Corrected behavior: ===")

{
  let cowSound = ""          // declared in the outer block scope

  if (13 == "space") {
    cowSound = "moo"
  } else {
    cowSound = "moo"         // cow always says moo regardless of this condition
    console.log("Cow says " + cowSound)
  }
}
