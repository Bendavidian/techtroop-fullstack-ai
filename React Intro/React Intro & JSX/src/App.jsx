import './App.css'

function App() {
  const getStuff = () => "React is awesome!"

  const getMorningGreeting = () => <div>Good morning!</div>
  const getEveningGreeting = () => <div>Good evening!</div>

  const showCompany = (name, revenue) => (
    <div id={name}>{name} makes {revenue} every year</div>
  )

  let companies = [
    { name: "Tesla", revenue: 140 },
    { name: "Microsoft", revenue: 300 },
    { name: "Google", revenue: 600 }
  ]

  const getClassName = (temperature) => {
    if (temperature < 15) return "freezing"
    if (temperature <= 30) return "fair"
    return "hell-scape"
  }

  return (
    <div className="app">
      <h1>React Intro &amp; JSX</h1>

      <div className="ex-space">
        <h4 className="ex-title">Spot Check 1</h4>
        <div className="exercise" id="spotcheck-1">
          <h1>{getStuff()}</h1>
        </div>
      </div>

      <div className="ex-space">
        <h4 className="ex-title">Spot Check 2</h4>
        <div className="exercise" id="spotcheck-2">
          {new Date().getHours() < 12 ? getMorningGreeting() : getEveningGreeting()}
        </div>
      </div>

      <div className="ex-space">
        <h4 className="ex-title">Exercise 1</h4>
        <div className="exercise" id="ex-1">
          {companies.map((company) => (
            <div key={company.name}>
              {showCompany(company.name, company.revenue)}
            </div>
          ))}
        </div>
      </div>

      <div className="ex-space">
        <h4 className="ex-title">Exercise 2</h4>
        <div className="exercise" id="ex-2">
          <div id="weatherBox" className={getClassName(24)}></div>
        </div>
      </div>
    </div>
  )
}

export default App
