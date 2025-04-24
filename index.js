const myLibrary = [];

const bookContainer = document.querySelector(".book-container");

const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");

const searchInput = document.querySelector(".search");

let booksReturnedOnSearch = [];

class Book {
  constructor(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
  }

  toggleRead() {
    this.isRead = !this.isRead;
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

const changeBookReadStatus = (bookId) => {
  const bookIndex = getBookIndexById(bookId);

  if (bookIndex > -1) {
    myLibrary[bookIndex].toggleRead();
  }
};

const getBookIndexById = (bookId) => {
  return myLibrary.findIndex((book) => book.id === bookId);
};

const storeBook = (event) => {
  event.preventDefault();

  if (!validateBookStoring()) {
    return alert("Validation error!");
  }
  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";

  renderBooks();
};

const validateBookStoring = () => {
  if (
    bookTitle.value === "" ||
    bookAuthor.value === "" ||
    bookPages.value === ""
  ) {
    return false;
  }

  if (isNaN(bookPages.value)) {
    return false;
  }

  return true;
};

const renderBooks = () => {
  bookContainer.innerHTML = "";

  if (myLibrary.length === 0) {
    const bookTitle = document.createElement("h1");
    bookTitle.textContent = "No books found.";
    bookContainer.append(bookTitle);

    return;
  }

  bookContainer.append(
    ...myLibrary.map((book) => {
      const bookWrapper = document.createElement("div");
      const bookTitle = document.createElement("h1");
      const bookIsRead = document.createElement("h2");
      const bookRemoveButton = document.createElement("button");
      const bookIsReadButton = document.createElement("button");

      bookWrapper.classList.add("book");
      bookWrapper.dataset.id = book.id;
      bookTitle.textContent = book.title;
      bookIsRead.textContent = book.isRead ? "Yes" : "No";
      bookRemoveButton.classList.add("removeBtn");
      bookRemoveButton.textContent = "Remove";
      bookIsReadButton.classList.add("isReadBtn");
      bookIsReadButton.textContent = book.isRead ? "Unread" : "Read";

      bookWrapper.append(
        bookTitle,
        bookIsRead,
        bookRemoveButton,
        bookIsReadButton
      );

      return bookWrapper;
    })
  );

  handleEventListeners();
};

const searchBooks = (event) => {
  const books = document.querySelectorAll(".book");
  let searchValue = event.target.value.trim().toLowerCase();

  if (!searchValue) {
    renderBooks();
    return;
  }

  books.forEach((book) => {
    const bookTitle = book.querySelector("h1").textContent.toLowerCase().trim();

    book.style.display = bookTitle.includes(searchValue) ? "" : "none";
  });
};

const handleEventListeners = () => {
  const removeButtons = document.querySelectorAll(".removeBtn");
  const readButtons = document.querySelectorAll(".isReadBtn");
  const addBookButton = document.querySelector(".addBookBtn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = event.target.closest(".book");

      removeBookFromLibrary(book.dataset.id);
      renderBooks();
    });
  });

  readButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = event.target.closest(".book");

      changeBookReadStatus(book.dataset.id);
      renderBooks();
    });
  });

  addBookButton.addEventListener("click", storeBook);
  searchInput.addEventListener("input", searchBooks);
};

addBookToLibrary("Test", "Test", 200, false);

(function () {
  renderBooks();
})();
