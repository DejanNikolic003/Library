const myLibrary = [];

class Book {
  constructor(title, author, pages) {
    this.id = crypto.randomUUID();
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

const listBooks = () => {
  const bookContainer = document.querySelector(".book-container");
  bookContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookWrapper = document.createElement("div");
    const bookTitle = document.createElement("h1");
    const bookRemoveButton = document.createElement("button");

    bookWrapper.classList.add("book");
    bookWrapper.dataset.id = book.id;
    bookTitle.textContent = book.title;
    bookRemoveButton.classList.add("removeBtn");
    bookRemoveButton.textContent = "Remove";

    bookWrapper.append(bookTitle, bookRemoveButton);
    bookContainer.append(bookWrapper);
  });

  handleEventListeners();
};

const handleEventListeners = () => {
  const removeButtons = document.querySelectorAll(".removeBtn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const book = event.target.closest(".book");

      removeBookFromLibrary(book.dataset.id);
      listBooks();
    });
  });
};

(function () {
  listBooks();
})();
