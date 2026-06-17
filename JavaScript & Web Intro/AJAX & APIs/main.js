// ─────────────────────────────────────────────────────────────────────────────
// AJAX & APIs — main.js
//
// Exercises:
//   1. fetchBookByISBN(isbn)        – Google Books by ISBN (console only)
//   2. fetchBook(queryType, value)  – Generalized Google Books (first result)
//   3. Loops all items with forEach – Renders every book returned by the API
//   4. loadCatsGif()                – Giphy hard-coded "cats" search
//   5. searchGif(query)             – Giphy user-driven search with validation
// ─────────────────────────────────────────────────────────────────────────────

// ─── Giphy API Key ────────────────────────────────────────────────────────────
// Sign up for a free key at: https://developers.giphy.com/
//   1. Click "Create an App"
//   2. Choose "API" (not SDK)
//   3. Copy your API Key and paste it below
const GIPHY_API_KEY = "YOUR_GIPHY_API_KEY";

// ─── DOM References ───────────────────────────────────────────────────────────
const bookLoading    = document.querySelector("#book-loading");
const bookResults    = document.querySelector("#book-results");
const queryTypeEl    = document.querySelector("#query-type");
const queryValueEl   = document.querySelector("#query-value");
const fetchBookBtn   = document.querySelector("#fetch-book-btn");

const loadCatsBtn    = document.querySelector("#load-cats-btn");
const giphyInput     = document.querySelector("#giphy-input");
const giphySearchBtn = document.querySelector("#giphy-search-btn");
const giphyMessage   = document.querySelector("#giphy-message");
const giphyLoading   = document.querySelector("#giphy-loading");
const giphyResult    = document.querySelector("#giphy-result");

// ─── Utility helpers ──────────────────────────────────────────────────────────

// Toggle a loading spinner on or off
function setBookLoading(visible) {
  bookLoading.classList.toggle("hidden", !visible);
}

function setGiphyLoading(visible) {
  giphyLoading.classList.toggle("hidden", !visible);
}

// Show a coloured message inside the Giphy section
function showGiphyMessage(text, type) {
  giphyMessage.textContent = text;
  giphyMessage.className = "message " + type;
}

function hideGiphyMessage() {
  giphyMessage.className = "message hidden";
  giphyMessage.textContent = "";
}

// Remove all children from the book-results container
function clearBookResults() {
  while (bookResults.firstChild) {
    bookResults.removeChild(bookResults.firstChild);
  }
}

// Extract the best available ISBN from a volumeInfo object
function extractISBN(volumeInfo) {
  if (!volumeInfo.industryIdentifiers) return "N/A";
  var isbn13 = volumeInfo.industryIdentifiers.find(function (id) {
    return id.type === "ISBN_13";
  });
  var fallback = volumeInfo.industryIdentifiers[0];
  return isbn13 ? isbn13.identifier : (fallback ? fallback.identifier : "N/A");
}

// Build and return a DOM card for one book
function createBookCard(volumeInfo) {
  var isbn    = extractISBN(volumeInfo);
  var authors = volumeInfo.authors ? volumeInfo.authors.join(", ") : "Unknown author";
  var date    = volumeInfo.publishedDate || "";
  var publisher = volumeInfo.publisher || "";

  // Outer card
  var card = document.createElement("div");
  card.className = "book-card";

  // Title
  var title = document.createElement("div");
  title.className = "book-title";
  title.textContent = volumeInfo.title || "Untitled";
  card.appendChild(title);

  // Meta line: author · publisher · date · ISBN badge
  var meta = document.createElement("div");
  meta.className = "book-meta";

  var authorSpan = document.createElement("span");
  authorSpan.textContent = authors;
  meta.appendChild(authorSpan);

  if (publisher) {
    var pubSpan = document.createElement("span");
    pubSpan.textContent = publisher;
    meta.appendChild(pubSpan);
  }

  if (date) {
    var dateSpan = document.createElement("span");
    dateSpan.textContent = date;
    meta.appendChild(dateSpan);
  }

  var isbnBadge = document.createElement("span");
  isbnBadge.className = "book-isbn";
  isbnBadge.textContent = isbn;
  meta.appendChild(isbnBadge);

  card.appendChild(meta);

  // Description
  var desc = document.createElement("div");
  desc.className = "book-description";
  desc.textContent = volumeInfo.description || "No description available.";
  card.appendChild(desc);

  return card;
}

