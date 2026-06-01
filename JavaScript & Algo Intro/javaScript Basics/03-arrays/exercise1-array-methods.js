const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Original:", numbers);

numbers.splice(1, 2);
console.log("After removing 2nd and 3rd elements:", numbers);

numbers[3] = 1;
console.log("After changing 4th element to 1:", numbers);

numbers.splice(numbers.length - 4, 4);
console.log("After removing last 4 elements:", numbers);

numbers.unshift(0);
console.log("After adding 0 to the beginning:", numbers);

console.log("Final array:", numbers);
