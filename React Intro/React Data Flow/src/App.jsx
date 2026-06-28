import Exercise1 from './components/Exercise1.jsx'
import Exercise2 from './components/Exercise2.jsx'
import './style.css'

function App() {
  return (
    <div className="app">
      <h1>React Data Flow Exercises</h1>
      <p className="subtitle">
        Data flows down through props, and callbacks flow up to update parent state.
      </p>

      <section className="exercise-section">
        <h2>Exercise 1 - Image Gallery</h2>
        <Exercise1 />
      </section>

      <section className="exercise-section">
        <h2>Exercises 2-7 - Conversation App</h2>
        <Exercise2 />
      </section>
    </div>
  )
}

export default App
