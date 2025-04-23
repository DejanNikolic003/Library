const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.id = 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
}

const addBookToLibrary = (title, author, pages) => {
  return myLibrary.push(new Book(title, author, pages));
};

const removeBookFromLibrary = (bookId) => {
  const bookIndex = getBookIndexById(bookId);

  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
  }
};

const getBookIndexById = (bookId) => {
  return myLibrary.findIndex((book) => book.id === bookId);
};
