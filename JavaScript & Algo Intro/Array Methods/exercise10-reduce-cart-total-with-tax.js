const cartItems = [
  { name: "T-shirt", price: 19.99, category: "clothing", quantity: 2 },
  { name: "Laptop", price: 1299.99, category: "electronics", quantity: 1 },
  { name: "Coffee Beans", price: 12.99, category: "food", quantity: 3 },
  { name: "Headphones", price: 89.99, category: "electronics", quantity: 1 },
  { name: "Jeans", price: 59.99, category: "clothing", quantity: 1 }
];

const taxRates = {
  clothing: 0.08,
  electronics: 0.10,
  food: 0.05
};

const total = cartItems.reduce((sum, item) => {
  const itemTotal = item.price * item.quantity;
  const taxMultiplier = 1 + taxRates[item.category];
  return sum + itemTotal * taxMultiplier;
}, 0);

console.log(total);
