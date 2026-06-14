// ====================================
// DATA – single source of truth
// All posts live here. Nothing else
// stores or duplicates this state.
// ====================================

var posts = [
  {
    name: "Uncle Jerome",
    text: "Happy birthday kiddo!"
  },
  {
    name: "BFF Charlene",
    text: "HEARTS LOVE YOU FOREVER!"
  },
  {
    name: "Old High School Teacher",
    text: "Have a great birthday!"
  }
];


// ====================================
// RENDER – the ONLY place the DOM is
// updated. Always clears and rebuilds
// the timeline from the posts array.
// ====================================

function render() {
  var timeline = document.getElementById('timeline');

  // Clear existing DOM before rebuilding
  timeline.innerHTML = '';

  // Build one card per post
  posts.forEach(function(post, index) {

    var card = document.createElement('div');
    card.className = 'card';

    var nameEl = document.createElement('p');
    nameEl.className   = 'card-name';
    nameEl.textContent = post.name;

    var textEl = document.createElement('p');
    textEl.className   = 'card-text';
    textEl.textContent = post.text;

    var deleteBtn = document.createElement('button');
    deleteBtn.className   = 'delete-btn';
    deleteBtn.textContent = 'Delete';

    // EVENT – delete updates DATA, then calls render()
    // The element itself is never removed directly.
    deleteBtn.addEventListener('click', function() {
      posts.splice(index, 1); // update the array
      render();               // re-render from updated data
    });

    card.appendChild(nameEl);
    card.appendChild(textEl);
    card.appendChild(deleteBtn);
    timeline.appendChild(card);
  });
}


// ====================================
// EVENT – submit button
// Reads inputs → validates → pushes
// into posts array → clears inputs →
// calls render(). No direct DOM writes.
// ====================================

document.getElementById('submitBtn').addEventListener('click', function() {
  var nameInput = document.getElementById('nameInput');
  var textInput = document.getElementById('textInput');

  var name = nameInput.value.trim();
  var text = textInput.value.trim();

  // Validate: both fields must have content
  if (!name || !text) {
    return;
  }

  // Update the data
  posts.push({ name: name, text: text });

  // Clear inputs
  nameInput.value = '';
  textInput.value = '';

  // Re-render from updated data
  render();
});


// ====================================
// Initial render on page load
// ====================================

render();
