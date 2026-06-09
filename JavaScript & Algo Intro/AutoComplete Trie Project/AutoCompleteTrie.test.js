const AutoCompleteTrie = require("./AutoCompleteTrie");

describe("AutoCompleteTrie - constructor", () => {
  test("creates a root node with default empty string value", () => {
    const trie = new AutoCompleteTrie();
    expect(trie.value).toBe("");
    expect(trie.children).toEqual({});
    expect(trie.endOfWord).toBe(false);
    expect(trie.frequency).toBe(0);
  });

  test("creates a node with custom character value", () => {
    const trie = new AutoCompleteTrie("c");
    expect(trie.value).toBe("c");
    expect(trie.children).toEqual({});
    expect(trie.endOfWord).toBe(false);
    expect(trie.frequency).toBe(0);
  });

  test("initializes default properties correctly", () => {
    const trie = new AutoCompleteTrie("a");
    expect(trie.frequency).toBe(0);
    expect(trie.endOfWord).toBe(false);
  });
});

describe("AutoCompleteTrie - addWord", () => {
  test("Adds a single word and can find it", () => {
    const trie = new AutoCompleteTrie();
    const result = trie.addWord("cat");
    expect(result).toBe("Added 'cat' to dictionary");
    expect(trie.findWord("cat")).toBe(true);
  });

  test("Reuses existing path when adding words with shared prefix", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("run");
    const originalNode = trie.children["r"].children["u"].children["n"];
    
    trie.addWord("running");
    const sharedNode = trie.children["r"].children["u"].children["n"];
    
    expect(sharedNode).toBe(originalNode);
    expect(sharedNode.children["n"]).toBeDefined();
    expect(trie.findWord("run")).toBe(true);
    expect(trie.findWord("running")).toBe(true);
  });

  test("Converts uppercase input to lowercase", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("CAR");
    expect(trie.findWord("car")).toBe(true);
    expect(trie.findWord("CAR")).toBe(true);
    expect(trie.children["c"].children["a"].children["r"]).toBeDefined();
    expect(trie.children["C"]).toBeUndefined();
  });

  test("Invalid input returns 'Invalid word'", () => {
    const trie = new AutoCompleteTrie();
    expect(trie.addWord("")).toBe("Invalid word");
    expect(trie.addWord(null)).toBe("Invalid word");
    expect(trie.addWord(undefined)).toBe("Invalid word");
    expect(trie.addWord(123)).toBe("Invalid word");
  });
});

describe("AutoCompleteTrie - findWord", () => {
  test("Returns true for an existing word", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("apple");
    expect(trie.findWord("apple")).toBe(true);
  });

  test("Returns false for a missing word", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("apple");
    expect(trie.findWord("banana")).toBe(false);
  });

  test("Returns false when only a prefix exists but not a full word", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("apples");
    expect(trie.findWord("app")).toBe(false);
  });

  test("Handles invalid input safely", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("test");
    expect(trie.findWord("")).toBe(false);
    expect(trie.findWord(null)).toBe(false);
    expect(trie.findWord(undefined)).toBe(false);
    expect(trie.findWord(123)).toBe(false);
  });
});

describe("AutoCompleteTrie - predictWords", () => {
  test("Returns all words for a prefix", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    trie.addWord("card");
    trie.addWord("care");
    
    expect(trie.predictWords("ca")).toEqual(["car", "card", "care", "cat"]);
  });

  test("Returns empty array when prefix does not exist", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("dog");
    expect(trie.predictWords("cat")).toEqual([]);
  });

  test("Returns empty array for invalid input", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("hello");
    expect(trie.predictWords("")).toEqual([]);
    expect(trie.predictWords(null)).toEqual([]);
    expect(trie.predictWords(undefined)).toEqual([]);
    expect(trie.predictWords(123)).toEqual([]);
  });

  test("Returns only matching completions", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("dog");
    trie.addWord("car");
    
    const predictions = trie.predictWords("ca");
    expect(predictions).toContain("cat");
    expect(predictions).toContain("car");
    expect(predictions).not.toContain("dog");
  });

  test("Sorts equally ranked words alphabetically", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("zebra");
    trie.addWord("apple");
    trie.addWord("banana");
    
    expect(trie.predictWords("")).toEqual([]); // prefix empty returns []
    
    // Add prefix-specific words
    trie.addWord("cat");
    trie.addWord("cab");
    trie.addWord("car");
    
    expect(trie.predictWords("ca")).toEqual(["cab", "car", "cat"]);
  });
});

describe("AutoCompleteTrie - helper methods", () => {
  test("_getRemainingTree returns the correct node for an existing prefix", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    const node = trie._getRemainingTree("ca", trie);
    expect(node).toBeDefined();
    expect(node.value).toBe("a");
    expect(node.children["t"]).toBeDefined();
  });

  test("_getRemainingTree returns null for a missing prefix", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    const node = trie._getRemainingTree("dog", trie);
    expect(node).toBeNull();
  });

  test("_allWordsHelper collects all words from a node", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    
    const nodeCa = trie._getRemainingTree("ca", trie);
    const allWords = [];
    trie._allWordsHelper("ca", nodeCa, allWords);
    
    // allWords contains objects: { word, frequency }
    expect(allWords).toHaveLength(2);
    const wordsOnly = allWords.map(w => w.word);
    expect(wordsOnly).toContain("cat");
    expect(wordsOnly).toContain("car");
  });
});

describe("AutoCompleteTrie - useWord bonus tests", () => {
  test("Increments frequency for an existing word", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    const result = trie.useWord("cat");
    
    expect(result).toBe("Incremented usage for 'cat' (now 1)");
    
    const node = trie._getRemainingTree("cat", trie);
    expect(node.frequency).toBe(1);
  });

  test("Returns not found message for a missing word", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    const result = trie.useWord("dog");
    
    expect(result).toBe("'dog' not found in dictionary");
  });

  test("Makes higher frequency words appear first in predictWords", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    
    // Initially alphabetical order: ["car", "cat"]
    expect(trie.predictWords("ca")).toEqual(["car", "cat"]);
    
    trie.useWord("cat");
    trie.useWord("cat");
    
    // Now "cat" has higher frequency (2) than "car" (0)
    expect(trie.predictWords("ca")).toEqual(["cat", "car"]);
  });

  test("If frequencies are equal, suggestions are sorted alphabetically", () => {
    const trie = new AutoCompleteTrie();
    trie.addWord("cat");
    trie.addWord("car");
    
    trie.useWord("cat");
    trie.useWord("car");
    
    // Both frequency 1, should sort alphabetically: ["car", "cat"]
    expect(trie.predictWords("ca")).toEqual(["car", "cat"]);
  });
});
