import { useState } from 'react'

function Houdini() {
  const [houdiniState, setHoudiniState] = useState({
    show: false,
  })

  function handleToggle() {
    setHoudiniState({
      show: !houdiniState.show,
    })
  }

  return (
    <div className="houdini">
      <p className="houdini-message">
        {houdiniState.show ? 'Now you see me' : "Now you don't"}
      </p>
      <button onClick={handleToggle}>Toggle Houdini</button>
    </div>
  )
}

export default Houdini
