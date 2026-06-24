import './App.css'
import Dummy from './components/Dummy'
import Spamalot from './components/Spamalot'
import NavBar from './components/NavBar'
import Menu from './components/Menu'
import Checkout from './components/Checkout'

function App() {
  return (
    <div className="app">
      <h1>React Components</h1>

      <section className="ex-space">
        <h2 className="ex-title">Exercise 1</h2>
        <div className="exercise" id="ex-1">
          <Dummy />
        </div>
      </section>

      <section className="ex-space">
        <h2 className="ex-title">Exercise 2</h2>
        <div className="exercise" id="ex-2">
          <Spamalot />
        </div>
      </section>

      <section className="ex-space">
        <h2 className="ex-title">Exercise 3</h2>
        <div className="exercise" id="ex-3">
          <p>See COMPONENT_TREE.md for the Exercise 2 component tree.</p>
        </div>
      </section>

      <section className="ex-space">
        <h2 className="ex-title">Exercise 4</h2>
        <div className="exercise" id="ex-4">
          <NavBar />
          <Menu />
          <Checkout />
        </div>
      </section>
    </div>
  )
}

export default App
