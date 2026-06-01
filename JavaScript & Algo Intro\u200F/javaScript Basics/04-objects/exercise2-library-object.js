const library = {
  books: [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
    { title: "1984", author: "George Orwell" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { title: "Brave New World", author: "Aldous Huxley" }
  ]
};

console.log("Full library object:");
console.log(library);

console.log("\nBooks in the library:");
console.log("1. \"" + library.books[0].title + "\" by " + library.books[0].author);
console.log("2. \"" + library.books[1].title + "\" by " + library.books[1].author);
console.log("3. \"" + library.books[2].title + "\" by " + library.books[2].author);
console.log("4. \"" + library.books[3].title + "\" by " + library.books[3].author);
console.log("5. \"" + library.books[4].title + "\" by " + library.books[4].author);
