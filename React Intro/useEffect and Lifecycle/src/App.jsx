import Exercise1 from './components/Exercise1.jsx'
import Exercise2 from './components/Exercise2.jsx'
import './style.css'

function App() {
  return (
    <div className="app">
      <h1>useEffect and Lifecycle Exercises</h1>
      <p className="subtitle">
        This project demonstrates useEffect, component lifecycle, cleanup functions, and fetching data after the first render.
      </p>

      <section className="exercise-section">
        <h2>Exercise 1 - Current Time</h2>
        <Exercise1 />
      </section>

      <section className="exercise-section">
        <h2>Exercise 2 - Top Posts</h2>
        <Exercise2 />
      </section>
    </div>
  )
}

export default App
