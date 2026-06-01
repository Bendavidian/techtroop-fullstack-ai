const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
};

function handleReservation(name) {
  if (reservations[name]) {
    if (reservations[name].claimed === false) {
      console.log("Welcome, " + name);
    } else {
      console.log("Hmm, someone already claimed this reservation");
    }
  } else {
    reservations[name] = { claimed: true };
    console.log("New reservation created and claimed for: " + name);
  }
}

handleReservation("Bob");
handleReservation("Ted");
handleReservation("Alice");

console.log("\nUpdated reservations object:");
console.log(reservations);
