# Local Storage — Wisdom Saver

A browser app that teaches `localStorage` by building a persistent wisdom collection. Items survive a page refresh because they are saved directly in the browser.

---

## What is Local Storage?

`localStorage` is a key-value store built into every modern browser. It lets you save string data that **persists between page reloads** — even after the browser is closed and reopened.

```
Browser
└── localStorage (per origin)
    ├── "wisdom"  →  '[{"id":1,"text":"Start before you're ready."}]'
    └── "theme"   →  "dark"
```

### Why it is useful
- Zero setup — no server, no database, no login required.
- Data survives refreshes and browser restarts.
- Perfect for settings, preferences, draft content, and small datasets.

### Why it does NOT replace a database
| localStorage | Database |
|---|---|
| Stored in the user's browser only | Stored on a server, accessible everywhere |
| Limited to ~5 MB | Virtually unlimited |
| Lost if user clears browser data | Permanent until explicitly deleted |
| Not shareable between devices | Accessible from any device |
| No query language | SQL / NoSQL queries |

---

## API Reference

### `localStorage.setItem(key, value)`
Saves a value under a key. Both key and value **must be strings**.

```js
localStorage.setItem("username", "Ada");
```

### `localStorage.getItem(key)`
Reads the value stored under a key. Returns `null` if the key does not exist.

```js
var name = localStorage.getItem("username"); // "Ada"
var missing = localStorage.getItem("xyz");   // null
```

### `localStorage.removeItem(key)`
Deletes one specific key and its value.

```js
localStorage.removeItem("username");
```

### `localStorage.clear()`
Deletes **all** keys stored by this origin. Use with caution.

```js
localStorage.clear();
```

---

## Working with Complex Data

`localStorage` can only store **strings**. To save an array or object, you must convert it first.

### `JSON.stringify()` — object → string
```js
var wisdom = [{ id: 1, text: "Keep going." }];
localStorage.setItem("wisdom", JSON.stringify(wisdom));
// Stored as: '[{"id":1,"text":"Keep going."}]'
```

### `JSON.parse()` — string → object
```js
var raw = localStorage.getItem("wisdom");
var wisdom = JSON.parse(raw);
// wisdom is now a real JavaScript array
```

### Safe fallback pattern
`getItem` returns `null` when the key does not exist, and `JSON.parse(null)` throws an error. Use `|| "[]"` to default to an empty array string:

```js
var wisdom = JSON.parse(localStorage.getItem("wisdom") || "[]");
//                                                       ↑
//                          if key is missing, parse "[]" instead of null
```

---

## How the Wisdom Saver Works

| Action | What happens |
|---|---|
| Page load | Reads saved wisdom with the safe fallback, renders all items |
| Add Wisdom | Creates `{ id, text }` object, pushes to array, saves on every **even** `wisdom.length`, re-renders |
| Click × | Filters item out of array, saves immediately, re-renders |
| Clear Wisdom | Calls `localStorage.removeItem("wisdom")`, empties array, re-renders |

### The even-length save rule
```js
if (wisdom.length % 2 === 0) {
  localStorage.setItem("wisdom", JSON.stringify(wisdom));
}
```
This demonstrates that you control **when** to persist — you don't have to save on every single change. (In a real app you would usually save every time.)

---

## DOM Techniques Used

| API | Used for |
|---|---|
| `document.querySelector` | Select all elements by ID |
| `document.createElement` | Build wisdom cards and delete buttons |
| `element.appendChild` | Add cards to the list |
| `element.replaceChildren()` | Clear the list before re-rendering |
| `element.textContent` | Set text safely (no XSS risk) |
| `element.classList` | Toggle message types (`success` / `error` / `hidden`) |
| `addEventListener` | Wire all clicks and the Enter key — no inline HTML events |

---

## How to Run

Open `index.html` directly in any modern browser — no server needed.

```bash
# From the repository root
open "JavaScript & Web Intro/Local Storage/index.html"
```

Or drag and drop `index.html` onto a browser window.

---

## Manual Test Checklist

- [ ] Click **Add Wisdom** with an empty input → red error message appears
- [ ] Type wisdom, click **Add Wisdom** → item appears in the list
- [ ] Add a second item → count is now 2 (even) → check DevTools → Application → Local Storage → key `wisdom` is saved
- [ ] Add a third item → count is 3 (odd) → Local Storage not updated yet
- [ ] Add a fourth item → count is 4 (even) → Local Storage updated with all 4
- [ ] Refresh the page → all saved wisdom re-appears instantly
- [ ] Click × on one item → item removed, Local Storage updated, success message shown
- [ ] Click **Clear Wisdom** → all items gone, key removed from Local Storage
- [ ] Open browser console → zero errors
