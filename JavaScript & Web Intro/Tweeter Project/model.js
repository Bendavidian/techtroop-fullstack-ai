// ─────────────────────────────────────────────────────────────────────────────
// model.js — Tweeter Model (MVC: Logic Layer)
//
// The Model is responsible for DATA ONLY.
// It has no idea that a browser, DOM, or jQuery exists.
// All posts and comments live here, hidden behind a public API.
// ─────────────────────────────────────────────────────────────────────────────

function Tweeter() {

  // ── Private data ────────────────────────────────────────────────────────────
  // Code outside this function cannot read or modify these variables directly.

  var posts = [
    {
      text: "First post!",
      id: "p1",
      comments: [
        { id: "c1", text: "First comment on first post!" },
        { id: "c2", text: "Second comment on first post!!" },
        { id: "c3", text: "Third comment on first post!!!" }
      ]
    },
    {
      text: "Aw man, I wanted to be first",
      id: "p2",
      comments: [
        { id: "c4", text: "Don't worry second poster, you'll be first one day." },
        { id: "c5", text: "Yeah, believe in yourself!" },
        { id: "c6", text: "Haha second place what a joke." }
      ]
    }
  ];

  // Counters start AFTER the dummy data IDs so generated IDs never collide
  var postIdCounter    = 3; // next post will be "p3"
  var commentIdCounter = 7; // next comment will be "c7"

  // ── Public functions ─────────────────────────────────────────────────────────

  // Return all posts (the Renderer reads this to know what to display)
  function getPosts() {
    return posts;
  }

  // Add a new post with an auto-generated ID
  function addPost(text) {
    posts.push({
      text: text,
      id: "p" + postIdCounter,
      comments: []
    });
    postIdCounter++;
  }

  // Remove a post by its ID
  function removePost(postID) {
    posts = posts.filter(function (post) {
      return post.id !== postID;
    });
  }

  // Add a comment to the post with the matching postID
  function addComment(postID, text) {
    var post = posts.find(function (p) { return p.id === postID; });
    if (!post) return;

    post.comments.push({
      id: "c" + commentIdCounter,
      text: text
    });
    commentIdCounter++;
  }

  // Remove a specific comment from a specific post
  function removeComment(postID, commentID) {
    var post = posts.find(function (p) { return p.id === postID; });
    if (!post) return;

    post.comments = post.comments.filter(function (c) {
      return c.id !== commentID;
    });
  }

  // Expose only the public API — posts and counters stay private
  return {
    getPosts:      getPosts,
    addPost:       addPost,
    removePost:    removePost,
    addComment:    addComment,
    removeComment: removeComment
  };
}
