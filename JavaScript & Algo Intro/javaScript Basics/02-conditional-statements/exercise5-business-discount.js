let customerType = "premium";
let purchaseAmount = 150;
let dayOfWeek = 6; 
const isWeekend = dayOfWeek === 6 || dayOfWeek === 0;

let discountPercent;

if (customerType === "vip") {
    discountPercent = 20;
} else if (customerType === "premium") {
    discountPercent = isWeekend ? 15 : 10;
} else {
    if (purchaseAmount > 100) {
    discountPercent = 10;
  } else if (purchaseAmount > 50) {
    discountPercent = 5;
  } else {
    discountPercent = 0;
  }
}

const discountAmount = (purchaseAmount * discountPercent) / 100;
const finalPrice = purchaseAmount - discountAmount;

console.log("Customer type:", customerType);
console.log("Purchase amount: $" + purchaseAmount);
console.log("Discount:", discountPercent + "%");
console.log("Final price: $" + finalPrice);
