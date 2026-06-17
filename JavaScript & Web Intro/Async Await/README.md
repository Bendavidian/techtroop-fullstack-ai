# Async / Await

> **Note on folder name:** The `/` character is a path separator on macOS and Linux, so the folder could not be named `Async / Await` literally. It was created as **`Async Await`** instead.

A hands-on Node.js project that teaches modern asynchronous JavaScript — `async` functions, `await`, `try/catch`, sequential vs. parallel fetches, and real-world API data processing.

---

## Core Concepts

### What does `async` mean?
Placing `async` before a function declaration does two things:
1. The function **always returns a Promise**, even if you write `return 42`.
2. The `await` keyword is now allowed inside that function.

```js
async function greet() {
  return "hello";           // wrapped in Promise.resolve("hello") automatically
}

greet().then(console.log); // prints: hello
```

### What does `await` mean?
`await` **pauses** the current `async` function until the Promise to its right settles, then unwraps the resolved value. Other code on the call stack continues running while it waits — `await` does not block the whole program.

```js
async function example() {
  const response = await fetch("https://api.example.com/data"); // pauses here
  const data     = await response.json();                        // and here
  console.log(data);                                             // then continues
}
```

### Why must `await` be inside an `async` function?
`await` relies on the Promise machinery that `async` sets up. Using it outside an `async` function is a syntax error (except at the top level of ES modules).

### What does `try/catch` do in async code?
When an `await`-ed Promise rejects, or when you `throw` inside an `async` function, execution jumps to the nearest `catch` block — exactly like synchronous errors.

```js
async function safe() {
  try {
    const res = await fetch("https://bad-url");
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
  } catch (error) {
    console.error(error.message); // handles both network & logic errors
    return null;
  }
}
```

---

## Sequential vs. Parallel Operations

### Sequential (one after another)
Use sequential `await` when **step 2 depends on step 1's result**.

```js
async function getUserWithPosts(userId) {
  const user  = await fetchUser(userId);   // must finish first
  const posts = await fetchPosts(userId);  // only runs after user is confirmed
  return { user, posts };
}
// Total time ≈ time(user) + time(posts)
```

### Parallel (all at once)
Use `Promise.all` when the requests are **independent** of each other.

```js
async function getDashboard() {
  const [users, posts, comments] = await Promise.all([
    fetch("/users").then(r => r.json()),
    fetch("/posts").then(r => r.json()),
    fetch("/comments").then(r => r.json())
  ]);
  // Total time ≈ time of the SLOWEST single request
}
```

### Why `Promise.all` matters
| Approach | 3 requests × 300 ms each | Total wait |
|---|---|---|
| Sequential `await` | Run one at a time | ~900 ms |
| `Promise.all` | Run simultaneously | ~300 ms |

`Promise.all` rejects immediately if **any** promise rejects — if you need partial results even when some fail, use `Promise.allSettled` instead.

---

## Common Mistakes

### 1. Forgetting `await`
```js
// ✗ Wrong — `data` is a Promise, not the actual value
const data = fetch("https://api.example.com/items");

// ✓ Correct
const data = await fetch("https://api.example.com/items");
```

### 2. Using `await` outside an `async` function
```js
// ✗ SyntaxError
function bad() {
  const res = await fetch("...");
}

// ✓ Correct
async function good() {
  const res = await fetch("...");
}
```

### 3. Making independent requests sequential
```js
// ✗ Wastes time — these don't depend on each other
const users    = await fetchUsers();
const products = await fetchProducts();

// ✓ Run them in parallel
const [users, products] = await Promise.all([fetchUsers(), fetchProducts()]);
```

### 4. Not checking `response.ok`
```js
// ✗ A 404 does NOT throw automatically
const res  = await fetch("https://api.example.com/users/999");
const user = await res.json(); // silently parses an error body

// ✓ Always check before parsing
const res = await fetch("https://api.example.com/users/999");
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const user = await res.json();
```

---

## Exercises

### Exercise 1 — `getUserById(id)` ([exercise1-get-user.js](exercise1-get-user.js))
Converts a `.then()/.catch()` chain into an `async/await` function. Tests valid users (1, 5, 10) and an invalid user (999). Results go to the console.

### Exercise 2 — `getUserWithPosts(userId)` ([exercise2-user-posts.js](exercise2-user-posts.js))
Sequential async pattern: fetches a user first, then fetches their posts only if the user exists. Prints name, email, post count, and first post title. Tests userId 1, 3, and 999 (not found).

### Exercise 3 — `createDashboard()` ([exercise3-dashboard.js](exercise3-dashboard.js))
Parallel async pattern using `Promise.all`. Fetches users, posts, and comments simultaneously, then processes them into a summary, top-3 users by post count, and the 5 most recent posts.

---

## How to Run

Run from the **repository root** (`techtroop-fullstack-ai/`):

```bash
node "JavaScript & Web Intro/Async Await/exercise1-get-user.js"
node "JavaScript & Web Intro/Async Await/exercise2-user-posts.js"
node "JavaScript & Web Intro/Async Await/exercise3-dashboard.js"
```

> **Requires Node 18 or higher** for the built-in `fetch` API.  
> Check your version with `node --version`.
