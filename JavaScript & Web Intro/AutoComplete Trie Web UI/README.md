# AutoComplete Trie Web UI

A browser-based dictionary app that wraps the existing **AutoCompleteTrie** data structure in a clean, interactive web interface — demonstrating HTML, CSS, and DOM manipulation with vanilla JavaScript.

---

## What is a Trie?

A **Trie** (prefix tree) is a tree data structure where each node represents one character of a word. Every path from root to a marked end-of-word node spells out a complete word. This makes prefix-based lookups extremely fast.

```
          (root)
         /      \
       j          p
       |          |
       a          r
      / \         |
     v   s        o
     |   |        |
     a   o        g
     |   |        |
     *   n       ...
   (java) (jason)
```

The `AutoCompleteTrie` class used here comes from:
`JavaScript & Algo Intro/AutoComplete Trie Project/AutoCompleteTrie.js`

The only modification for the browser is removing the `module.exports` line (Node.js only).

---

## Features

| Feature | Description |
|---|---|
| Add words | Trim, lowercase, reject duplicates, insert into Trie |
| Live autocomplete | `predictWords(prefix)` called on every keystroke |
| Prefix highlight | Matched prefix rendered in bold blue inside each suggestion |
| Click suggestion | Fills search box, increments word frequency in the Trie |
| Counter | Updates instantly whenever a new unique word is added |
| Auto-dismiss messages | Success / error banners disappear after 3 seconds |
| Floating dropdown | Positioned with `absolute`, does not push page content down |

---

## DOM Concepts Used

| API | Used for |
|---|---|
| `document.querySelector` | Select elements by ID / class |
| `document.createElement` | Build `<li>`, `<span>`, `TextNode` items dynamically |
| `element.appendChild` | Add children to the dropdown list |
| `element.removeChild` | Clear the dropdown before re-rendering |
| `element.textContent` | Set counter and message text safely |
| `element.classList` | Toggle `hidden`, `success`, `error` classes |
| `addEventListener` | Wire up all events (no inline HTML handlers) |

---

## Event Handling

| Event | Element | Action |
|---|---|---|
| `click` | Add Word button | Validate and insert word |
| `keydown` (Enter) | Add-word input | Triggers the button click |
| `input` | Search input | Re-run autocomplete on every keystroke |
| `click` | Each suggestion `<li>` | Fill search box, bump frequency |
| `click` | `document` | Close dropdown when clicking outside |

---

## How to Run

Open `index.html` directly in any modern browser — no server or build step needed.

```bash
# From the repository root
open "JavaScript & Web Intro/AutoComplete Trie Web UI/index.html"
```

Or drag and drop `index.html` onto a browser window.

---

## Manual Test Checklist

- [ ] Click **Add Word** with an empty input → red error message
- [ ] Add `javascript`, `java`, `jason` → counter reaches 3
- [ ] Add `javascript` again → duplicate error
- [ ] Type `ja` in the search box → three suggestions appear
- [ ] Click a suggestion → search box fills, dropdown closes
- [ ] Clear the search box → dropdown disappears
- [ ] Type a prefix with no matches → dropdown disappears
- [ ] Open the browser console → zero errors
