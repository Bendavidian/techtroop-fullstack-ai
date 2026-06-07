const prompt = require("prompt-sync")();

const questions = [
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the capital of France?", answer: "paris" },
  { question: "What year is it?", answer: "2026" }
];

let score = 0;

questions.forEach((q, index) => {
  const userAnswer = prompt(`Q${index + 1}: ${q.question} `);
  if (userAnswer === null) return;

  if (userAnswer.trim().toLowerCase() === q.answer.toLowerCase()) {
    console.log("Correct!");
    score++;
  } else {
    console.log(`Wrong! The correct answer was: ${q.answer}`);
  }
});

console.log(`\nFinal Score: ${score}/${questions.length} correct!`);
