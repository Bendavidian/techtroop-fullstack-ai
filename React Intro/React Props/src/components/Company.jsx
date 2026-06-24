function Company(props) {
  const explodedRevenue = props.revenue * 100

  return (
    <div className="card">
      <h2 className="card-name">{props.name}</h2>
      <p><span className="label">Country:</span> {props.country}</p>
      <p><span className="label">Revenue:</span> {props.revenue}</p>
      <p><span className="label">Exploded revenue:</span> {explodedRevenue}</p>
      <p><span className="label">Employees:</span> {props.employees.toLocaleString()}</p>
    </div>
  )
}

export default Company
