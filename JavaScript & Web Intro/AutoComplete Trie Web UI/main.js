// ─────────────────────────────────────────────────────────────────────────────
// AutoCompleteTrie class
// Source: JavaScript & Algo Intro/AutoComplete Trie Project/AutoCompleteTrie.js
// Only change from the original: removed `module.exports` (Node-only).
// ─────────────────────────────────────────────────────────────────────────────

class AutoCompleteTrie {
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
    this.frequency = 0;
  }

  addWord(word) {
    if (typeof word !== "string" || word.length === 0) return "Invalid word";
    const cleanWord = word.toLowerCase();
    let current = this;
    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (!current.children[char]) {
        current.children[char] = new AutoCompleteTrie(char);
      }
      current = current.children[char];
    }
    current.endOfWord = true;
    return `Added '${cleanWord}' to dictionary`;
  }

  findWord(word) {
    if (typeof word !== "string" || word.length === 0) return false;
    const cleanWord = word.toLowerCase();
    let current = this;
    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return current.endOfWord;
  }

  predictWords(prefix) {
    if (typeof prefix !== "string" || prefix.length === 0) return [];
    const cleanPrefix = prefix.toLowerCase();
    const startNode = this._getRemainingTree(cleanPrefix, this);
    if (!startNode) return [];
    const allWords = [];
    this._allWordsHelper(cleanPrefix, startNode, allWords);
    allWords.sort(function (a, b) {
      if (b.frequency !== a.frequency) return b.frequency - a.frequency;
      return a.word.localeCompare(b.word);
    });
    return allWords.map(function (item) { return item.word; });
  }

  useWord(word) {
    if (typeof word !== "string" || word.length === 0) return;
    const cleanWord = word.toLowerCase();
    const node = this._getRemainingTree(cleanWord, this);
    if (node && node.endOfWord) node.frequency += 1;
  }

  _getRemainingTree(prefix, node) {
    let current = node;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!current.children[char]) return null;
      current = current.children[char];
    }
    return current;
  }

  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) allWords.push({ word: prefix, frequency: node.frequency });
    for (const char in node.children) {
      this._allWordsHelper(prefix + char, node.children[char], allWords);
    }
  }
}

// ─── App state ────────────────────────────────────────────────────────────────

const trie = new AutoCompleteTrie();
let wordCount = 0;
let messageTimer = null;

// ─── DOM references ───────────────────────────────────────────────────────────

const addInput        = document.querySelector("#add-input");
const addBtn          = document.querySelector("#add-btn");
const addMessage      = document.querySelector("#add-message");
const searchInput     = document.querySelector("#search-input");
const suggestionsList = document.querySelector("#suggestions-list");
const wordCountEl     = document.querySelector("#word-count");

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Displays a coloured message under the add-word input, auto-hides after 3 s.
function showMessage(text, type) {
  if (messageTimer) clearTimeout(messageTimer);

  addMessage.textContent = text;
  addMessage.className = "message " + type;

  messageTimer = setTimeout(function () {
    addMessage.className = "message hidden";
    addMessage.textContent = "";
    messageTimer = null;
  }, 3000);
}

// Builds one <li> for the dropdown.
// The matched prefix is wrapped in a <span class="highlight"> for visual emphasis.
function createSuggestionItem(word, prefix) {
  const li = document.createElement("li");

  const matchLen = prefix.length;

  // Highlighted (typed) part
  const highlighted = document.createElement("span");
  highlighted.className = "highlight";
  highlighted.textContent = word.slice(0, matchLen);

  // Remaining part
  const rest = document.createTextNode(word.slice(matchLen));

  li.appendChild(highlighted);
  li.appendChild(rest);

  // Clicking fills the search box and bumps the word's frequency
  li.addEventListener("click", function () {
    searchInput.value = word;
    trie.useWord(word);
    hideSuggestions();
  });

  return li;
}

// Empties and hides the dropdown.
function hideSuggestions() {
  while (suggestionsList.firstChild) {
    suggestionsList.removeChild(suggestionsList.firstChild);
  }
  suggestionsList.classList.add("hidden");
}

// Populates and shows the dropdown (or hides it when the list is empty).
function showSuggestions(words, prefix) {
  // Always clear stale items first
  while (suggestionsList.firstChild) {
    suggestionsList.removeChild(suggestionsList.firstChild);
  }

  if (words.length === 0) {
    suggestionsList.classList.add("hidden");
    return;
  }

  words.forEach(function (word) {
    suggestionsList.appendChild(createSuggestionItem(word, prefix));
  });

  suggestionsList.classList.remove("hidden");
}

// ─── Event: Add Word button ───────────────────────────────────────────────────

addBtn.addEventListener("click", function () {
  const raw = addInput.value.trim().toLowerCase();

  if (raw === "") {
    showMessage("✗ Cannot add empty word", "error");
    return;
  }

  if (trie.findWord(raw)) {
    showMessage("✗ Word already exists", "error");
    addInput.value = "";
    return;
  }

  trie.addWord(raw);
  wordCount += 1;
  wordCountEl.textContent = wordCount;

  showMessage("✓ Added '" + raw + "' to dictionary", "success");
  addInput.value = "";
});

// Allow pressing Enter inside the add-word input
addInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") addBtn.click();
});

// ─── Event: Live search ───────────────────────────────────────────────────────

searchInput.addEventListener("input", function () {
  const prefix = searchInput.value.trim();

  if (prefix === "") {
    hideSuggestions();
    return;
  }

  const suggestions = trie.predictWords(prefix);
  showSuggestions(suggestions, prefix.toLowerCase());
});

// Close the dropdown when the user clicks anywhere outside the search area
document.addEventListener("click", function (event) {
  if (!event.target.closest(".search-wrapper")) {
    hideSuggestions();
  }
});
