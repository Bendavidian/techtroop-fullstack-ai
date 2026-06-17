# Tweeter Project

A simplified Twitter-like web application that demonstrates the **MVC (Model-View-Controller)** architecture pattern using vanilla JavaScript and jQuery.

---

## What is MVC?

MVC splits an application into three distinct responsibilities so that each piece of code has one clear job:

| Layer | File | Responsibility |
|---|---|---|
| **Model** | `model.js` | Stores and manages data. No DOM knowledge. |
| **View / Renderer** | `render.js` | Reads data and draws the UI. No data logic. |
| **Controller** | `main.js` | Listens for events, calls Model, triggers re-render. |

```
User interaction
      ↓
  Controller  ──calls──▶  Model (updates data)
      │                      │
      └──────calls──────▶  Renderer (reads data, redraws DOM)
```

---

## Module Breakdown

### Model — `model.js`
`function Tweeter()` returns an object with five public functions. The `posts` array and ID counters are **private** — nothing outside the Model can access or break them directly.

| Function | Description |
|---|---|
| `getPosts()` | Returns the full posts array |
| `addPost(text)` | Pushes a new `{ id, text, comments: [] }` object |
| `removePost(postID)` | Filters out the post with that ID |
| `addComment(postID, text)` | Finds the post and pushes a new comment |
| `removeComment(postID, commentID)` | Finds the post and filters out the comment |

ID counters (`p3, p4…` and `c7, c8…`) are incremented inside the Model so the Controller never needs to track them.

### Renderer / View — `render.js`
`function Renderer()` exposes one public function: `renderPosts(posts)`.

It empties `#posts`, then loops through the array and builds each post card using jQuery (`$('<div>')`, `.addClass()`, `.attr()`, `.text()`, `.append()`). It never calls Model functions or modifies data.

### Controller — `main.js`
Runs inside `$(document).ready()` so jQuery is guaranteed to be loaded first. It:
1. Creates `Tweeter()` and `Renderer()` instances.
2. Calls `renderer.renderPosts(tweeter.getPosts())` for the initial render.
3. Wires event listeners for all user actions.

After **every** data change, the Controller calls `renderer.renderPosts(tweeter.getPosts())` to refresh the UI from the current data.

---

## File Structure

```
Tweeter Project/
├── index.html   — HTML shell, loads jQuery + the three JS files
├── style.css    — All visual styling
├── model.js     — Data logic (Tweeter module)
├── render.js    — DOM rendering (Renderer module)
├── main.js      — Event handling / controller
└── README.md
```

The script load order in `index.html` matters:
```
jQuery CDN → model.js → render.js → main.js
```
`main.js` depends on `Tweeter` and `Renderer` being defined first.

---

## Features Implemented

- Two pre-loaded posts with dummy comments on page open
- Add a new post by typing and clicking **Twit** (or pressing Enter)
- Delete any post with **Delete Post**
- Add a comment to any post
- Delete a single comment with the **x** button
- Empty post/comment inputs are ignored silently

---

## How Event Delegation Works

When `renderPosts()` runs, it clears `#posts` and recreates all elements. This means any `click` listener attached directly to `.delete` or `.delete-comment` would be destroyed along with those elements.

**Event delegation** solves this by attaching the listener to the static `#posts` container instead. jQuery's `on(event, selector, handler)` syntax then checks whether the click originated from a matching child:

```js
// ✗ Won't survive re-render — listener attached to element that gets deleted
$('.delete').on('click', handler);

// ✓ Survives re-render — listener is on the permanent #posts container
$('#posts').on('click', '.delete', handler);
```

---

## How to Run

Open `index.html` directly in any modern browser — no server or build step needed.

```bash
# From the repository root
open "JavaScript & Web Intro/Tweeter Project/index.html"
```

Or drag and drop `index.html` onto a browser window.

---

## Manual Test Checklist

- [ ] Page loads → two posts appear, each with three comments
- [ ] Type a new post and click **Twit** → post appears at the bottom
- [ ] Press Enter in the post input → same result as clicking Twit
- [ ] Leave the post input empty and click **Twit** → nothing happens
- [ ] Click **Delete Post** → that post disappears
- [ ] Type a comment and click **Comment** → comment appears under that post
- [ ] Press Enter in a comment input → same result as clicking Comment
- [ ] Leave the comment input empty and click **Comment** → nothing happens
- [ ] Click **x** next to a comment → only that comment disappears
- [ ] Open browser console (F12) → zero JavaScript errors
