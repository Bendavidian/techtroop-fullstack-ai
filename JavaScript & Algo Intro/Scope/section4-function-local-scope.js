// Section 4: variable declared inside a function, not returned
//
// Original code analysis:
//   pot       → global scope (const at top level)
//   getSeed   → global scope (const at top level)
//   seed      → local to getSeed only (const inside the function body)
//   plant     → global scope (const at top level)
//
// What will log?
//   Nothing — plant() is called, it calls getSeed() which runs but returns nothing,
//   then plant tries to log seed. seed only exists inside getSeed.
//   → ReferenceError: seed is not defined
//
// Is anything undefined?  No. seed is local to getSeed and is never returned.
// plant has no way to reach into getSeed's local scope.

// ─── Original behavior ───────────────────────────────────────────────────────
console.log("=== Original behavior: ===")

try {
  const pot = "red pot with earth in it"

  const getSeed = function () {
    const seed = "brown seed"    // only exists inside getSeed
  }

  const plant = function () {
    getSeed()
    console.log("Planting the " + seed + " inside a " + pot)   // seed is not here
  }

  plant()
} catch (e) {
  console.log("Error: " + e.message)
}

// ─── Corrected behavior ──────────────────────────────────────────────────────
// Fix: getSeed returns seed, and plant stores the return value in a local variable.
console.log("\n=== Corrected behavior: ===")

const pot = "red pot with earth in it"

const getSeed = function () {
  const seed = "brown seed"
  return seed                    // expose seed to the caller
}

const plant = function () {
  const seed = getSeed()         // capture the returned value
  console.log("Planting the " + seed + " inside a " + pot)
}

plant()
