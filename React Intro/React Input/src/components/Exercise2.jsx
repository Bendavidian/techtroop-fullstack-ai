import { useState } from 'react'

function Exercise2() {
  const [name, setName] = useState('')
  const [fruit, setFruit] = useState('')

  const handleFruitChange = (event) => {
    const selectedFruit = event.target.value
    setFruit(selectedFruit)
    console.log(`${name} selected ${selectedFruit}`)
  }

  return (
    <div className="exercise-card">
      <p className="exercise-description">
        Use separate state variables for each input. Notice how the select uses value and onChange just like a text input.
      </p>

      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="select-input">Favourite Fruit:</label>
        <select
          id="select-input"
          value={fruit}
          onChange={handleFruitChange}
        >
          <option value="">Choose a fruit</option>
          <option value="Apple">Apple</option>
          <option value="Banana">Banana</option>
          <option value="Orange">Orange</option>
          <option value="Mango">Mango</option>
        </select>
      </div>

      <div className="preview">
        <p>{name || 'No name yet'} selected {fruit || 'no fruit yet'}</p>
      </div>
    </div>
  )
}

export default Exercise2
