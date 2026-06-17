// ─────────────────────────────────────────────────────────────────────────────
// render.js — Tweeter Renderer / View (MVC: Display Layer)
//
// The Renderer is responsible for DISPLAY ONLY.
// It receives data from the Model and builds DOM elements with jQuery.
// It never modifies the data array — that is the Model's job.
// ─────────────────────────────────────────────────────────────────────────────

function Renderer() {

  // ── Private helper: build one comment element ────────────────────────────────

  function createCommentEl(comment) {
    // <div class="comment" data-id="c1">
    var $comment = $('<div>')
      .addClass('comment')
      .attr('data-id', comment.id);

    // <span class="delete-comment" data-id="c1">x</span>
    var $x = $('<span>')
      .addClass('delete-comment')
      .attr('data-id', comment.id)
      .text('x');

    // Comment text as a safe text node (no innerHTML risk)
    var textNode = document.createTextNode(' ' + comment.text);

    $comment.append($x);
    $comment.append(textNode);

    return $comment;
  }

  // ── Private helper: build one post element ───────────────────────────────────

  function createPostEl(post) {
    // <div class="post" data-id="p1">
    var $post = $('<div>')
      .addClass('post')
      .attr('data-id', post.id);

    // Post text
    var $postText = $('<div>')
      .addClass('post-text')
      .text(post.text);

    // Comments wrapper
    var $comments = $('<div>').addClass('comments');
    post.comments.forEach(function (comment) {
      $comments.append(createCommentEl(comment));
    });

    // Comment form: input + button side by side
    var $commentForm = $('<div>').addClass('comment-form');

    var $commentInput = $('<input>')
      .attr('type', 'text')
      .addClass('comment-input')
      .attr('placeholder', 'Got something to say?');

    var $commentBtn = $('<button>')
      .addClass('comment-button')
      .text('Comment');

    $commentForm.append($commentInput).append($commentBtn);

    // Delete post button
    var $deleteBtn = $('<button>')
      .addClass('delete')
      .attr('data-id', post.id)
      .text('Delete Post');

    // Assemble post card in visual order
    $post
      .append($postText)
      .append($comments)
      .append($commentForm)
      .append($deleteBtn);

    return $post;
  }

  // ── Public: render all posts into #posts ─────────────────────────────────────

  function renderPosts(posts) {
    var $container = $('#posts');

    // Empty before re-rendering — prevents duplicate content
    $container.empty();

    posts.forEach(function (post) {
      $container.append(createPostEl(post));
    });
  }

  return {
    renderPosts: renderPosts
  };
}
