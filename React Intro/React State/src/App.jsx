import { useState } from 'react'
import './style.css'
import Houdini from './components/Houdini'
import Landing from './components/Landing'
import Home from './components/Home'

function App() {
  const [appState, setAppState] = useState({
    user: 'Robyn',
    store: [
      { item: 'XSPS Pro Player', price: 800, discount: 0.2, hottest: false },
      { item: 'Gizem Backwatch', price: 230, discount: 0.6, hottest: false },
      { item: 'Surround Sound Pelican', price: 3099, discount: 0.05, hottest: true },
    ],
    shouldDiscount: false,
    currentPage: 'Landing',
  })

  const hottestItem = appState.store.find((storeItem) => storeItem.hottest)

  function showLanding() {
    setAppState({ ...appState, currentPage: 'Landing' })
  }

  function showHome() {
    setAppState({ ...appState, currentPage: 'Home' })
  }

  function toggleDiscount() {
    setAppState({ ...appState, shouldDiscount: !appState.shouldDiscount })
  }

  return (
    <div className="app">
      <h1>React State Exercises</h1>

      <section className="section">
        <h2 className="section-title">Exercise 1 - Houdini</h2>
        <div className="section-body">
          <Houdini />
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Exercises 2-4 - Store App</h2>
        <div className="section-body">
          <div className="controls">
            <button onClick={showLanding}>Show Landing</button>
            <button onClick={showHome}>Show Home</button>
            <button onClick={toggleDiscount}>
              {appState.shouldDiscount ? 'Remove Discount' : 'Apply Discount'}
            </button>
          </div>

          {appState.currentPage === 'Landing' && (
            <Landing
              user={appState.user}
              hottestItem={hottestItem}
            />
          )}

          {appState.currentPage === 'Home' && (
            <Home
              store={appState.store}
              shouldDiscount={appState.shouldDiscount}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default App
