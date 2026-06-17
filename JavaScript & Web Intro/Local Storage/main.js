// ─────────────────────────────────────────────────────────────────────────────
// Wisdom Saver — main.js
//
// Demonstrates:
//   localStorage.setItem / getItem / removeItem
//   JSON.stringify / JSON.parse
//   Persisting data after page refresh
//   DOM manipulation without innerHTML
// ─────────────────────────────────────────────────────────────────────────────

// The key we use for all localStorage read/write operations
const STORAGE_KEY = "wisdom";

// ─── Load saved wisdom on page load ──────────────────────────────────────────
// Safe fallback: if localStorage has nothing yet, default to an empty array
// so we never pass null into JSON.parse.
let wisdom = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// Track any pending auto-hide timer for messages
let messageTimer = null;

// ─── DOM references ───────────────────────────────────────────────────────────
const wisdomInput = document.querySelector("#wisdom-input");
const addBtn      = document.querySelector("#add-btn");
const clearBtn    = document.querySelector("#clear-btn");
const messageEl   = document.querySelector("#message");
const wisdomList  = document.querySelector("#wisdom-list");

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Show a coloured message that disappears after 3 seconds
function showMessage(text, type) {
  if (messageTimer) clearTimeout(messageTimer);

  messageEl.textContent = text;
  messageEl.className = "message " + type;

  messageTimer = setTimeout(function () {
    messageEl.className = "message hidden";
    messageEl.textContent = "";
    messageTimer = null;
  }, 3000);
}

// Save the current wisdom array to localStorage as a JSON string
function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wisdom));
}

// Re-draw the entire wisdom list from the current array
function renderWisdom() {
  // replaceChildren() removes all child nodes — no innerHTML needed
  wisdomList.replaceChildren();

  if (wisdom.length === 0) {
    var empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No wisdom yet. Add your first one!";
    wisdomList.appendChild(empty);
    return;
  }

  wisdom.forEach(function (item) {
    // ── Outer card ──
    var div = document.createElement("div");
    div.className = "wisdom-item";
    div.dataset.id = item.id;

    // ── Wisdom text ──
    var span = document.createElement("span");
    span.className = "wisdom-text";
    span.textContent = item.text;

    // ── Delete button ──
    var delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "×";
    delBtn.setAttribute("aria-label", "Delete this wisdom");

    // Capture item.id in the closure so the click knows which item to remove
    delBtn.addEventListener("click", function () {
      deleteWisdom(item.id);
    });

    div.appendChild(span);
    div.appendChild(delBtn);
    wisdomList.appendChild(div);
  });
}

// ─── Add Wisdom ───────────────────────────────────────────────────────────────

function addWisdom() {
  var text = wisdomInput.value.trim();

  // Validation: empty input
  if (text === "") {
    showMessage("✗ Cannot add empty wisdom", "error");
    return;
  }

  // Create the wisdom object
  var item = {
    id:   Date.now(),   // simple unique ID based on timestamp
    text: text
  };

  // Push into the array and clear the input
  wisdom.push(item);
  wisdomInput.value = "";

  // Save only on every even wisdom.length (demonstrates controlled persistence)
  if (wisdom.length % 2 === 0) {
    saveToStorage();
  }

  // Re-render the list to show the new item
  renderWisdom();
}

// ─── Clear All Wisdom ─────────────────────────────────────────────────────────

function clearWisdom() {
  // Remove the key from localStorage entirely
  localStorage.removeItem(STORAGE_KEY);

  // Empty the in-memory array
  wisdom = [];

  // Update the UI
  renderWisdom();
  showMessage("✓ All wisdom cleared", "success");
}

// ─── Delete Single Item ───────────────────────────────────────────────────────

function deleteWisdom(id) {
  // Keep every item whose id does NOT match the one we want to remove
  wisdom = wisdom.filter(function (item) { return item.id !== id; });

  // Always save immediately after a deletion
  saveToStorage();

  // Re-render and notify
  renderWisdom();
  showMessage("✓ Wisdom deleted", "success");
}

// ─── Event Listeners ──────────────────────────────────────────────────────────

addBtn.addEventListener("click", addWisdom);

// Also trigger Add on Enter key
wisdomInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addWisdom();
});

clearBtn.addEventListener("click", clearWisdom);

// ─── Initial render ───────────────────────────────────────────────────────────
// Runs once on page load — shows any wisdom that was loaded from localStorage
renderWisdom();
