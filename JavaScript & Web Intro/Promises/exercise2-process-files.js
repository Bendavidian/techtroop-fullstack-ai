// Exercise 2 – Process Files
// Demonstrates Promise.all() (fail-fast) and Promise.allSettled() (process everything).

function processFile(filename, processingTime) {
  return new Promise(function (resolve, reject) {
    console.log(`Starting to process ${filename}...`);

    setTimeout(function () {
      if (Math.random() < 0.15) {
        reject(new Error(`Failed to process ${filename}`));
      } else {
        var result = {
          filename: filename,
          size: Math.floor(Math.random() * 1000) + 100,
          processedAt: new Date().toLocaleTimeString()
        };

        console.log(`✓ Completed ${filename}`);
        resolve(result);
      }
    }, processingTime);
  });
}

var files = [
  { name: "document1.pdf", time: 2000 },
  { name: "image1.jpg",    time: 1500 },
  { name: "data.csv",      time: 3000 },
  { name: "report.docx",   time: 1000 }
];

// --- Promise.all(): all files must succeed ---

console.log("=== Promise.all ===");
var startAll = Date.now();

var promises = files.map(function (file) {
  return processFile(file.name, file.time);
});

Promise.all(promises)
  .then(function (results) {
    var elapsed = ((Date.now() - startAll) / 1000).toFixed(2);
    console.log("\nAll files processed in", elapsed + "s");
    results.forEach(function (r) {
      console.log(`  ${r.filename} — ${r.size} KB — processed at ${r.processedAt}`);
    });

    // --- Bonus: Promise.allSettled() ---
    runAllSettled();
  })
  .catch(function (error) {
    console.log("\nPromise.all failed:", error.message);
    console.log("(at least one file could not be processed)");

    // Still run the bonus even when Promise.all fails
    runAllSettled();
  });

// --- Bonus: Promise.allSettled(): never stops on failure ---

function runAllSettled() {
  console.log("\n=== Promise.allSettled (Bonus) ===");
  var startSettled = Date.now();

  var settledPromises = files.map(function (file) {
    return processFile(file.name, file.time);
  });

  Promise.allSettled(settledPromises).then(function (results) {
    var elapsed = ((Date.now() - startSettled) / 1000).toFixed(2);
    console.log("\nAll settled in", elapsed + "s");

    var succeeded = results.filter(function (r) { return r.status === "fulfilled"; });
    var failed    = results.filter(function (r) { return r.status === "rejected"; });

    console.log("\nSuccessful files (" + succeeded.length + "):");
    succeeded.forEach(function (r) {
      console.log(`  ✓ ${r.value.filename} — ${r.value.size} KB`);
    });

    console.log("\nFailed files (" + failed.length + "):");
    failed.forEach(function (r) {
      console.log(`  ✗ ${r.reason.message}`);
    });
  });
}
