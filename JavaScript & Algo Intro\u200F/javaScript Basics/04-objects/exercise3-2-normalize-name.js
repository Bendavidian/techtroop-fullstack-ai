const reservations = {
  Bob: { claimed: false },
  Ted: { claimed: true }
};

function checkReservationNormalized(inputName) {
  const normalizedInput = inputName.toLowerCase();

  const matchedKey = Object.keys(reservations).find(
    function(key) { return key.toLowerCase() === normalizedInput; }
  );

  if (matchedKey) {
    if (reservations[matchedKey].claimed === false) {
      console.log(inputName + ' => Welcome, ' + matchedKey);
    } else {
      console.log(inputName + ' => Hmm, someone already claimed this reservation');
    }
  } else {
    console.log(inputName + ' => You have no reservation');
  }
}

checkReservationNormalized("Bob");
checkReservationNormalized("Ted");
checkReservationNormalized("ted");
checkReservationNormalized("TeD");
checkReservationNormalized("Alice");
