const form = document.getElementById("book-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const statusInput = document.getElementById("status");
const container = document.getElementById("book-container");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status ? true : false;
}

Book.prototype.toggleStatus = function() {
    this.status = !this.status;
}

const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 1029, true);
const book2 = new Book("The Alchemist", "Paolo Coelho", 309, true);
const book3 = new Book("1984", "George Orwell", 328, false);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 432, true);
const book5 = new Book("To Kill a Mockingbird", "Harper Lee", 281, true);
const book6 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false);
const book7 = new Book("Moby-Dick", "Herman Melville", 635, false);
const book8 = new Book("The Catcher in the Rye", "J.D. Salinger", 277, true);
const book9 = new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false);
const book10 = new Book("The Da Vinci Code", "Dan Brown", 689, true);

// const myLibrary = [book1, book2, book3, book4, book5];
let myLibrary = [book1, book2, book3, book4, book5, book6, book7, book8, book9];

// Function to display books
function displayLibrary() {

    container.innerHTML = ""
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <div class="cardStatus">
                <p><strong>Read:</strong></p>
                <input type="checkbox" class="status" name="status" data-index="${index}" ${book.status ? 'checked' : ''}></input>
            </div>
            <strong>Read:</strong> ${book.status}</p>
            <button data-index="${index}" class="deleteBook btn card">DELETE</button>

        `;
        container.appendChild(card);
    });

    // Add event listeners to all checkboxes
    document.querySelectorAll('.status').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            myLibrary[index].toggleStatus();
            // You could update just this element, but redisplaying is simpler
            displayLibrary();
        });
    });

    // Add event listeners to all delete buttons
    document.querySelectorAll('.deleteBook').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeBookFromLibrary(index);
        });
    });
}

function addBookToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status)
    myLibrary.push(newBook);
    
    displayLibrary();  
}

// Fixed function name to match what's being called and added index parameter
function removeBookFromLibrary(index) {
    // Remove the book at the specified index
    myLibrary.splice(index, 1);

    // Refresh the display
    displayLibrary();
}


// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = statusInput.checked ? true : false;
    
    if (title && author && pages) {
        addBookToLibrary(title, author, parseInt(pages), status);
        form.reset();
    } else {  
        alert("Please enter all book details.");
    }
});

// Call function to add some books and then display the library
addBookToLibrary("The Da Vinci Code", "Dan Brown", 689, true);



displayBooks();
  