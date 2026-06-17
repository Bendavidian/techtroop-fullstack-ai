// Exercise 1 – Lucky Number
// Demonstrates the basic Promise constructor, resolve, reject, and .then()/.catch() chaining.

function checkLuckyNumber(num) {
  return new Promise(function (resolve, reject) {
    // Reject immediately for invalid input (no need to wait)
    if (num <= 0) {
      reject(new Error("Invalid number"));
      return;
    }

    setTimeout(function () {
      if (num % 7 === 0) {
        resolve("Lucky!");
      } else {
        resolve("Not lucky");
      }
    }, 800);
  });
}

// --- Test cases ---

console.log("Checking 14 (divisible by 7)...");
checkLuckyNumber(14)
  .then(function (result) {
    console.log("14 →", result); // Expected: Lucky!
  })
  .catch(function (error) {
    console.log("14 → Error:", error.message);
  });

console.log("Checking 10 (not divisible by 7)...");
checkLuckyNumber(10)
  .then(function (result) {
    console.log("10 →", result); // Expected: Not lucky
  })
  .catch(function (error) {
    console.log("10 → Error:", error.message);
  });

console.log("Checking 0 (invalid)...");
checkLuckyNumber(0)
  .then(function (result) {
    console.log("0 →", result);
  })
  .catch(function (error) {
    console.log("0 → Error:", error.message); // Expected: Invalid number
  });

console.log("Checking -5 (invalid)...");
checkLuckyNumber(-5)
  .then(function (result) {
    console.log("-5 →", result);
  })
  .catch(function (error) {
    console.log("-5 → Error:", error.message); // Expected: Invalid number
  });
