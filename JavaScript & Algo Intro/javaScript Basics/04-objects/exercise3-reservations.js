const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
};

function checkReservation(name) {
  if (reservations[name]) {
    if (reservations[name].claimed === false) {
      console.log("Welcome, " + name);
    } else {
      console.log("Hmm, someone already claimed this reservation");
    }
  } else {
    console.log("You have no reservation");
  }
}

const name1 = "Bob";
checkReservation(name1);

const name2 = "Ted";
checkReservation(name2);

const name3 = "Alice";
checkReservation(name3);
