// Exercise 1: StringFormatter Module
//
// The module pattern wraps private logic inside a function.
// Only the returned object is public. Both functions here are stateless
// helpers, so no private state is needed — the pattern still applies.

const StringFormatter = function () {

  const capitalizeFirst = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const toSkewerCase = function (str) {
    return str.split(" ").join("-")
  }

  return {
    capitalizeFirst,
    toSkewerCase
  }
}

const formatter = StringFormatter()

console.log(formatter.capitalizeFirst("dorothy"))   // Dorothy
console.log(formatter.capitalizeFirst("DOROTHY"))   // Dorothy
console.log(formatter.capitalizeFirst("dOROThY"))   // Dorothy

console.log(formatter.toSkewerCase("blue box"))     // blue-box
