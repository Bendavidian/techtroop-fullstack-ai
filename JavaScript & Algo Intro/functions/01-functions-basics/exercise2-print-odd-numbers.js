function isEven(number) {
  return number % 2 === 0;
}

function printOddNumbers(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    if (!isEven(numbers[i])) {
      console.log(numbers[i]);
    }
  }
}

printOddNumbers([1, 2, 3, 4, 5]);
