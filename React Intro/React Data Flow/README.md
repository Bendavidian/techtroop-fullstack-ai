# React Data Flow

A beginner React project that demonstrates **data flow** in React applications.

## What this project demonstrates

React components communicate in two directions:

- **Data down (props):** A parent component passes data to its children through props. Children receive the data but do not own it.
- **Callbacks up:** A parent component passes a function (callback) down as a prop. When a child needs to update the parent's state, it calls that function. The parent then updates its own state.

---

## Exercise 1 – Image Gallery

`Exercise1` manages its own state containing an array of image URLs and a `currentImg` index.

- `shiftImageBack` decrements `currentImg` (wraps to last image at 0).
- `shiftImageForward` increments `currentImg` (wraps to 0 at the last image).
- Two buttons — **Previous** and **Next** — call these methods.
- The displayed image is always `images[currentImg]`.

---

## Exercises 2–7 – Conversation App

### Overview

`Exercise2` owns all the state for the conversation app. Depending on `displayConversation`, it shows either the contact list or the selected conversation.

### Exercise 2 – Base state in Exercise2

`Exercise2` holds `chatState` with `conversations` (array of chat objects) and `displayConversation` (null or a contact name).

### Exercise 3 – Pass contacts to List

`Exercise2` derives a `contacts` array from `conversations` using `.map()` and passes it to `List` as props. No hardcoding.

### Exercise 4 – Contact and List components

`List` receives `contacts` and renders a `Contact` component for each one. `Contact` displays the name and is clickable.

### Exercise 5 – Updating displayConversation

`Exercise2` defines `displayConvo(name)`, which updates `displayConversation` in state. It passes this function down to `List`, which passes it to each `Contact`. When a contact is clicked, `Contact` calls `props.onDisplayConversation(props.name)`.

### Exercise 6 – Conversation component

`Conversation` receives the conversation array (`convo`), the contact name (`sender`), and a `onBack` callback. It renders each message in its own `div`, with the sender in a `span.sender`. Self messages show "Me"; other messages show the contact's name.

### Exercise 7 – Back button

`Exercise2` defines `goBack()`, which sets `displayConversation` back to `null`. Passed to `Conversation` as `onBack`. Clicking Back returns the user to the contact list.

---

## Components

| Component | Responsibility |
|---|---|
| `App` | Root component — renders Exercise1 and Exercise2 sections |
| `Exercise1` | Image gallery with Previous/Next navigation |
| `Exercise2` | Owns conversation state; conditionally renders List or Conversation |
| `List` | Receives contacts array, renders a Contact for each one |
| `Contact` | Displays a contact name as a clickable button; fires callback on click |
| `Conversation` | Displays messages for the selected conversation; has a Back button |

---

## How props flow down

```
Exercise2 (owns state)
  └── List (receives contacts, onDisplayConversation)
        └── Contact (receives name, onDisplayConversation)
```

```
Exercise2 (owns state)
  └── Conversation (receives convo, sender, onBack)
```

---

## How callbacks flow up

1. `Exercise2` defines `displayConvo` and passes it to `List` as `onDisplayConversation`.
2. `List` passes it to each `Contact` as `onDisplayConversation`.
3. `Contact` calls `props.onDisplayConversation(props.name)` on click.
4. This triggers `Exercise2` to update its state — `displayConversation` is set to the clicked name.
5. `Exercise2` re-renders and shows `Conversation` instead of `List`.

Similarly, `goBack` flows down to `Conversation` as `onBack`, and clicking Back sets `displayConversation` back to `null`.

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
