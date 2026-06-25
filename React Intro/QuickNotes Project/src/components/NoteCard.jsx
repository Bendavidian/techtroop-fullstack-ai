import { formatDate } from '../utils/date.js'

function NoteCard({ note, categoryColor, onOpenNote, onDeleteNote }) {
  function handleDelete(event) {
    event.stopPropagation()
    onDeleteNote(note.id)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onOpenNote(note)
    }
  }

  return (
    <div
      className="note-card"
      style={{ backgroundColor: categoryColor }}
      onClick={() => onOpenNote(note)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="note-card-header">
        <span className="note-date">{formatDate(note.createdAt)}</span>
        <button className="btn-delete" onClick={handleDelete} title="Delete note">
          ×
        </button>
      </div>

      {note.updatedAt && (
        <p className="note-updated">Updated: {formatDate(note.updatedAt)}</p>
      )}

      {note.title && <h3 className="note-title">{note.title}</h3>}

      <p className="note-body">{note.body}</p>

      <span className="note-category-badge">{note.category}</span>
    </div>
  )
}

export default NoteCard
