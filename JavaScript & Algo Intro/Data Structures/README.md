# UniqueArray — Data Structures Lesson

## What is UniqueArray?

`UniqueArray` is a custom data structure that behaves like a regular array but **never stores duplicate values**. It combines:

- An **array** (`_items`) to preserve insertion order.
- A **plain object** (`_lookup`) used as a hash map to track which values already exist.

### Methods

| Method | Description |
|--------|-------------|
| `add(item)` | Adds the item only if it does not already exist. |
| `showAll()` | Prints all stored items to the console. |
| `exists(item)` | Returns `true` if the item is stored, `false` otherwise. |
| `get(index)` | Returns the item at the given index, or `-1` if out of range. |

---

## Why is `exists` O(1) for primitives?

For primitive values (strings, numbers, booleans), we convert the value to a simple string key and store it in a plain JavaScript object (`_lookup`). Checking whether a key exists in a plain object is a **hash-table lookup**, which runs in constant time — O(1) — regardless of how many items are stored.

Example key: the number `42` becomes `"prim:42"`, the string `"toy"` becomes `"prim:toy"`.

---

## Why are objects harder to compare?

In JavaScript, objects are compared **by reference**, not by value:

```js
{ x: 3 } === { x: 3 } // false — two different objects in memory
```

This means we cannot use `===` to check if two objects have the same content. To solve this, we use `JSON.stringify` to turn the object into a string representation and compare those strings instead:

```js
JSON.stringify({ x: 3 }) === JSON.stringify({ x: 3 }) // true
```

**Trade-off:** `JSON.stringify` is not O(1) — it takes time proportional to the size of the object. It also assumes simple, JSON-compatible objects (no `undefined`, no functions, no circular references).

---

## How to run the files

Make sure you have [Node.js](https://nodejs.org) installed, then run from the project root:

```bash
node "JavaScript & Algo Intro/Data Structures/exercise1-test.js"
node "JavaScript & Algo Intro/Data Structures/exercise2-test.js"
```
