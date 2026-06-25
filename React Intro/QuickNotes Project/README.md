# QuickNotes Project

A beginner-friendly React notes app built with Vite. Notes persist between page reloads using localStorage.

---

## Features

- Add notes with an optional title and required body text
- Display notes in a responsive grid
- Human-readable dates (e.g. Aug 31, 12:30 PM)
- Delete notes with a confirmation dialog
- Dynamic textarea that grows as you type
- Click a note to open a modal for viewing and editing
- Edit the title, body, and category inside the modal
- Updated date shown after editing
- Notes saved to localStorage — survive page reloads
- Assign a category (Personal, Work, Study, Important)
- Each category has a color that sets the note background
- Search notes by title or content
- Filter notes by category

---

## React Concepts Practiced

| Concept | Where |
|---|---|
| **Components** | NoteForm, NoteCard, NotesGrid, NoteModal, SearchBar, CategoryFilters |
| **Props** | All child components receive data and callbacks via props |
| **State** | useState for notes, selectedNote, searchTerm, activeCategory |
| **Controlled inputs** | All inputs use value + onChange |
| **Two-way binding** | Input values are always read from and written to state |
| **Events** | onClick, onChange, onSubmit, onKeyDown |
| **Conditional rendering** | Modal renders only when selectedNote is set; updatedAt only shown when it exists |
| **Lists and keys** | Notes rendered with .map() and key={note.id} |
| **localStorage** | Notes saved on every change with useEffect |
| **Modal state** | Custom modal controlled by selectedNote in App state |

---

## File Structure

```
QuickNotes Project/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── style.css
    ├── components/
    │   ├── NoteForm.jsx
    │   ├── NotesGrid.jsx
    │   ├── NoteCard.jsx
    │   ├── NoteModal.jsx
    │   ├── SearchBar.jsx
    │   └── CategoryFilters.jsx
    └── utils/
        └── date.js
```

---

## How to Run

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually http://localhost:5173).

## How to Build

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Notes on Persistence

Notes are stored in `localStorage` under the key `quicknotes-notes`. They survive page reloads and browser restarts. Clearing browser storage will remove all notes.
