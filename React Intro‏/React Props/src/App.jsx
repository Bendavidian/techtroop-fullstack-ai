import './style.css'
import Company from './components/Company'

const companies = [
  { id: 1, name: 'Tesla', revenue: 140, country: 'USA', employees: 127000 },
  { id: 2, name: 'Microsoft', revenue: 300, country: 'USA', employees: 221000 },
  { id: 3, name: 'Google', revenue: 600, country: 'USA', employees: 190000 },
  { id: 4, name: 'Samsung', revenue: 250, country: 'South Korea', employees: 270000 },
]

function App() {
  return (
    <div className="app">
      <h1>React Props</h1>
      <p className="subtitle">
        Data flows from the parent component into the child component using props.
      </p>

      <div className="grid">
        {companies.map((company) => (
          <Company
            key={company.id}
            name={company.name}
            revenue={company.revenue}
            country={company.country}
            employees={company.employees}
          />
        ))}
      </div>
    </div>
  )
}

export default App
