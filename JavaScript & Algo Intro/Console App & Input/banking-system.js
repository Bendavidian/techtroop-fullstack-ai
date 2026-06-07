const prompt = require("prompt-sync")();

let balance = 100;

function displayMenu() {
  console.log("\n=== Banking System ===");
  console.log("1. Check Balance");
  console.log("2. Deposit Money");
  console.log("3. Withdraw Money");
  console.log("4. Exit");
}

while (true) {
  displayMenu();
  const choice = prompt("Choose an option (1-4): ");

  if (choice === null || choice === "4") {
    console.log("Thank you for using the Banking System. Goodbye!");
    break;
  }

  if (choice === "1") {
    console.log(`Current balance: $${balance}`);
  } else if (choice === "2") {
    const amount = Number(prompt("Enter deposit amount: "));
    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid amount. Please enter a positive number.");
    } else {
      balance += amount;
      console.log(`Successfully deposited $${amount}. New balance: $${balance}`);
    }
  } else if (choice === "3") {
    const amount = Number(prompt("Enter withdrawal amount: "));
    if (isNaN(amount) || amount <= 0) {
      console.log("Invalid amount. Please enter a positive number.");
    } else if (amount > balance) {
      console.log(`Insufficient funds. Current balance: $${balance}`);
    } else {
      balance -= amount;
      console.log(`Successfully withdrew $${amount}. New balance: $${balance}`);
    }
  } else {
    console.log("Invalid option. Please choose 1, 2, 3, or 4.");
  }
}
