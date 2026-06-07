const args = process.argv.slice(2);

if (args.length < 3) {
  console.log("Usage: node calculator.js <number1> <operation> <number2>");
  process.exit(1);
}

const num1 = Number(args[0]);
const operation = args[1];
const num2 = Number(args[2]);

if (isNaN(num1) || isNaN(num2)) {
  console.log("Invalid input. Please provide valid numbers.");
  process.exit(1);
}

const validOperations = ["+", "-", "*", "/"];

if (!validOperations.includes(operation)) {
  console.log("Invalid operation. Please use one of: +, -, *, /");
  process.exit(1);
}

if (operation === "/" && num2 === 0) {
  console.log("Error: Division by zero is not allowed.");
  process.exit(1);
}

let result;
switch (operation) {
  case "+": result = num1 + num2; break;
  case "-": result = num1 - num2; break;
  case "*": result = num1 * num2; break;
  case "/": result = num1 / num2; break;
}

console.log(`${num1} ${operation} ${num2} = ${result}`);
