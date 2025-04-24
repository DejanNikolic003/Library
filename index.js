const myLibrary = [];

const bookTitle = document.querySelector(".book-title");
const bookAuthor = document.querySelector(".book-author");
const bookPages = document.querySelector(".book-pages");

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

const listBooks = () => {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";

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

const handleBookAddition = (event) => {
  event.preventDefault();

  if (!validateBookStoring()) {
    return alert("Validation error!");
  }

  // console.log(validateBookStoring);

  addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);

  bookTitle.value = "";
  bookAuthor.value = "";
  bookPages.value = "";

  listBooks();
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

const handleEventListeners = () => {
  const removeButtons = document.querySelectorAll(".removeBtn");
  const readButtons = document.querySelectorAll(".isReadBtn");
  const addBookButton = document.querySelector(".addBookBtn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = event.target.closest(".book");

      removeBookFromLibrary(book.dataset.id);
      listBooks();
    });
  });

  readButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = event.target.closest(".book");

      changeBookReadStatus(book.dataset.id);
      listBooks();
    });
  });

  addBookButton.addEventListener("click", handleBookAddition);
};

addBookToLibrary("Test", "Test", 200, false);

(function () {
  listBooks();
})();
