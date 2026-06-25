import { useState } from 'react'

function NoteForm({ onAddNote, categories }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Personal')

  function handleSubmit(event) {
    event.preventDefault()
    if (!body.trim()) return
    onAddNote({ title, body, category })
    setTitle('')
    setBody('')
    setCategory('Personal')
  }

  function handleBodyChange(event) {
    setBody(event.target.value)
    event.target.style.height = 'auto'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        className="form-title-input"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="form-body-input"
        placeholder="Your note..."
        value={body}
        onChange={handleBodyChange}
        rows={3}
      />
      <div className="form-bottom-row">
        <div className="form-group">
          <label htmlFor="form-category">Category</label>
          <select
            id="form-category"
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
        <button type="submit" className="btn-add">
          Add
        </button>
      </div>
    </form>
  )
}

export default NoteForm
