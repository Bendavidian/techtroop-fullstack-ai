// Section 3: function scope, for...of loop scope, no errors
//
// Scope analysis:
//   serveOrders  → global scope (const at top level)
//   allOrders    → global scope (const at top level)
//   orders       → local to serveOrders (function parameter)
//   order        → local to the for...of loop block
//   specialOrder → local to each loop iteration block (let inside {})
//
// What will log?
//   Served a special fish
//   Served a special lettuce plate
//   Served a special curious cheese
//   Finished serving all the orders: fish,lettuce plate,curious cheese
//
// Will there be an error?  No.
// Is anything undefined?   No.
// orders and allOrders are arrays; when concatenated with a string they become
// a comma-separated list via .toString().

// ─── Original code (no changes needed — it already works) ────────────────────
console.log("=== Running serveOrders: ===\n")

const serveOrders = function (orders) {
  for (let order of orders) {
    let specialOrder = "special " + order
    console.log("Served a " + specialOrder)
  }
  console.log("Finished serving all the orders: " + orders)
}

const allOrders = ["fish", "lettuce plate", "curious cheese"]
serveOrders(allOrders)

// ─── Scope analysis output ───────────────────────────────────────────────────
console.log("\n=== Scope analysis: ===")
console.log("serveOrders  → global scope")
console.log("allOrders    → global scope")
console.log("orders       → local to the serveOrders function (parameter)")
console.log("order        → local to the for...of loop block (let)")
console.log("specialOrder → local to each iteration block (let)")
console.log("No errors. No undefined values.")
