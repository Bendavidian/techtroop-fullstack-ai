const studentAnswers = {
  brBlds: {
    1: "a",
    2: "a",
    3: "c"
  },
  dvOna: {
    1: "a",
    2: "c",
    3: "c"
  },
  nmPrz: {
    1: "a",
    2: "b",
    3: "a"
  }
}

const studentGithubs = ["brBlds", "dvOna", "nmPrz"]

const distributions = {
  1: {},
  2: {},
  3: {}
}

const getDistributions = function (studentAnswers) {
  studentGithubs.forEach(sg => {
    let answers = studentAnswers[sg]

    Object.keys(answers).forEach(questionNumber => {
      let letterAnswer = answers[questionNumber]

      distributions[questionNumber][letterAnswer]
        ? distributions[questionNumber][letterAnswer]++
        : distributions[questionNumber][letterAnswer] = 1
    })
  })

  return distributions
}

const result = getDistributions(studentAnswers)

console.log("Distributions:", result)
console.log("Time complexity: O(s * q) — s = number of students, q = number of questions per student")
console.log("In this specific example it behaves like O(1) because the input is hardcoded, but the general case is O(s * q)")
