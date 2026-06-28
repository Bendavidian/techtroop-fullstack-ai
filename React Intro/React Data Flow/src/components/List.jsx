import Contact from './Contact.jsx'

function List(props) {
  return (
    <div className="contact-list">
      <h3>Contacts</h3>
      {props.contacts.map(contactName => (
        <Contact
          key={contactName}
          name={contactName}
          onDisplayConversation={props.onDisplayConversation}
        />
      ))}
    </div>
  )
}

export default List
