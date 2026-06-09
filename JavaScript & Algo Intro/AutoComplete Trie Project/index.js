const readline = require("readline");
const AutoCompleteTrie = require("./AutoCompleteTrie");

const trie = new AutoCompleteTrie();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> "
});

console.log("=== AutoComplete Trie Console ===");
console.log("Type 'help' for commands\n");
rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();
  if (!input) {
    rl.prompt();
    return;
  }

  // Split input into command and argument
  const parts = input.split(/\s+/);
  const command = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ");

  switch (command) {
    case "add":
      if (!arg) {
        console.log("✗ Error: Missing word argument for 'add'");
      } else {
        const result = trie.addWord(arg);
        if (result === "Invalid word") {
          console.log(`✗ ${result}`);
        } else {
          console.log(`✓ ${result}`);
        }
      }
      break;

    case "find":
      if (!arg) {
        console.log("✗ Error: Missing word argument for 'find'");
      } else {
        const exists = trie.findWord(arg);
        if (exists) {
          console.log(`✓ '${arg.toLowerCase()}' exists in dictionary`);
        } else {
          console.log(`✗ '${arg.toLowerCase()}' not found in dictionary`);
        }
      }
      break;

    case "complete":
      if (!arg) {
        console.log("✗ Error: Missing prefix argument for 'complete'");
      } else {
        const suggestions = trie.predictWords(arg);
        if (suggestions.length === 0) {
          console.log(`No suggestions found for '${arg.toLowerCase()}'`);
        } else {
          const formatted = suggestions.map(word => {
            const node = trie._getRemainingTree(word, trie);
            const freq = node && node.endOfWord ? node.frequency : 0;
            return `${word} (${freq})`;
          });
          console.log(`Suggestions for '${arg.toLowerCase()}': ${formatted.join(", ")}`);
        }
      }
      break;

    case "use":
      if (!arg) {
        console.log("✗ Error: Missing word argument for 'use'");
      } else {
        const result = trie.useWord(arg);
        if (result.includes("Incremented")) {
          console.log(`✓ ${result}`);
        } else {
          console.log(`✗ ${result}`);
        }
      }
      break;

    case "help":
      console.log("Commands:");
      console.log("  add <word>        - Add word to dictionary");
      console.log("  find <word>       - Check if word exists");
      console.log("  complete <prefix> - Get completions");
      console.log("  use <word>        - Increment usage count");
      console.log("  help              - Show this message");
      console.log("  exit              - Quit program");
      break;

    case "exit":
      console.log("Goodbye!");
      rl.close();
      return;

    default:
      console.log("Unknown command. Type 'help' for commands.");
      break;
  }

  console.log(); // line break for visual separation
  rl.prompt();
});

rl.on("close", () => {
  process.exit(0);
});
