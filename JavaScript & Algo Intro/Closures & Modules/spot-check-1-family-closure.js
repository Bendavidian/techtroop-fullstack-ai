// Spot Check 1: Family Closure
//
// Demonstrates how a closure keeps the private members array alive
// even after Family() has finished running.
// birth has access to members via its closure — members is never exposed.

const Family = function () {
  const members = []           // private — not returned, not accessible outside

  const birth = function (name) {
    members.push(name)
    console.log(members)
  }

  return birth                 // expose only birth, not members
}

const giveBirth = Family()

giveBirth("Avi")
giveBirth("Narkis")
giveBirth("Shira")
