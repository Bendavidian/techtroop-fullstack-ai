const dictionary = {
  "A": ["Aardvark", "Abacus", "Actually", "Atomic"],
  "B": ["Banana", "Bonkers", "Brain", "Bump"],
  "C": ["Callous", "Chain", "Coil", "Czech"]
};

const letters = Object.keys(dictionary);

for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  console.log("Words that begin with " + letter + ":");
  for (let j = 0; j < dictionary[letter].length; j++) {
    console.log(dictionary[letter][j]);
  }
  console.log("");
}
