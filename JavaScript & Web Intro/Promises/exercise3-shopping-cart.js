// Exercise 3 – Shopping Cart
// Demonstrates a real-world promise chain: inventory → totals → payment → stock update.

var inventory = {
  laptop:   { price: 999, stock: 5 },
  mouse:    { price: 25,  stock: 10 },
  keyboard: { price: 75,  stock: 0 },
  monitor:  { price: 299, stock: 3 }
};

// Step 1 – verify all items exist and are in stock
function checkInventory(items) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      for (var i = 0; i < items.length; i++) {
        var name = items[i];

        if (!inventory[name]) {
          reject(new Error(`Item "${name}" does not exist in inventory`));
          return;
        }

        if (inventory[name].stock === 0) {
          reject(new Error(`Item "${name}" is out of stock`));
          return;
        }
      }

      resolve(items);
    }, 500);
  });
}

// Step 2 – calculate subtotal, tax, and total
function calculateTotal(items) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var subtotal = items.reduce(function (sum, name) {
        return sum + inventory[name].price;
      }, 0);

      var tax   = parseFloat((subtotal * 0.08).toFixed(2));
      var total = parseFloat((subtotal + tax).toFixed(2));

      resolve({ items: items, subtotal: subtotal, tax: tax, total: total });
    }, 200);
  });
}

// Step 3 – simulate payment (90% success rate)
function processPayment(amount) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (Math.random() < 0.1) {
        reject(new Error("Payment failed"));
        return;
      }

      resolve({
        transactionId: "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: amount,
        status: "success"
      });
    }, 1500);
  });
}

// Step 4 – reduce stock by 1 for each purchased item
function updateInventory(items) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      items.forEach(function (name) {
        inventory[name].stock -= 1;
      });

      var updatedStatus = {};
      items.forEach(function (name) {
        updatedStatus[name] = { remaining: inventory[name].stock };
      });

      resolve(updatedStatus);
    }, 300);
  });
}

// Full checkout pipeline built with .then() chaining
function checkout(itemNames) {
  var cartItems;    // saved between steps so later steps can reference them
  var orderPayment;

  return checkInventory(itemNames)
    .then(function (items) {
      cartItems = items;
      console.log("✓ Inventory check passed for:", items.join(", "));
      return calculateTotal(items);
    })
    .then(function (totals) {
      console.log(`✓ Total calculated — subtotal: $${totals.subtotal}, tax: $${totals.tax}, total: $${totals.total}`);
      return processPayment(totals.total);
    })
    .then(function (payment) {
      orderPayment = payment;
      console.log("✓ Payment successful — transaction:", payment.transactionId);
      return updateInventory(cartItems);
    })
    .then(function (updatedInventory) {
      console.log("✓ Inventory updated");
      return {
        message: "Checkout completed successfully",
        items: cartItems,
        payment: orderPayment,
        inventory: updatedInventory
      };
    });
}

// --- Test cases ---

console.log("--- Order 1: laptop + mouse ---");
checkout(["laptop", "mouse"])
  .then(function (result) { console.log("Order success:", result); })
  .catch(function (error) { console.log("Order failed:", error.message); });

// Small delay so output groups are easier to read
setTimeout(function () {
  console.log("\n--- Order 2: laptop + keyboard (keyboard is out of stock) ---");
  checkout(["laptop", "keyboard"])
    .then(function (result) { console.log("Order success:", result); })
    .catch(function (error) { console.log("Order failed:", error.message); });
}, 100);

setTimeout(function () {
  console.log("\n--- Order 3: monitor + mouse + laptop ---");
  checkout(["monitor", "mouse", "laptop"])
    .then(function (result) { console.log("Order success:", result); })
    .catch(function (error) { console.log("Order failed:", error.message); });
}, 200);
