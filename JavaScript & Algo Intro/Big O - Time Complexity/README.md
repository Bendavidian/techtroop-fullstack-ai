# Big O — Time Complexity

This folder contains exercises that explore Big O notation and time complexity analysis using beginner-friendly JavaScript examples.

---

## Exercises

| File | Topic | Complexity |
|------|-------|------------|
| exercise1.js | Bank balance — single loop | O(n) |
| exercise2.js | Print some complaints — doubling index | O(log n) |
| exercise3.js | Hypotenuse — fixed math operations | O(1) |
| exercise4.js | Answer distributions — nested iteration | O(s × q) |
| exercise5.js | Send emails — loop over recipients | O(n) |
| exercise6.js | Find duplicates — hash-based check | O(n) |
| exercise7.js | Employee salary lookup — object key access | O(1) |
| exercise8.js | Binary search — halving the search range | O(log n) |
| exercise9.md | Graph color matching — written answer | — |

---

## How to run

From the project root, run each file with Node:

```bash
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise1.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise2.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise3.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise4.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise5.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise6.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise7.js"
node "JavaScript & Algo Intro/Big O - Time Complexity/exercise8.js"
```

exercise9.md is a written answer — open it directly.

---

## Big O Summary

| Exercise | Answer | Reason |
|----------|--------|--------|
| 1 | O(n) | One loop over all bank operations |
| 2 | O(log n) | Index doubles each iteration |
| 3 | O(1) | Fixed number of math operations |
| 4 | O(s × q) | Nested iteration over students and questions |
| 5 | O(n) | One loop over all recipients |
| 6 | O(n) | Each element checked once using a hash |
| 7 | O(1) | Direct object key lookup |
| 8 | O(log n) | Search range halves on every step |
| 9 | Graph matching | See exercise9.md |
