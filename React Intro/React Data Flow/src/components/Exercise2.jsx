import { useState } from 'react'
import List from './List.jsx'
import Conversation from './Conversation.jsx'

function Exercise2() {
  const [chatState, setChatState] = useState({
    displayConversation: null,
    conversations: [
      {
        with: "Laura",
        convo: [
          { text: "Hi", sender: "self" },
          { text: "You there?", sender: "self" },
          { text: "Yeah, hi, what's up?", sender: "other" }
        ]
      },
      {
        with: "Dad",
        convo: [
          { text: "Have you finished your school work yet?", sender: "other" },
          { text: "Yes.", sender: "self" },
          { text: "What do you mean, yes?", sender: "other" },
          { text: "??", sender: "self" }
        ]
      },
      {
        with: "Shoobert",
        convo: [
          { text: "Shoobert!!!", sender: "self" },
          { text: "Dude!!!!!!!!", sender: "other" },
          { text: "Shooooooooo BERT!", sender: "self" },
          { text: "You're my best friend", sender: "other" },
          { text: "No, *you're* my best friend", sender: "self" }
        ]
      }
    ]
  })

  const contacts = chatState.conversations.map(conversation => conversation.with)

  const displayConvo = (name) => {
    setChatState({
      ...chatState,
      displayConversation: name
    })
  }

  const goBack = () => {
    setChatState({
      ...chatState,
      displayConversation: null
    })
  }

  if (chatState.displayConversation === null) {
    return (
      <List
        contacts={contacts}
        onDisplayConversation={displayConvo}
      />
    )
  }

  const selectedConversation = chatState.conversations.find(
    conversation => conversation.with === chatState.displayConversation
  )

  return (
    <Conversation
      convo={selectedConversation.convo}
      sender={chatState.displayConversation}
      onBack={goBack}
    />
  )
}

export default Exercise2
