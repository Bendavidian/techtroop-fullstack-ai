# AJAX & APIs

A hands-on browser project demonstrating AJAX, HTTP GET requests, JSON parsing, and real-world API integration using vanilla JavaScript and jQuery.

---

## Core Concepts

### What is AJAX?
**AJAX** (Asynchronous JavaScript and XML) lets a web page send and receive data from a server **without reloading the page**. The name is historical — today we almost always exchange JSON, not XML.

```
User clicks button
   ↓
JavaScript sends GET request (in background)
   ↓
Server (API) responds with JSON
   ↓
JavaScript parses JSON and updates the DOM
   ↓
User sees result — page never reloaded
```

### What is an API?
An **API** (Application Programming Interface) is a set of rules that lets two programs talk to each other. A **Web API** (or REST API) is a URL you can send HTTP requests to and get back structured data (usually JSON).

**API vs Website:**
| | Website | API |
|---|---|---|
| Intended for | Humans (browser) | Programs (code) |
| Response format | HTML / CSS | JSON / XML |
| Example | `google.com` | `googleapis.com/books/v1/...` |

### What is a GET Request?
An HTTP **GET** request asks a server to *send* data. It is read-only — nothing on the server changes. Parameters are passed in the URL as a **query string**:
```
https://www.googleapis.com/books/v1/volumes?q=isbn:9780575087057
                                              ↑ query string starts here
```

### What is JSON?
**JSON** (JavaScript Object Notation) is a plain-text format for structured data. It looks like a JavaScript object literal and is what APIs return:
```json
{
  "title": "The Name of the Wind",
  "authors": ["Patrick Rothfuss"],
  "publishedDate": "2007"
}
```
JavaScript parses it automatically when you use `$.ajax()` or `fetch()`.

### AJAX success / error callbacks
jQuery's `$.ajax()` accepts two key callbacks:

```js
$.ajax({
  url: "https://...",
  method: "GET",

  success: function(data) {
    // Called when the server responds with HTTP 200
    // `data` is already parsed from JSON
    console.log(data);
  },

  error: function(jqXHR, textStatus, errorThrown) {
    // Called when the request fails (network error, 4xx, 5xx …)
    console.error(textStatus, errorThrown);
  }
});
```

---

## APIs Used

### Google Books API
- **Base URL:** `https://www.googleapis.com/books/v1/volumes`
- **No API key required** for basic searches (up to ~1 000 requests/day)
- **Query prefixes:** `isbn:`, `intitle:`, `inauthor:`
- **Example:** `?q=isbn:9780575087057`

### Giphy API
- **Base URL:** `https://api.giphy.com/v1/gifs/search`
- **Requires a free API key** — sign up at [developers.giphy.com](https://developers.giphy.com/)
- **Steps:**
  1. Create a free account
  2. Click **Create an App** → choose **API** (not SDK)
  3. Copy your **API Key**
  4. Open `main.js` and replace `YOUR_GIPHY_API_KEY` with your key

---

## Exercises

### Exercise 1 — `fetchBookByISBN(isbn)`
Sends a jQuery AJAX GET request to the Google Books API using an ISBN query.  
Prints the **full JSON response** and key fields (Title, Authors, Description, Publisher, Published Date, ISBN) to the browser console.

### Exercise 2 — `fetchBook(queryType, queryValue)`
Generalizes Exercise 1. Accepts any query prefix (`isbn`, `intitle`, `inauthor`) and logs the **first** matching book's Title, Author, Description, and ISBN.

### Exercise 3 — forEach loop over all items
Reuses the same API response from Exercise 2. Uses `Array.forEach()` to iterate over every book in `data.items`, logging Title, Authors, and ISBN for each, and renders a card on the page.

### Exercise 4 — `loadCatsGif()`
Searches the Giphy API for `"cats"`, extracts `embed_url` from the first result, and dynamically creates an `<iframe>` to display the GIF.

### Exercise 5 — `searchGif(query)`
User-driven Giphy search. Validates that the input is not empty (shows a red error if it is), makes the API request, and replaces the previous GIF with the new result. Displays an error message if the request fails.

---

## DOM Techniques Used

| API | Used for |
|---|---|
| `document.querySelector` | Select elements by ID |
| `document.querySelectorAll` | Select all ISBN buttons |
| `document.createElement` | Build book cards, iframe dynamically |
| `element.appendChild` | Add cards / iframe to the page |
| `element.removeChild` | Clear stale results before re-rendering |
| `element.textContent` | Set text safely (no XSS risk) |
| `element.classList.toggle` | Show / hide loading spinner and messages |
| `addEventListener` | Wire all button clicks and Enter key presses |

---

## How to Run

Open `index.html` directly in any modern browser — no server or build step needed.

```bash
# From the repository root
open "JavaScript & Web Intro/AJAX & APIs/index.html"
```

Or drag and drop `index.html` onto a browser window.

> **Important:** Before using the Giphy exercises, replace `YOUR_GIPHY_API_KEY` in `main.js` with a real key from [developers.giphy.com](https://developers.giphy.com/).

---

## Manual Test Checklist

- [ ] Open browser DevTools console (F12)
- [ ] Click an ISBN button → full response + fields printed to console
- [ ] Search by title (e.g. `The Wise Man's Fear`) → books rendered on page
- [ ] Search by ISBN in the form → first book details in console + all cards on page
- [ ] Add Giphy API key to `main.js`
- [ ] Click **Load Cats GIF** → GIF appears
- [ ] Type a search term and press **Search** → new GIF replaces old one
- [ ] Click **Search** with an empty input → red error message appears
- [ ] Check browser console → zero errors
