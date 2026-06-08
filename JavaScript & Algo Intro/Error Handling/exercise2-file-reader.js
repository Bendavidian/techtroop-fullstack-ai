// Exercise 2: File Reader with Error Handling
// Goal: Read files using Node.js fs.readFile and handle different error cases

const fs = require("fs");
const path = require("path");

// Create existing.txt with sample content if it doesn't already exist
const existingFilePath = path.join(__dirname, "existing.txt");
if (!fs.existsSync(existingFilePath)) {
  fs.writeFileSync(existingFilePath, "Hello! This is sample text inside existing.txt.");
}

function readFileWithErrorHandling(filePath, callback) {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (!error) {
      // Success: file was read without any issues
      callback(`File read successfully. Size: ${Buffer.byteLength(data, "utf8")} bytes`);
      return;
    }

    // Check if the path points to a directory instead of a file
    if (error.code === "EISDIR") {
      callback(`Expected a file but received a directory: ${filePath}`);
      return;
    }

    // Check if the file does not exist
    if (error.code === "ENOENT") {
      callback(`File not found: ${path.basename(filePath)}`);
      return;
    }

    // Any other unexpected error
    callback(`Unexpected error: ${error.message}`);
  });
}

// --- Test calls ---

// Test 1: Read a file that exists
readFileWithErrorHandling("existing.txt", console.log);

// Test 2: Read a file that does not exist
readFileWithErrorHandling("missing.txt", console.log);

// Test 3: Pass a directory path instead of a file
readFileWithErrorHandling(".", console.log);
