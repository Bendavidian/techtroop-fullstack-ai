function Landing(props) {
  return (
    <div className="landing">
      <p>
        Welcome, {props.user}. The hottest item is{' '}
        <strong>{props.hottestItem.item}</strong> for ${props.hottestItem.price}
      </p>
    </div>
  )
}

export default Landing
