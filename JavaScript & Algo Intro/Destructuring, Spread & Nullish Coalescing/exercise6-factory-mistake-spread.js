// Current (wrong) state
let meatArr = ["beef", "chicken"];
let vegetableArr = ["rabbit", "carrots", "potatoes", "lettuce"];

// "rabbit" is misplaced in vegetableArr — use destructuring to extract it,
// then use spread to place it back into meatArr.
let [misplacedMeat, ...fixedVegetableArr] = vegetableArr;
let fixedMeatArr = [...meatArr, misplacedMeat];

console.log("Meat:      ", fixedMeatArr);      // ["beef", "chicken", "rabbit"]
console.log("Vegetables:", fixedVegetableArr); // ["carrots", "potatoes", "lettuce"]
