import { useState, useEffect } from 'react'
import { formatDate } from '../utils/date.js'

function NoteModal({ note, categories, onClose, onUpdateNote, onDeleteNote }) {
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const [category, setCategory] = useState(note.category)

  useEffect(() => {
    setTitle(note.title)
    setBody(note.body)
    setCategory(note.category)
  }, [note])

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSave() {
    if (!body.trim()) return
    onUpdateNote(note.id, { title, body, category })
  }

  function handleDelete() {
    onDeleteNote(note.id)
  }

  function handleBodyChange(event) {
    setBody(event.target.value)
    event.target.style.height = 'auto'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-dates">
          <span>Created: {formatDate(note.createdAt)}</span>
          {note.updatedAt && (
            <span>Updated: {formatDate(note.updatedAt)}</span>
          )}
        </div>

        <input
          className="modal-title-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="modal-body-input"
          value={body}
          onChange={handleBodyChange}
          rows={6}
        />

        <div className="modal-category-row">
          <label htmlFor="modal-category">Category</label>
          <select
            id="modal-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
          <button className="btn-close" onClick={onClose}>
            Close
          </button>
          <button className="btn-delete-modal" onClick={handleDelete}>
            Delete Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal
