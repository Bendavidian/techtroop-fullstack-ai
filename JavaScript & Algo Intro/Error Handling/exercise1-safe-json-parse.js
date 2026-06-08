// Exercise 1: Safe JSON Parse
// Goal: Parse a JSON string safely using try-catch

function safeJsonParse(jsonString) {
  try {
    // Attempt to parse the string into a JavaScript object
    const result = JSON.parse(jsonString);
    return result;
  } catch (error) {
    // If parsing fails, return a friendly error message
    return "Invalid JSON format";
  }
}

// --- Tests ---

// Test 1: Valid object string
console.log("Test 1 - Valid object:");
console.log(safeJsonParse('{"name": "John"}'));
// Expected: { name: 'John' }

// Test 2: Invalid JSON string
console.log("\nTest 2 - Invalid JSON:");
console.log(safeJsonParse("invalid json"));
// Expected: "Invalid JSON format"

// Test 3: Valid JSON array
console.log("\nTest 3 - Valid array:");
console.log(safeJsonParse('[1, 2, 3]'));
// Expected: [1, 2, 3]

// Test 4: Empty string (not valid JSON)
console.log("\nTest 4 - Empty string:");
console.log(safeJsonParse(""));
// Expected: "Invalid JSON format"
