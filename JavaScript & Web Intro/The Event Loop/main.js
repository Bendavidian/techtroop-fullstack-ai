// ─────────────────────────────────────────────
//  Utility helpers
// ─────────────────────────────────────────────

// Appends a line to the visible #log area on the page.
function log(message) {
  const logEl = document.getElementById("log");

  // Remove the placeholder text on first real message
  const placeholder = logEl.querySelector(".log-placeholder");
  if (placeholder) placeholder.remove();

  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent = message;
  logEl.appendChild(line);

  // Auto-scroll to the newest line
  logEl.scrollTop = logEl.scrollHeight;
}

function clearLog() {
  const logEl = document.getElementById("log");
  logEl.innerHTML = '<span class="log-placeholder">Click a button above to see output here…</span>';
}

// Adds a visual separator between example runs
function logSeparator(title) {
  const logEl = document.getElementById("log");
  const placeholder = logEl.querySelector(".log-placeholder");
  if (placeholder) placeholder.remove();

  const sep = document.createElement("div");
  sep.className = "log-separator";
  sep.textContent = `── ${title} ──`;
  logEl.appendChild(sep);
  logEl.scrollTop = logEl.scrollHeight;
}


// ─────────────────────────────────────────────
//  1. CALL STACK EXAMPLE
//  Shows the order in which functions are pushed
//  onto and popped off the call stack.
// ─────────────────────────────────────────────

function runCallStackExample() {
  logSeparator("Call Stack Example");

  // Each function calls the next — they stack up,
  // then unwind in reverse order.
  function third() {
    log("  third() → running (top of the stack)");
    log("  third() → returning (popped off the stack)");
  }

  function second() {
    log("  second() → running, now calling third()");
    third();
    log("  second() → returning (popped off the stack)");
  }

  function first() {
    log("  first() → running, now calling second()");
    second();
    log("  first() → returning (popped off the stack)");
  }

  log("Call Stack: [ ]  ← empty to start");
  log("Calling first()…");
  log("Call Stack: [ first ]");
  first();
  log("Call Stack: [ ]  ← empty again after all returns");
  log("✓ Done. Functions run synchronously, one at a time.");
}


// ─────────────────────────────────────────────
//  2. BLOCKING CODE EXAMPLE
//  A synchronous busy-wait blocks the entire thread.
//  Nothing else can run — not even UI updates.
// ─────────────────────────────────────────────

// Simulates heavy synchronous work by spinning in a loop.
// WARNING: this intentionally freezes the browser briefly.
function pause(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // busy-wait — the CPU is doing nothing useful,
    // but the call stack is occupied so nothing else runs.
  }
}

function runBlockingExample() {
  logSeparator("Blocking Code Example");

  function firstFunc() {
    log("  firstFunc() → START (blocking for 2 seconds…)");
    pause(2000); // The browser will be unresponsive here!
    log("  firstFunc() → END (2-second block finished)");
  }

  function secondFunc() {
    log("  secondFunc() → running (had to wait for firstFunc to finish)");
  }

  log("Starting blocking demo…");
  log("⚠️  The page may freeze for ~2 seconds — that is the point!");
  firstFunc();
  secondFunc(); // cannot start until firstFunc fully returns
  log("✓ Done. Blocking code forces everything to wait.");
}


// ─────────────────────────────────────────────
//  3. ASYNC / setTimeout EXAMPLE
//  setTimeout hands the timer to the browser's
//  Web API. JS keeps running; the callback arrives
//  later via the Callback Queue.
// ─────────────────────────────────────────────

function runAsyncExample() {
  logSeparator("Async setTimeout Example");

  function firstFunc() {
    log("  firstFunc() → scheduling a 2-second timer with setTimeout…");

    // setTimeout is a Web API call — the browser manages the timer.
    // JavaScript does NOT wait here; it moves on immediately.
    setTimeout(function timerCallback() {
      log("  ⏰  timerCallback() → executed AFTER 2 seconds");
      log("      (came from Callback Queue → moved by Event Loop)");
    }, 2000);

    log("  firstFunc() → returned immediately (timer is still counting)");
  }

  function secondFunc() {
    log("  secondFunc() → running BEFORE the timer fires!");
  }

  log("Notice that secondFunc runs before the setTimeout callback.");
  firstFunc();
  secondFunc();
  log("✓ Synchronous code is done. Waiting for the timer…");
}


// ─────────────────────────────────────────────
//  4. EVENT LOOP EXAMPLE
//  Full walkthrough of the entire lifecycle:
//  Global code → Web API → Callback Queue → Event Loop → Call Stack
// ─────────────────────────────────────────────

function runEventLoopExample() {
  logSeparator("Event Loop Example");

  // Step 1 — Global code starts executing synchronously.
  log("1. Global code starts");

  // Step 2 — setTimeout is called.
  //   • The callback is handed to the browser's Timer Web API.
  //   • The call stack is NOT blocked; JS continues immediately.
  log("2. setTimeout() called → timer handed off to Web API (not the call stack)");
  setTimeout(function eventLoopCallback() {
    // Step 5 — When the timer expires the callback enters the Callback Queue.
    //   • The Event Loop sees: stack is empty + queue has a callback.
    //   • It moves the callback onto the call stack to run.
    log("5. ⏰  setTimeout callback → Event Loop moved it from Callback Queue to Call Stack");
    log("   Call Stack is now: [ eventLoopCallback ]");
    log("   Running callback… done. Stack is empty again.");
  }, 0); // 0 ms still goes async — it must wait for the stack to clear!

  // Step 3 — Execution continues without waiting.
  log("3. Global code continues (setTimeout did not block)");

  // Step 4 — Global code finishes; call stack becomes empty.
  log("4. Global code ends → Call Stack is now EMPTY");
  log("   Event Loop checks Callback Queue… found a callback!");
  log("   (The '5.' line will appear next)");
}
