const posts = [
  { id: 1, text: "Love this product" },
  { id: 2, text: "This is the worst. DON'T BUY!" },
  { id: 3, text: "So glad I found this. Bought four already!" }
];

console.log("Before:");
console.log(posts);

let indexToRemove = -1;
for (let i = 0; i < posts.length; i++) {
  if (posts[i].id === 2) {
    indexToRemove = i;
    break;
  }
}

if (indexToRemove !== -1) {
  posts.splice(indexToRemove, 1);
}

console.log("After:");
console.log(posts);
