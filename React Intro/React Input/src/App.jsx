import Exercise1 from './components/Exercise1.jsx'
import Exercise2 from './components/Exercise2.jsx'
import './style.css'

function App() {
  return (
    <div className="app">
      <h1>React Input Exercises</h1>
      <p className="intro">
        This project demonstrates controlled inputs, two-way binding, and updating React state from user input.
      </p>

      <section className="exercise-section">
        <h2>Exercise 1 - Person Form</h2>
        <Exercise1 />
      </section>

      <section className="exercise-section">
        <h2>Exercise 2 - Fruit Selector</h2>
        <Exercise2 />
      </section>
    </div>
  )
}

export default App
