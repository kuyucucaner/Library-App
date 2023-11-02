let myLibrary = [
  title = "Tutunamayanlar",
  author = " Oğuz Atay",
  pages = 724,
  hasRead = false
];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;

  this.info = function () {
    let readStatus = this.hasRead ? "read" : "not read yet";
    return `${this.title} by ${this.author}, ${this.pages} pages , ${readStatus}`;
  }
}

const addStorage = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}
const getStorage = () => {
  const storedLibrary = JSON.parse(localStorage.getItem('library'));
  if (storedLibrary) {
    myLibrary = storedLibrary;
  }
}

getStorage();

function displayBooks() {
  const tableBody = document.getElementById('book-list');
  tableBody.innerHTML = '';

  myLibrary.forEach((book, index) => {
    const row = tableBody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const readCell = row.insertCell(3);
    const statusCell = row.insertCell(4);
    const editCell = row.insertCell(5);
    const deleteCell = row.insertCell(6);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    readCell.textContent = book.hasRead ? 'Read' : 'Not Read Yet!';

    const changeReadStatusButton = document.createElement('button');
    changeReadStatusButton.textContent = 'Change read status';
    changeReadStatusButton.classList.add('table-button-status');
    changeReadStatusButton.addEventListener('click', () => {
      book.hasRead = !book.hasRead;
      addStorage();
      displayBooks();
    });
    statusCell.appendChild(changeReadStatusButton);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('table-button-edit');
    editButton.addEventListener('click', () => {
      openEditModal(book, index);
    });
    editCell.appendChild(editButton);

    const addButton = document.querySelector('.add-button');  
    addButton.textContent = 'Add Book';
    addButton.classList.add('add-button');
    addButton.addEventListener('click', openAddModal);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('table-button-delete');
    deleteButton.addEventListener('click', () => {
      const rowIndex = deleteButton.parentElement.parentElement.rowIndex - 1;
      if (rowIndex >= 0) {
        myLibrary.splice(rowIndex, 1);
        addStorage();
        displayBooks();
      }
    });
    deleteCell.appendChild(deleteButton);
  });
}
function openAddModal() {
  const modal = document.getElementById('add-modal');
  const titleInput = document.getElementById('add-title');
  const authorInput = document.getElementById('add-author');
  const pagesInput = document.getElementById('add-pages');
  const hasReadInput = document.getElementById('add-has-read');
  const saveAddButton = document.getElementById('save-add');
  const closeAddButton = document.getElementById('close-add');


  

  // Temizleme işlemleri
  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  hasReadInput.checked = false;

  closeAddButton.addEventListener('click', () => {
    const modal = document.getElementById('add-modal');
    modal.style.display = 'none';
  });
  
  saveAddButton.addEventListener('click', () => {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const hasRead = hasReadInput.checked;
  
    addBook(title, author, pages, hasRead);
  });
  
  modal.style.display = 'block';
}
function openEditModal(book, index) {
  const modal = document.getElementById('edit-modal');
  const titleInput = document.getElementById('edit-title');
  const authorInput = document.getElementById('edit-author');
  const pagesInput = document.getElementById('edit-pages');
  const hasReadInput = document.getElementById('edit-has-read');
  const saveEditButton = document.getElementById('save-edit');
  const closeEditButton = document.getElementById('close-edit');

  titleInput.value = book.title;
  authorInput.value = book.author;
  pagesInput.value = book.pages;
  hasReadInput.checked = book.hasRead;


  closeEditButton.addEventListener('click', () => {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'none';
  });
  saveEditButton.addEventListener('click', () => {
    book.title = titleInput.value;
    book.author = authorInput.value;
    book.pages = parseInt(pagesInput.value);
    book.hasRead = hasReadInput.checked;

    addStorage();
    displayBooks();
    modal.style.display = 'none';
  });

  modal.style.display = 'block';
}

displayBooks();

function addBook(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  addStorage();
  displayBooks();
}

//addBook("Tutunamayanlar", "Oğuz Atay", 724, false);