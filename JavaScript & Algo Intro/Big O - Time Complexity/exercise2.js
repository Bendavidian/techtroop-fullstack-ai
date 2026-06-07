const complaints = [
  { text: "App crashes on login" },
  { text: "Payment page is broken" },
  { text: "Profile photo not saving" },
  { text: "Notifications not working" },
  { text: "Search returns wrong results" },
  { text: "Dark mode not toggling" },
  { text: "Logout button missing" },
  { text: "Maps not loading" }
]

const printSome = function (complaints) {
  for (let i = 1; i < complaints.length; i = i * 2) {
    console.log(complaints[i].text)
  }
}

printSome(complaints)
console.log("Time complexity: O(log n) — i doubles each iteration, so the number of steps grows logarithmically")
