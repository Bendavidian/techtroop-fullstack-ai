// ─────────────────────────────────────────────────────────────────────────────
// main.js — Tweeter Controller (MVC: Interaction Layer)
//
// The Controller connects the Model and the View.
// It listens for user events, calls the Model to update data,
// then calls the Renderer to refresh the page.
//
// Because posts and comments are added dynamically, ALL event listeners
// for post/comment elements use EVENT DELEGATION — they are attached to
// the static #posts container, not to the dynamic elements themselves.
// ─────────────────────────────────────────────────────────────────────────────

$(document).ready(function () {

  // Instantiate Model and Renderer
  var tweeter  = Tweeter();
  var renderer = Renderer();

  // Show the initial dummy posts on page load
  renderer.renderPosts(tweeter.getPosts());

  // ── Add a new post ──────────────────────────────────────────────────────────

  $('#twit-button').on('click', function () {
    var text = $('#input').val().trim();
    if (!text) return; // ignore empty input

    tweeter.addPost(text);
    $('#input').val('');
    renderer.renderPosts(tweeter.getPosts());
  });

  // Also allow Enter key to submit a post
  $('#input').on('keydown', function (event) {
    if (event.key === 'Enter') {
      $('#twit-button').trigger('click');
    }
  });

  // ── Delete a post (event delegation) ───────────────────────────────────────
  // Posts are dynamic, so we listen on the static #posts container.

  $('#posts').on('click', '.delete', function () {
    var postID = String($(this).data('id')); // e.g. "p1"
    tweeter.removePost(postID);
    renderer.renderPosts(tweeter.getPosts());
  });

  // ── Add a comment (event delegation) ───────────────────────────────────────
  // Find the parent post to get its ID, then read the input in that post.

  $('#posts').on('click', '.comment-button', function () {
    var $post   = $(this).closest('.post');
    var postID  = String($post.data('id'));          // e.g. "p1"
    var $input  = $post.find('.comment-input');
    var text    = $input.val().trim();

    if (!text) return; // ignore empty comment

    tweeter.addComment(postID, text);
    $input.val('');
    renderer.renderPosts(tweeter.getPosts());
  });

  // Allow Enter key inside a comment input to submit the comment
  $('#posts').on('keydown', '.comment-input', function (event) {
    if (event.key === 'Enter') {
      $(this).siblings('.comment-button').trigger('click');
    }
  });

  // ── Delete a comment (event delegation) ────────────────────────────────────
  // The x span carries the comment ID; we walk up to the post for the post ID.

  $('#posts').on('click', '.delete-comment', function () {
    var $post     = $(this).closest('.post');
    var postID    = String($post.data('id'));      // e.g. "p1"
    var commentID = String($(this).data('id'));    // e.g. "c2"

    tweeter.removeComment(postID, commentID);
    renderer.renderPosts(tweeter.getPosts());
  });

});
