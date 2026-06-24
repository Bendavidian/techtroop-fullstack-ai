# React State

## What this exercise demonstrates

This project teaches how to manage UI state in React using the `useState` hook. It covers creating state, updating state correctly, passing state through props, conditional rendering, and rendering lists.

---

## What is state?

State is data that belongs to a component and can change over time. When state changes, React automatically re-renders the component to show the updated UI.

---

## What does useState do?

`useState` is a React hook that creates a state variable and a setter function to update it.

```jsx
const [myState, setMyState] = useState({ count: 0 })
```

- `myState` — the current value
- `setMyState` — the function you call to update it
- `{ count: 0 }` — the initial value

---

## How do onClick events work in React?

You pass a function reference to the `onClick` prop of a JSX element. React calls that function when the element is clicked.

```jsx
function handleClick() {
  setMyState({ count: myState.count + 1 })
}

<button onClick={handleClick}>Click me</button>
```

---

## Why do we update state only with the setter function?

React only knows to re-render a component when you call the setter function. If you change the state variable directly, React won't notice and the UI won't update.

---

## Why do we NOT mutate state directly?

Mutating state directly means changing the existing object in place:

```jsx
// WRONG — do not do this
myState.count = 5
```

This breaks React because React compares the old and new state references to decide whether to re-render. If you mutate the same object, the reference doesn't change and React skips the re-render. Always create a new object:

```jsx
// CORRECT
setMyState({ ...myState, count: 5 })
```

---

## What is top-down data flow?

Data flows in one direction in React: from parent to child via props. The parent owns the state; the child reads it but cannot change it directly.

```
App (owns appState)
 ├── Landing  ← receives user, hottestItem
 └── Home     ← receives store, shouldDiscount
      └── Item (many) ← receives item, price, discount, shouldDiscount
```

---

## How App passes data to Landing, Home, and Item

- `App` holds the entire `appState` object.
- `App` passes `user` and `hottestItem` to `Landing` as props.
- `App` passes `store` and `shouldDiscount` to `Home` as props.
- `Home` loops through `store` with `.map()` and passes each item's data to `Item` as props.

---

## How map is used to render many Item components

```jsx
props.store.map((storeItem) => (
  <Item
    key={storeItem.item}
    item={storeItem.item}
    price={storeItem.price}
    discount={storeItem.discount}
    shouldDiscount={props.shouldDiscount}
  />
))
```

---

## Why each mapped Item needs a key prop

When React renders a list, it needs a stable unique identifier for each element so it can track which items changed, were added, or were removed. Without `key`, React shows a warning and may update the wrong elements.

---

## What each exercise does

### Exercise 1 — Houdini state toggle
A component with a boolean inside a state object. A button toggles the boolean and the displayed message changes between "Now you see me" and "Now you don't".

### Exercise 2 — Component tree and props
`App` holds a store array in state and passes data down to `Landing`, `Home`, and `Item`. Demonstrates the top-down data flow pattern.

### Exercise 3 — Switching pages with state
`App` holds `currentPage` in state. Two buttons update `currentPage`, which controls whether `Landing` or `Home` is rendered on screen.

### Exercise 4 — Toggling discounts with state
`App` holds `shouldDiscount` in state. A button toggles it. When true, `Item` calculates and shows a discounted price. `Landing` always shows the original price.

---

## File structure

```
React State/
├── index.html               — HTML shell with <div id="root">
├── package.json             — project config and dependencies
├── vite.config.js           — Vite bundler config
├── src/
│   ├── main.jsx             — entry point, mounts App
│   ├── App.jsx              — root component, owns all state
│   ├── style.css            — page styles
│   └── components/
│       ├── Houdini.jsx      — Exercise 1: toggle visibility with state
│       ├── Landing.jsx      — Exercise 2-4: welcome page
│       ├── Home.jsx         — Exercise 2-4: store list
│       └── Item.jsx         — Exercise 2-4: single store item with discount logic
└── README.md
```

---

## How to run the project

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## How to build the project

```bash
npm run build
```
