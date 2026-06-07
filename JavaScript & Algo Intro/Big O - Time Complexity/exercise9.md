# Exercise 9 — Graph Color Matching

## Matching graph colors to Big O complexities

| Color  | Complexity | Description |
|--------|------------|-------------|
| Green  | O(1)       | Horizontal flat line — the runtime never changes no matter how large the input is. Example: reading a value from an object by key. |
| Yellow | O(log n)   | Curve that rises slowly and flattens — the runtime grows, but very slowly. Each step cuts the remaining work in half. Example: binary search. |
| Blue   | O(n)       | Straight diagonal line — the runtime grows in direct proportion to the input size. Double the input, double the time. Example: a single loop over an array. |
| Red    | O(n²)      | Steep upward curve — the runtime grows quadratically. Double the input, and the time roughly quadruples. Example: a nested loop where both loops depend on n. |

## Short explanation of each complexity

**O(1) — Constant**
No matter how big the input is, the operation takes the same amount of time. A hash map lookup is a classic example.

**O(log n) — Logarithmic**
The algorithm repeatedly divides the problem in half. Even for very large inputs, the number of steps stays small. Binary search is the most common example.

**O(n) — Linear**
The algorithm visits each element once. If the input doubles, the runtime doubles. A single `for` loop over an array is a textbook O(n) operation.

**O(n²) — Quadratic**
For every element, the algorithm processes every other element. A nested loop where both levels iterate over the same array produces O(n²). Performance degrades quickly as input grows.
