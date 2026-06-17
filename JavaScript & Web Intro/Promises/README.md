# JavaScript Promises

## What is a Promise?

A Promise is an object that represents the eventual result of an asynchronous operation. Instead of blocking code while waiting (e.g. for a network request or a timer), a Promise lets you say: *"do this now, and when it finishes, run this callback."*

---

## The Three Promise States

| State | Meaning |
|---|---|
| **Pending** | The operation has not finished yet. |
| **Fulfilled** | The operation completed successfully — a value is available. |
| **Rejected** | The operation failed — an error reason is available. |

A Promise moves from **pending** to either **fulfilled** or **rejected** exactly once and never changes state again.

---

## Key Methods

### `.then(onFulfilled)`
Called when the Promise is fulfilled. Receives the resolved value. Returns a new Promise, so you can chain multiple `.then()` calls.

```js
fetchData()
  .then(function(data) { console.log(data); })
  .then(function()     { console.log("Done!"); });
```

### `.catch(onRejected)`
Called when the Promise is rejected (or when any `.then()` in the chain throws). Receives the error.

```js
fetchData()
  .then(function(data) { console.log(data); })
  .catch(function(err) { console.log("Error:", err.message); });
```

### `Promise.all(promises)`
Waits for **all** promises to fulfill. Resolves with an array of all results. If **any** promise rejects, the whole thing rejects immediately (fail-fast).

```js
Promise.all([fetchUser(), fetchPosts()])
  .then(function(results) { /* both succeeded */ })
  .catch(function(err)    { /* at least one failed */ });
```

### `Promise.allSettled(promises)`
Waits for **all** promises to finish regardless of outcome. Always resolves with an array of objects describing each result — no fail-fast behaviour.

```js
Promise.allSettled([fetchUser(), fetchPosts()])
  .then(function(results) {
    results.forEach(function(r) {
      if (r.status === "fulfilled") console.log("OK:", r.value);
      else                          console.log("Failed:", r.reason.message);
    });
  });
```

---

## Exercises

### Exercise 1 – Lucky Number
`checkLuckyNumber(num)` returns a Promise that resolves with `"Lucky!"` or `"Not lucky"` after 800 ms, and rejects for invalid numbers.

**Concepts:** Promise constructor, `resolve`, `reject`, `.then()`, `.catch()`

### Exercise 2 – Process Files
`processFile(filename, time)` simulates file processing with a 15 % random failure rate.  
`Promise.all()` runs all files concurrently and fails if any file fails.  
`Promise.allSettled()` (bonus) reports successes and failures separately.

**Concepts:** `Promise.all`, `Promise.allSettled`, concurrent async work

### Exercise 3 – Shopping Cart
A full checkout pipeline: inventory check → price calculation → payment → stock update, all chained with `.then()`.

**Concepts:** Real-world promise chaining, shared state between steps, error propagation

---

## How to Run

```bash
node "JavaScript & Web Intro/Promises/exercise1-lucky-number.js"
node "JavaScript & Web Intro/Promises/exercise2-process-files.js"
node "JavaScript & Web Intro/Promises/exercise3-shopping-cart.js"
```

> Run from the **root of the repository** (`techtroop-fullstack-ai/`).
