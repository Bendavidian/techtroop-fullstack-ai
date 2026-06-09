# AutoComplete Trie Project

Console-based autocomplete application using a Trie data structure.

## What is a Trie?

A Trie (pronounced "try") is a tree-like data structure that stores strings efficiently:
* Each node represents one character.
* The root node is empty.
* Each path from root to leaf can form a word.
* Perfect for prefix-based searches.
* Searching a word or prefix is **O(m)**, where *m* is the length of the string, making it highly efficient.

---

## Folder Structure

```text
JavaScript & Algo Intro/AutoComplete Trie Project/
├── package.json
├── AutoCompleteTrie.js
├── AutoCompleteTrie.test.js
├── index.js
├── README.md
└── .gitignore
```

---

## Installation

To install dependencies, run the following command in this directory:

```bash
npm install
```

---

## Running the App

To start the interactive console application:

```bash
npm start
```

---

## Running Tests

To run the unit test suite:

```bash
npm test
```

---

## Commands

* **`add <word>`**        - Add a word to the dictionary (case-insensitive).
* **`find <word>`**       - Check if the complete word exists in the dictionary.
* **`complete <prefix>`** - Get all autocomplete recommendations matching the prefix.
* **`use <word>`**        - Record/increment the usage count of an existing word (increases suggestion rank).
* **`help`**              - Display the command list menu.
* **`exit`**              - Quit the console application.

---

## Example Console Session

```text
=== AutoComplete Trie Console ===
Type 'help' for commands

> add cat
✓ Added 'cat' to dictionary

> add car
✓ Added 'car' to dictionary

> add card
✓ Added 'card' to dictionary

> complete ca
Suggestions for 'ca': car (0), card (0), cat (0)

> find cat
✓ 'cat' exists in dictionary

> find dog
✗ 'dog' not found in dictionary

> use cat
✓ Incremented usage for 'cat' (now 1)

> use cat
✓ Incremented usage for 'cat' (now 2)

> complete ca
Suggestions for 'ca': cat (2), car (0), card (0)

> help
Commands:
  add <word>        - Add word to dictionary
  find <word>       - Check if word exists
  complete <prefix> - Get completions
  use <word>        - Increment usage count
  help              - Show this message
  exit              - Quit program

> exit
Goodbye!
```

---

## Explanation of Main Methods

### `addWord(word)`
Converts the string to lowercase and traverses the tree, adding nodes for any characters that do not already exist. Reuses existing nodes from other words sharing the same prefix path. Sets the `endOfWord` flag to true on the final node.

### `findWord(word)`
Checks if the given string (case-insensitive) exists as a completed word in the Trie. Traverses the characters of the word and returns `true` only if the final node has `endOfWord` set to true.

### `predictWords(prefix)`
Converts the prefix to lowercase, navigates to the end of the prefix path, and recursively collects all words originating from that branch. Returns recommendations sorted by their usage frequency (descending) and alphabetically for equal-frequency items.

### `useWord(word)`
Finds the word in the dictionary and increments its frequency counter by 1. Returns a success message with the updated usage count or a failure message if the word is not in the dictionary.

### `_getRemainingTree(prefix, node)`
Internal helper that traverses the children nodes from the given starting node matching each character of the prefix. Returns the final node of the path, or `null` if any character path does not exist.

### `_allWordsHelper(prefix, node, allWords)`
Recursive internal helper that traverses all child branches of the current node, compiling potential words, and pushes them into the output array when an `endOfWord` is matched.

---

## Testing Summary

The unit test suite inside `AutoCompleteTrie.test.js` covers:
* All public APIs (`addWord`, `findWord`, `predictWords`, `useWord`).
* Internal helper methods (`_getRemainingTree` and `_allWordsHelper`).
* Word lowercase conversions and invalid inputs/edge cases.
* Ranked suggestion priorities based on usage frequencies.
