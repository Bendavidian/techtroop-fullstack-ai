// Section 5: const declared inside an if block, used outside it
//
// Original code analysis:
//   doesUserExist → global scope (const at top level)
//   users         → local to doesUserExist (const inside the function)
//   u             → local to the for...of loop block
//   found         → block-scoped to the if block only (const inside {})
//
// What will log?
//   Nothing from the original try block.
//   found is declared with const inside the if block.
//   return found tries to read found outside that block.
//   → ReferenceError: found is not defined
//
// Is anything undefined?  No. found simply does not exist outside the if block.

// ─── Original behavior ───────────────────────────────────────────────────────
console.log("=== Original behavior: ===")

try {
  const doesUserExist = function (name) {
    const users = [{ name: "Shapira", age: 19 }, { name: "Lucius", age: 23 }]

    for (let u of users) {
      if (u.name == name) {
        const found = true        // only exists inside this if block
      }
    }

    return found                  // found is not accessible here
  }

  const userExists = doesUserExist("Lucius")
  if (userExists) {
    console.log("We found the ragamuffin!")
  } else {
    console.log("No idea where this person is.")
  }
} catch (e) {
  console.log("Error: " + e.message)
}

// ─── Corrected behavior ──────────────────────────────────────────────────────
// Fix: declare found with let before the loop so the whole function can access it.
console.log("\n=== Corrected behavior: ===")

const doesUserExist = function (name) {
  const users = [{ name: "Shapira", age: 19 }, { name: "Lucius", age: 23 }]
  let found = false               // declared in function scope

  for (let u of users) {
    if (u.name == name) {
      found = true                // reassign (let allows this)
    }
  }

  return found
}

const userExists = doesUserExist("Lucius")
if (userExists) {
  console.log("We found the ragamuffin!")
} else {
  console.log("No idea where this person is.")
}