// Render a "nothing found" message
function renderEmptyState(text) {
  var p = document.createElement("p");
  p.className = "empty-state";
  p.textContent = text;
  bookResults.appendChild(p);
}

// Replace any previous GIF with a new iframe
function displayGif(embedUrl) {
  while (giphyResult.firstChild) {
    giphyResult.removeChild(giphyResult.firstChild);
  }
  var iframe = document.createElement("iframe");
  iframe.src = embedUrl;
  iframe.setAttribute("allowFullScreen", "");
  iframe.title = "Giphy animation";
  giphyResult.appendChild(iframe);
}

// ─── Exercise 1: fetchBookByISBN ──────────────────────────────────────────────
// Fetches one book by its exact ISBN-13 (or ISBN-10).
// Prints the full response object and key fields to the console.

function fetchBookByISBN(isbn) {
  var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;

  console.group("Exercise 1 — fetchBookByISBN(" + isbn + ")");

  $.ajax({
    url:    url,
    method: "GET",

    success: function (data) {
      // Print the full JSON object so students can explore the structure
      console.log("Full response object:", data);

      if (data.totalItems === 0 || !data.items) {
        console.warn("No book found for ISBN:", isbn);
        console.groupEnd();
        return;
      }

      var info = data.items[0].volumeInfo;

      console.log("Title         :", info.title          || "N/A");
      console.log("Authors       :", info.authors        ? info.authors.join(", ") : "N/A");
      console.log("Description   :", info.description    || "N/A");
      console.log("Publisher     :", info.publisher      || "N/A");
      console.log("Published Date:", info.publishedDate  || "N/A");
      console.log("ISBN          :", extractISBN(info));
      console.groupEnd();
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Request failed —", textStatus, errorThrown);
      console.groupEnd();
    }
  });
}

// ─── Exercise 2: fetchBook (generalized) ──────────────────────────────────────
// Accepts any Google Books query type (isbn, intitle, inauthor …).
// Logs the first result's key fields, then hands the full response to
// Exercise 3 to render all items on the page.

function fetchBook(queryType, queryValue) {
  var url = "https://www.googleapis.com/books/v1/volumes?q="
    + queryType + ":" + encodeURIComponent(queryValue);

  console.group("Exercise 2 — fetchBook(\"" + queryType + "\", \"" + queryValue + "\")");

  setBookLoading(true);
  clearBookResults();

  $.ajax({
    url:    url,
    method: "GET",

    success: function (data) {
      setBookLoading(false);
      console.log("Full response:", data);

      if (data.totalItems === 0 || !data.items) {
        console.warn("No books found.");
        console.groupEnd();
        renderEmptyState("No books found for: " + queryValue);
        return;
      }

      // Print first result (Exercise 2 goal)
      var first = data.items[0].volumeInfo;
      console.log("--- First result ---");
      console.log("Title :", first.title  || "N/A");
      console.log("Author:", first.authors ? first.authors.join(", ") : "N/A");
      console.log("Desc  :", first.description || "N/A");
      console.log("ISBN  :", extractISBN(first));
      console.groupEnd();

      // Pass the response straight to Exercise 3 (no second network call)
      renderAllBooks(data);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      setBookLoading(false);
      console.error("Request failed —", textStatus, errorThrown);
      console.groupEnd();
      renderEmptyState("Request failed: " + textStatus);
    }
  });
}

// ─── Exercise 3: renderAllBooks ───────────────────────────────────────────────
// Loops through every item in the Google Books response with forEach().
// Prints Title, Authors, and ISBN for each, and renders a card in the UI.

