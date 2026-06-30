# useEffect and Lifecycle

A beginner React project that demonstrates **useEffect**, **component lifecycle**, and **fetching data after the first render**.

---

## What this project demonstrates

- How to run side effects in React using `useEffect`
- How component lifecycle works (mounting, updating, unmounting)
- How to set up and clean up intervals
- How to fetch data (simulated) after the component first renders
- How to use `async/await` inside `useEffect`
- How to handle loading and error states

---

## What is useEffect?

`useEffect` is a React hook that lets you run code **after a component renders**. It is used for side effects — things that happen outside the normal render flow, like:

- Setting up a timer
- Fetching data from an API
- Adding event listeners
- Subscribing to a data stream

```js
useEffect(() => {
  // this runs after the component renders
}, []) // empty array = runs only once, when the component first mounts
```

---

## What is component lifecycle?

Every React component goes through three phases:

1. **Mounting** — the component is created and added to the DOM for the first time.
2. **Updating** — the component re-renders because state or props changed.
3. **Unmounting** — the component is removed from the DOM.

`useEffect` lets you hook into these phases:

- An effect with `[]` runs **only on mount**.
- An effect with values in `[dep]` runs **when those values change**.
- The **cleanup function** (returned from `useEffect`) runs **on unmount** (or before the next effect fires).

---

## Exercise 1 — Current Time Clock

`Exercise1` renders a `Clock` component.

`Clock` uses `useState` to store the current time and `useEffect` to start a `setInterval` that ticks every 1000ms (1 second), updating the time in state.

### Why cleanup with clearInterval?

Without cleanup, the interval keeps running even after the component is removed from the page. This causes:

- Memory leaks
- Errors when the interval tries to call `setCurrentTime` on an unmounted component

The cleanup function calls `clearInterval(intervalId)` so the interval stops when the component unmounts.

```js
useEffect(() => {
  const intervalId = setInterval(() => {
    setCurrentTime(new Date())
  }, 1000)

  return () => {
    clearInterval(intervalId) // cleanup on unmount
  }
}, []) // empty array = runs only on mount
```

---

## Exercise 2 — Top Posts

`Exercise2` fetches 10 posts from mock data and displays them in a grid using `PostCard` components.

### Why useEffect with an empty dependency array?

An empty `[]` means "run this effect only once, when the component first mounts." This is the correct way to fetch data that should only load once.

### How async/await is used inside useEffect

`useEffect` cannot be made async directly (it would return a Promise, not a cleanup function). Instead, define an `async` function inside the effect and call it immediately:

```js
useEffect(() => {
  const fetchPosts = async () => {
    const data = await getPosts()
    setPosts(data.slice(0, 10))
  }

  fetchPosts()
}, [])
```

### Why the cleanup flag (isMounted) is used

If the component unmounts before the async call finishes, calling `setPosts` on an unmounted component can cause errors or warnings. The `isMounted` flag prevents this:

```js
useEffect(() => {
  let isMounted = true

  const fetchPosts = async () => {
    const data = await getPosts()
    if (isMounted) {
      setPosts(data.slice(0, 10))
    }
  }

  fetchPosts()

  return () => {
    isMounted = false // cleanup: stop state updates if unmounted
  }
}, [])
```

---

## Components

| Component | Responsibility |
|---|---|
| `App` | Root component — renders Exercise1 and Exercise2 sections |
| `Exercise1` | Wrapper that renders Clock with a description |
| `Clock` | Displays current time, updates every second, cleans up interval on unmount |
| `Exercise2` | Fetches posts on mount, manages loading/error state, renders grid of PostCards |
| `PostCard` | Displays a single post's title and body |

---

## How to run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## How to build

```bash
npm run build
```
