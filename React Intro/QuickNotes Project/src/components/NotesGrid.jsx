import NoteCard from './NoteCard.jsx'

function NotesGrid({ notes, categories, onOpenNote, onDeleteNote }) {
  if (notes.length === 0) {
    return <p className="no-notes">No notes found.</p>
  }

  function getCategoryColor(categoryName) {
    const found = categories.find((c) => c.name === categoryName)
    return found ? found.color : '#ffffff'
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          categoryColor={getCategoryColor(note.category)}
          onOpenNote={onOpenNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  )
}

export default NotesGrid
