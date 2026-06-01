function isArmstrong(number) {
  const digits = String(number).split("");
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += Math.pow(Number(digits[i]), 3);
  }
  return sum === number;
}

console.log("3-digit Armstrong numbers:");
for (let n = 100; n <= 999; n++) {
  if (isArmstrong(n)) {
    console.log(n);
  }
}
