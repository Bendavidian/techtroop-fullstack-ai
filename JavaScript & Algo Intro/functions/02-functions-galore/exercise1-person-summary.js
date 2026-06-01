const people_info = [
  {
    name: "Guido",
    age: 17,
    profession: "bungalow builder",
    catchphrase: "What a piece of wood!",
    city: "Sydurn",
    country: "Canaland"
  },
  {
    name: "Petra",
    age: 31,
    profession: "jet plane mechanic",
    catchphrase: "That's my engine, bub",
    city: "Bostork",
    country: "Greenmark"
  },
  {
    name: "Damian",
    age: 67,
    profession: "nursery assistant",
    catchphrase: "With great responsibility comes great power",
    city: "Bekyo",
    country: "Zimbia"
  }
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getAge(age) {
  if (age < 21) return "Underage";
  if (age > 55) return "55+";
  return age;
}

function capitalizeProfession(profession) {
  const words = profession.split(" ");
  const capitalized = [];
  for (let i = 0; i < words.length; i++) {
    capitalized.push(capitalize(words[i]));
  }
  return capitalized.join(" ");
}

function capitalizeCatchphrase(catchphrase) {
  return capitalize(catchphrase);
}

function formatLocation(city, country) {
  return city + ", " + country;
}

function getSummary(person) {
  const ageResult = getAge(person.age);
  const profession = capitalizeProfession(person.profession);
  const catchphrase = capitalizeCatchphrase(person.catchphrase);
  const location = formatLocation(person.city, person.country);

  let agePart;
  if (ageResult === "Underage") {
    agePart = "an Underage";
  } else if (ageResult === "55+") {
    agePart = "a 55+";
  } else {
    agePart = ageResult + " year old";
  }

  return (
    person.name + " is " + agePart + " " + profession +
    " from " + location + ". " +
    person.name + ' loves to say "' + catchphrase + '"'
  );
}

for (let i = 0; i < people_info.length; i++) {
  console.log(getSummary(people_info[i]));
}
