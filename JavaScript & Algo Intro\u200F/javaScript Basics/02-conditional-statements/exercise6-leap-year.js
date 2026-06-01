let year = 2024;

let isLeap;

if (year % 400 === 0) {
    isLeap = true;
} else if (year % 100 === 0) {
    isLeap = false;
} else if (year % 4 === 0) {
    isLeap = true;
} else {
    isLeap = false;
}

if (isLeap) {
  console.log(year + " is a leap year.");
} else {
  console.log(year + " is not a leap year.");
}
