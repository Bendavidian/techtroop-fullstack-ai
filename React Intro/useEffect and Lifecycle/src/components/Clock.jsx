import { useState, useEffect } from 'react'

function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="clock-card">
      <h3>Current Time</h3>
      <p className="clock-time">{currentTime.toLocaleTimeString()}</p>
      <p className="clock-note">This clock updates every second using useEffect.</p>
      <p className="clock-cleanup">The interval is cleaned up when the component unmounts.</p>
    </div>
  )
}

export default Clock
