class AutoCompleteTrie {
  /**
   * Initializes a Trie node.
   * @param {string} value The character stored in the node.
   */
  constructor(value = "") {
    this.value = value;
    this.children = {};
    this.endOfWord = false;
    this.frequency = 0;
  }

  /**
   * Adds a word to the trie.
   * @param {string} word The word to add.
   * @returns {string} Success or failure message.
   */
  addWord(word) {
    if (typeof word !== "string" || word.length === 0) {
      return "Invalid word";
    }

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

  /**
   * Checks if a complete word exists in the trie.
   * @param {string} word The word to search for.
   * @returns {boolean} True if the word exists, false otherwise.
   */
  findWord(word) {
    if (typeof word !== "string" || word.length === 0) {
      return false;
    }

    const cleanWord = word.toLowerCase();
    let current = this;

    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (!current.children[char]) {
        return false;
      }
      current = current.children[char];
    }

    return current.endOfWord;
  }

  /**
   * Predicts words starting with the prefix.
   * Sorted by frequency (descending), then alphabetically.
   * @param {string} prefix The prefix to search for.
   * @returns {string[]} An array of autocomplete suggestions.
   */
  predictWords(prefix) {
    if (typeof prefix !== "string" || prefix.length === 0) {
      return [];
    }

    const cleanPrefix = prefix.toLowerCase();
    const startNode = this._getRemainingTree(cleanPrefix, this);

    if (!startNode) {
      return [];
    }

    const allWords = [];
    this._allWordsHelper(cleanPrefix, startNode, allWords);

    // Sort by frequency (highest to lowest), then alphabetically
    allWords.sort((a, b) => {
      if (b.frequency !== a.frequency) {
        return b.frequency - a.frequency;
      }
      return a.word.localeCompare(b.word);
    });

    return allWords.map(item => item.word);
  }

  /**
   * Helper: Navigates to the node where the prefix path ends.
   * @param {string} prefix
   * @param {AutoCompleteTrie} node
   * @returns {AutoCompleteTrie|null} The node where prefix ends, or null.
   */
  _getRemainingTree(prefix, node) {
    let current = node;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!current.children[char]) {
        return null;
      }
      current = current.children[char];
    }
    return current;
  }

  /**
   * Helper: Recursively collects all words from the given node.
   * @param {string} prefix
   * @param {AutoCompleteTrie} node
   * @param {Object[]} allWords
   */
  _allWordsHelper(prefix, node, allWords) {
    if (node.endOfWord) {
      allWords.push({ word: prefix, frequency: node.frequency });
    }

    for (const char in node.children) {
      this._allWordsHelper(prefix + char, node.children[char], allWords);
    }
  }

  /**
   * Increments the frequency usage of a word.
   * @param {string} word The word to record usage for.
   * @returns {string} Result message.
   */
  useWord(word) {
    if (typeof word !== "string" || word.length === 0) {
      return `'${word}' not found in dictionary`;
    }

    const cleanWord = word.toLowerCase();
    const node = this._getRemainingTree(cleanWord, this);

    if (node && node.endOfWord) {
      node.frequency += 1;
      return `Incremented usage for '${cleanWord}' (now ${node.frequency})`;
    }

    return `'${cleanWord}' not found in dictionary`;
  }
}

module.exports = AutoCompleteTrie;
