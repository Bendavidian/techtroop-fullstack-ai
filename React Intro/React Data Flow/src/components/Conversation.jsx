function Conversation(props) {
  return (
    <div className="conversation">
      <h3>Conversation with {props.sender}</h3>
      <div className="messages">
        {props.convo.map((message, index) => (
          <div
            key={`${message.sender}-${message.text}-${index}`}
            className={`message ${message.sender}`}
          >
            <span className="sender">
              {message.sender === 'self' ? 'Me' : props.sender}
            </span>
            {': '}
            {message.text}
          </div>
        ))}
      </div>
      <button className="back" onClick={props.onBack}>Back</button>
    </div>
  )
}

export default Conversation
