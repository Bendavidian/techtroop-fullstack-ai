# Unit Tests With Jest

This folder practices unit testing in Node.js using Jest.

## Folder Structure

```text
JavaScript & Algo Intro/Unit Tests With Jest/
├── package.json
├── code.js
├── code.test.js
├── Exercises.js
├── Exercises.test.js
└── README.md
```

## How to Install Dependencies

To install Jest and other required dependencies, run the following command in this directory:

```bash
npm install
```

## How to Run Tests

To run the unit tests, execute:

```bash
npm test
```

## What is Covered

This project covers various concepts of Jest unit testing:
* **Basic Jest test**: Setting up test suites using `describe` and `test` blocks.
* **Expect and matchers**: Asserting behavior using Jest matchers.
* **Jest matchers**: `toBe`, `toEqual`, `toContain`, `not`, truthy/falsy (using `toBeTruthy` and `toBeFalsy`), and less than (using `toBeLessThan`).
* **Testing functions**: Validating inputs and return values of standard utility functions.
* **Testing classes**: Testing object-oriented implementations, state changes, constructor initializations, and method behaviors.
* **TDD (Test-Driven Development)**: Designing function signatures and edge cases in tests before completing the implementation (e.g. `ArrayManipulator` and `validate` methods).
* **Edge cases**: Verifying behaviors for empty arrays, mixed datatype arrays, and random/non-deterministic operations.
* **Jest spy**: Spying on prototype methods using `jest.spyOn()` and asserting call/argument expectations, with proper cleanups using `mockRestore()`.

## Exercises Covered

Inside `Exercises.js` and `Exercises.test.js`, we implement and test:
1. **Exercise 1 — `isEven(n)`**: Checks if a given number is even, returning true/false. Includes tests for even numbers, odd numbers, and zero.
2. **Exercise 2 — `removeAtLeastOne(arr)`**: Mutates the array to remove a random number of elements (at least one). Tested by comparing lengths before and after, and verifying the returned type is an Array.
3. **Exercise 3 — `simplify(str)`**: Strips specific symbols (`!`, `#`, `.`, `,`, `'`) from a string. Tests confirm correctly simplified output strings and the complete absence of forbidden symbols.
4. **Exercise 4 — `validate(arr)`**: Validates an array of booleans. Requires at least one boolean. Returns `true` if there are more `true` than `false` values, otherwise `false`. Ignores non-booleans.
