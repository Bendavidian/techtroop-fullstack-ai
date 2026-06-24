# React Props

## What this exercise demonstrates

This project shows how to pass data from a **parent component** (`App`) down to a **child component** (`Company`) using **props**.

---

## What are props?

Props (short for "properties") are how React components receive data from their parent. You pass props like HTML attributes, and the child component reads them via the `props` object.

```jsx
// Parent passes props:
<Company name="Tesla" revenue={140} country="USA" employees={127000} />

// Child reads props:
function Company(props) {
  return <p>{props.name}</p>
}
```

---

## What is top-down data flow?

React data flows in **one direction: from parent to child**. The parent owns the data and passes it down. The child can only read the props it receives — it cannot change the parent's data. This makes the code predictable and easy to debug.

```
App (parent — owns the companies array)
  └── Company (child — receives name, revenue, country, employees)
  └── Company
  └── Company
  └── Company
```

---

## Why do we use map?

Instead of writing `<Company />` four times manually, we use `.map()` to loop over the `companies` array and render one `Company` component per item automatically. This keeps the code DRY and works no matter how many companies are in the array.

---

## Why does React need a key prop when rendering lists?

When React renders a list of elements, it needs a way to identify each one so it can update the DOM efficiently. The `key` prop gives each element a stable, unique identity. Without it, React shows a console warning and may re-render elements incorrectly.

```jsx
companies.map((company) => (
  <Company key={company.id} name={company.name} ... />
))
```

---

## File structure

```
React Props/
├── index.html          — HTML shell with <div id="root">
├── package.json        — project config and dependencies
├── vite.config.js      — Vite bundler config
├── src/
│   ├── main.jsx        — entry point, mounts App into the DOM
│   ├── App.jsx         — parent component, holds the companies array
│   ├── style.css       — page and card styles
│   └── components/
│       └── Company.jsx — child component, displays one company's data
└── README.md
```

---

## How to run the project

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```
