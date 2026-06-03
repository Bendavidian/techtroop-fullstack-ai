// Exercise 2: Bank Module
//
// money is a private variable — it lives in the closure.
// The returned object uses different public names (deposit / showBalance)
// than the internal function names (depositCash / checkBalance).
// This is intentional: the module decides what to expose and under what name.

const Bank = function () {
  let money = 500              // private — never part of the returned object

  const depositCash = function (cash) {
    money += cash
  }

  const checkBalance = function () {
    console.log(money)
  }

  return {
    deposit: depositCash,      // public name differs from private name
    showBalance: checkBalance
  }
}

const bank = Bank()

bank.deposit(200)
bank.deposit(250)

bank.showBalance()             // 950

console.log(bank.money)        // undefined — money is not on the returned object
console.log("bank.money is", bank.money, "— the money variable remains private inside the Bank closure")
