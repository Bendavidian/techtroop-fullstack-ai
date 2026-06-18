# The Event Loop

A beginner-friendly, interactive exercise for understanding how JavaScript executes code — synchronously and asynchronously.

## What This Exercise Teaches

| Concept | What You Will See |
|---|---|
| **Call Stack** | Functions being pushed and popped in order |
| **Blocking Code** | A `while` loop that freezes the browser |
| **Web APIs** | `setTimeout` delegated to the browser |
| **Callback Queue** | Where async callbacks wait |
| **Event Loop** | How callbacks move from the queue to the stack |

## How to Run

1. Open `index.html` in your browser (double-click the file or use a local server).
2. Open **Chrome DevTools** (`F12` or `Cmd+Option+I`) and go to the **Console** tab to follow along.
3. Click each button and watch the **Output Log** on the page.
4. Compare the order messages appear — especially in the Async and Event Loop examples.

## Key Concepts in Plain Words

**JavaScript is single-threaded.**
Only one piece of code can run at a time. There is one Call Stack, and everything takes turns.

**Blocking code stops everything.**
If you run a long synchronous task (like a `while` loop), the browser cannot update the UI, respond to clicks, or do anything else until that task finishes.

**`setTimeout` is handled by Web APIs.**
When you call `setTimeout`, JavaScript hands the timer to the *browser* (a Web API). The browser counts down in the background while JavaScript keeps running your other code.

**The callback waits in the Callback Queue.**
When the timer fires, the callback function does not run immediately. It is placed in the **Callback Queue** and has to wait its turn.

**The Event Loop moves callbacks to the Call Stack only when the stack is empty.**
The Event Loop constantly checks: "Is the Call Stack empty? Is there anything in the Callback Queue?" Only when the stack is clear does it move the next callback over to run.

## File Overview

```
The Event Loop/
├── index.html   — Page structure, explanations, and buttons
├── main.js      — All JavaScript examples with comments
├── style.css    — Clean, modern styling
└── README.md    — This file
```
