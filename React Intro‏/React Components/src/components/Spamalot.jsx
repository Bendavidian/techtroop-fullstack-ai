import Spam from './Spam'

export default function Spamalot() {
  const spamItems = Array.from({ length: 500 })

  return (
    <>
      {spamItems.map((_, index) => (
        <Spam key={index} />
      ))}
    </>
  )
}
