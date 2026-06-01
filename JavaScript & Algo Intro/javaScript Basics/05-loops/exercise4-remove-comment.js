const posts = [
  {
    id: 1,
    text: "Love this product",
    comments: []
  },
  {
    id: 2,
    text: "This is the worst. DON'T BUY!",
    comments: [
      { id: 1, text: "Idiot has no idea" },
      { id: 2, text: "Fool!" },
      { id: 3, text: "I agree!" }
    ]
  },
  {
    id: 3,
    text: "So glad I found this. Bought four already!",
    comments: []
  }
];

console.log("Before:");
console.log(JSON.stringify(posts, null, 2));

let targetPost = null;
for (let i = 0; i < posts.length; i++) {
  if (posts[i].id === 2) {
    targetPost = posts[i];
    break;
  }
}

if (targetPost !== null) {
  let commentIndex = -1;
  for (let j = 0; j < targetPost.comments.length; j++) {
    if (targetPost.comments[j].id === 3) {
      commentIndex = j;
      break;
    }
  }
  if (commentIndex !== -1) {
    targetPost.comments.splice(commentIndex, 1);
  }
}

console.log("After:");
console.log(JSON.stringify(posts, null, 2));
