const generateEmail = function () {
  return "Hello, here is your weekly update!"
}

const recipients = [
  { name: "Alice", sendEmail: function (email) { console.log("Sent to Alice:", email) } },
  { name: "Bob",   sendEmail: function (email) { console.log("Sent to Bob:", email) } },
  { name: "Carol", sendEmail: function (email) { console.log("Sent to Carol:", email) } }
]

const sendEmails = (email, recipients) => recipients.forEach(r => r.sendEmail(email))

const emailManager = function () {
  let email = generateEmail()
  sendEmails(email, recipients)
}

emailManager()
console.log("Time complexity of emailManager: O(n) — it loops through every recipient once, where n is the number of recipients")
