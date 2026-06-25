import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm.jsx'
import NotesGrid from './components/NotesGrid.jsx'
import NoteModal from './components/NoteModal.jsx'
import SearchBar from './components/SearchBar.jsx'
import CategoryFilters from './components/CategoryFilters.jsx'
import './style.css'

const categories = [
  { name: 'Personal', color: '#fff8b5' },
  { name: 'Work', color: '#d8ecff' },
  { name: 'Study', color: '#e4ffd8' },
  { name: 'Important', color: '#ffd8d8' },
]

function loadNotesFromStorage() {
  try {
    const stored = localStorage.getItem('quicknotes-notes')
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore corrupt data
  }
  return []
}

function App() {
  const [notes, setNotes] = useState(loadNotesFromStorage)
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    localStorage.setItem('quicknotes-notes', JSON.stringify(notes))
  }, [notes])

  function addNote(noteData) {
    if (!noteData.body.trim()) return
    const newNote = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      title: noteData.title,
      body: noteData.body,
      category: noteData.category,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    }
    setNotes((prev) => [newNote, ...prev])
  }

  function deleteNote(noteId) {
    const confirmed = window.confirm('Are you sure you want to delete your note?')
    if (!confirmed) return
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
    if (selectedNote && selectedNote.id === noteId) {
      setSelectedNote(null)
    }
  }

  function openNote(note) {
    setSelectedNote(note)
  }

  function closeModal() {
    setSelectedNote(null)
  }

  function updateNote(noteId, updatedData) {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n
        const updated = {
          ...n,
          title: updatedData.title,
          body: updatedData.body,
          category: updatedData.category,
          updatedAt: new Date().toISOString(),
        }
        if (selectedNote && selectedNote.id === noteId) {
          setSelectedNote(updated)
        }
        return updated
      })
    )
  }

  const filteredNotes = notes.filter((note) => {
    const term = searchTerm.toLowerCase()
    const matchesSearch =
      !term ||
      note.title.toLowerCase().includes(term) ||
      note.body.toLowerCase().includes(term)
    const matchesCategory =
      activeCategory === 'All' || note.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">
      <h1>QuickNotes Project</h1>
      <p className="app-description">
        Add, view, edit, delete, search, filter, and save your notes.
      </p>

      <NoteForm onAddNote={addNote} categories={categories} />

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <CategoryFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <NotesGrid
        notes={filteredNotes}
        categories={categories}
        onOpenNote={openNote}
        onDeleteNote={deleteNote}
      />

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          categories={categories}
          onClose={closeModal}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
        />
      )}
    </div>
  )
}

export default App
