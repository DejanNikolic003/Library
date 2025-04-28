const myLibrary = [];

const bookContainer = document.querySelector(".book-container");

const bookTitleInput = document.querySelector(".book-title");
const bookAuthorInput = document.querySelector(".book-author");
const bookPagesInput = document.querySelector(".book-pages");

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
  addBookToLibrary(
    bookTitleInput.value,
    bookAuthorInput.value,
    bookPagesInput.value
  );

  bookTitleInput.value = "";
  bookAuthorInput.value = "";
  bookPagesInput.value = "";

  renderBooks();
};

const validateBookStoring = () => {
  if (
    bookTitleInput.value === "" ||
    bookAuthorInput.value === "" ||
    bookPagesInput.value === ""
  ) {
    return false;
  }

  if (isNaN(bookPagesInput.value)) {
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
      const bookAuthorWrapper = document.createElement("div");
      const bookTitle = document.createElement("div");
      const bookAuthor = document.createElement("h1");
      const bookIsRead = document.createElement("h2");
      const bookRemoveButton = document.createElement("button");
      const bookIsReadButton = document.createElement("button");

      bookWrapper.classList.add("book", "p-2", "bg-neutral-900", "rounded-md");
      bookWrapper.dataset.id = book.id;
      bookTitle.textContent = "Title: " + book.title;
      bookAuthor.textContent = book.author;
      bookIsRead.textContent = "Read: " + (book.isRead ? "Yes" : "No");

      bookTitle.classList.add("title", "text-sm", "mt-2");
      bookIsRead.classList.add("text-sm");
      bookRemoveButton.classList.add(
        "removeBtn",
        "w-fit",
        "text-[12px]",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "p-[3px]",
        "rounded-md",
        "transition",
        "cursor-pointer",
        "mt-2",
        "mr-2"
      );
      bookRemoveButton.textContent = "Remove";
      bookIsReadButton.classList.add(
        "isReadBtn",
        "w-fit",
        "text-[12px]",
        "bg-sky-600",
        "hover:bg-sky-700",
        "text-white",
        "p-[3px]",
        "rounded-md",
        "transition",
        "cursor-pointer",
        "mt-2"
      );
      bookIsReadButton.textContent = book.isRead ? "Unread" : "Read";

      bookAuthorWrapper.classList.add(
        "w-fit",
        "text-[12px]",
        "bg-[#2a8278]",
        "text-white",
        "p-[3px]",
        "rounded-md"
      );

      bookAuthor.classList.add("whitespace-normal");
      bookAuthorWrapper.append(bookAuthor);

      bookWrapper.append(
        bookAuthorWrapper,
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
    const bookTitle = book
      .querySelector(".title")
      .textContent.toLowerCase()
      .trim();

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
