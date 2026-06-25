# React Input

A beginner React exercise project demonstrating controlled inputs, two-way binding, and managing user input through React state.

---

## What This Exercise Demonstrates

- How to use controlled inputs in React
- How two-way data binding works
- How to store and read input values from state
- How to handle text inputs, number inputs, and select dropdowns
- Why we should never read input values directly from the DOM

---

## Key Concepts

### Controlled Inputs
A controlled input is an input element whose value is always driven by React state. React is in full control of what the input displays.

### Two-Way Binding
Two-way binding means:
1. The input **reads** its current value from state (`value={someState}`)
2. When the user types, the input **writes** back to state (`onChange={handler}`)

This keeps the UI and the data always in sync.

### Why Store Input Values in State?
React components re-render from state. If you read values directly from the DOM, you bypass React's data model and lose predictability, testability, and correctness.

### Why `value` and `onChange` on Text Inputs?
- `value` binds the input display to state
- `onChange` updates state whenever the user types
- Together they form the controlled input pattern

### Why Does `select` Also Use `value` and `onChange`?
A `<select>` is just another form element. React treats it the same way — `value` sets the selected option, `onChange` fires when the user picks a new one.

### Why Would a Checkbox Use `checked` Instead of `value`?
Checkboxes represent a boolean (on/off). Their state is `checked`, not `value`. So you use `checked={someBoolean}` and `onChange` to toggle it.

### Why Not Read Input Values From the DOM?
Using `document.querySelector` or `getElementById` to read input values is the old, imperative way. In React:
- State is the single source of truth
- The DOM is just a reflection of state
- Reading the DOM directly can give stale or incorrect data

---

## Exercises

### Exercise 1 — Person Form
Uses a **state object** to track two inputs: name and age.

- `handleChange` updates the object using the spread operator and computed property names
- A "Go to Bar" button reads `person.name` and `person.age` from state and shows an alert
- A live preview shows both values updating in real time

### Exercise 2 — Fruit Selector
Uses **two separate state variables**: one for name, one for fruit.

- A text input controls the name
- A `<select>` dropdown controls the fruit
- When the user picks a fruit, `handleFruitChange` stores the new value in a local variable *before* calling `setFruit`, then logs `"<name> selected <fruit>"` — this avoids the stale-state problem that would occur if you logged `fruit` immediately after `setFruit`
- A live preview shows both values updating in real time

---

## File Structure

```
React Input/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── style.css
    └── components/
        ├── Exercise1.jsx
        └── Exercise2.jsx
```

---

## How to Run

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually http://localhost:5173).

## How to Build

```bash
npm run build
```

The production build will be output to the `dist/` folder.