function renderAllBooks(data) {
  clearBookResults();

  if (!data.items || data.items.length === 0) {
    renderEmptyState("No books returned.");
    return;
  }

  console.group("Exercise 3 — forEach over " + data.items.length + " items");

  data.items.forEach(function (item, index) {
    var info = item.volumeInfo;

    console.log("--- Book " + (index + 1) + " ---");
    console.log("Title  :", info.title   || "N/A");
    console.log("Authors:", info.authors ? info.authors.join(", ") : "N/A");
    console.log("ISBN   :", extractISBN(info));

    // Render the card to the page
    bookResults.appendChild(createBookCard(info));
  });

  console.groupEnd();
}

// ─── Exercise 4: loadCatsGif ──────────────────────────────────────────────────
// Hard-coded search for "cats" on Giphy.
// Extracts embed_url from the first result and creates an <iframe>.

function loadCatsGif() {
  var url = "https://api.giphy.com/v1/gifs/search"
    + "?api_key=" + GIPHY_API_KEY
    + "&q=cats&limit=1&rating=g";

  hideGiphyMessage();
  setGiphyLoading(true);

  $.ajax({
    url:    url,
    method: "GET",

    success: function (data) {
      setGiphyLoading(false);

      if (!data.data || data.data.length === 0) {
        showGiphyMessage("No GIFs found for 'cats'.", "error");
        return;
      }

      // embed_url is at the top level of each GIF object
      var embedUrl = data.data[0].embed_url;
      console.log("Exercise 4 — Cats embed_url:", embedUrl);
      displayGif(embedUrl);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      setGiphyLoading(false);
      console.error("Giphy request failed —", textStatus, errorThrown);

      // Common cause: invalid or missing API key
      showGiphyMessage(
        "✗ Could not load GIF. Check your GIPHY_API_KEY in main.js.",
        "error"
      );
    }
  });
}

// ─── Exercise 5: searchGif ────────────────────────────────────────────────────
// User-driven Giphy search. Validates input before making the request.
// Replaces the previous GIF when a new result arrives.

function searchGif(query) {
  // Validation: empty input
  if (!query || query.trim() === "") {
    showGiphyMessage("✗ Please enter a search term.", "error");
    return;
  }

  hideGiphyMessage();
  setGiphyLoading(true);

  var url = "https://api.giphy.com/v1/gifs/search"
    + "?api_key=" + GIPHY_API_KEY
    + "&q=" + encodeURIComponent(query.trim())
    + "&limit=1&rating=g";

  $.ajax({
    url:    url,
    method: "GET",

    success: function (data) {
      setGiphyLoading(false);

      if (!data.data || data.data.length === 0) {
        showGiphyMessage("✗ No GIFs found for: " + query, "error");
        return;
      }

      var embedUrl = data.data[0].embed_url;
      console.log("Exercise 5 — Search GIF for '" + query + "':", embedUrl);
      displayGif(embedUrl);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      setGiphyLoading(false);
      console.error("Giphy search failed —", textStatus, errorThrown);
      showGiphyMessage(
        "✗ Request failed: " + textStatus + ". Check your GIPHY_API_KEY.",
        "error"
      );
    }
  });
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
// All events are wired here — no inline HTML handlers anywhere.

// Exercise 1 — ISBN quick-test buttons
document.querySelectorAll(".isbn-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    fetchBookByISBN(btn.dataset.isbn);
  });
});

// Exercise 2 & 3 — Generalized search form
fetchBookBtn.addEventListener("click", function () {
  var queryType  = queryTypeEl.value;
  var queryValue = queryValueEl.value.trim();

  if (queryValue === "") {
    clearBookResults();
    renderEmptyState("Please enter a search value.");
    return;
  }

  fetchBook(queryType, queryValue);
});

// Allow Enter key to trigger the book search
queryValueEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") fetchBookBtn.click();
});

// Exercise 4 — Load cats GIF
loadCatsBtn.addEventListener("click", function () {
  loadCatsGif();
});

// Exercise 5 — Search GIF form
giphySearchBtn.addEventListener("click", function () {
  searchGif(giphyInput.value);
});

// Allow Enter key to trigger the GIF search
giphyInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") giphySearchBtn.click();
});
