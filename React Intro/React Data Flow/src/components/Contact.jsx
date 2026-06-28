function Contact(props) {
  return (
    <button
      className="contact"
      onClick={() => props.onDisplayConversation(props.name)}
    >
      {props.name}
    </button>
  )
}

export default Contact
