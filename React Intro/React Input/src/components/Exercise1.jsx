import { useState } from 'react'

function Exercise1() {
  const [person, setPerson] = useState({ name: '', age: '' })

  const handleChange = (event, property) => {
    setPerson({ ...person, [property]: event.target.value })
  }

  const goToBar = () => {
    alert(`Come in ${person.name}, you're ${person.age} - that's good enough`)
  }

  return (
    <div className="exercise-card">
      <p className="exercise-description">
        Use a state object to track multiple input values. Update state with the spread operator and computed property names.
      </p>

      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={person.name}
          onChange={(e) => handleChange(e, 'name')}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="age-input">Age:</label>
        <input
          id="age-input"
          type="number"
          value={person.age}
          onChange={(e) => handleChange(e, 'age')}
          placeholder="Enter your age"
        />
      </div>

      <button onClick={goToBar}>Go to Bar</button>

      <div className="preview">
        <p>Name: {person.name || 'No name yet'}</p>
        <p>Age: {person.age || 'No age yet'}</p>
      </div>
    </div>
  )
}

export default Exercise1
