const getBalance = function (bankOperations) {
  let balance = 0
  for (let op of bankOperations) {
    balance += op
  }
  return balance
}

const result = getBalance([-27, -43, -2400, -700, 15000, 58])

console.log("Balance:", result)
console.log("Time complexity: O(n) — the function loops once over all bank operations")
