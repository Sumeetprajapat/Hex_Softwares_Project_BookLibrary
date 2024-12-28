const books = [
    { id: 1, title: 'The White Tiger', author: 'Aravind Adiga', category: 'Fiction', origin: 'Indian' },
    { id: 2, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', origin: 'Western' },
    { id: 3, title: 'Midnight’s Children', author: 'Salman Rushdie', category: 'Fiction', origin: 'Indian' },
    { id: 4, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', origin: 'Western' },
    { id: 5, title: 'The God of Small Things', author: 'Arundhati Roy', category: 'Fiction', origin: 'Indian' },

    { id: 6, title: 'The Argumentative Indian', author: 'Amartya Sen', category: 'Non-Fiction', origin: 'Indian' },
    { id: 7, title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Non-Fiction', origin: 'Western' },
    { id: 8, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', category: 'Non-Fiction', origin: 'Western' },
    { id: 9, title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'Non-Fiction', origin: 'Indian' },
    { id: 10, title: 'Becoming', author: 'Michelle Obama', category: 'Non-Fiction', origin: 'Western' },

    { id: 11, title: 'The God Particle', author: 'Leon Lederman', category: 'Science', origin: 'Western' },
    { id: 12, title: 'The Story of My Experiments with Truth', author: 'Mahatma Gandhi', category: 'Science', origin: 'Indian' },
    { id: 13, title: 'Cosmos', author: 'Carl Sagan', category: 'Science', origin: 'Western' },
    { id: 14, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', origin: 'Western' },
    { id: 15, title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Science', origin: 'Western' },

    { id: 16, title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History', origin: 'Indian' },
    { id: 17, title: 'The Rise and Fall of the Third Reich', author: 'William L. Shirer', category: 'History', origin: 'Western' },
    { id: 18, title: 'The History of India', author: 'Romila Thapar', category: 'History', origin: 'Indian' },
    { id: 19, title: 'Guns, Germs, and Steel', author: 'Jared Diamond', category: 'History', origin: 'Western' },
    { id: 20, title: 'The Origins of Political Order', author: 'Francis Fukuyama', category: 'History', origin: 'Western' }
];


let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

function displayBooks(bookList) {
    const bookListContainer = document.getElementById('book-list');
    bookListContainer.innerHTML = ''; 

    bookList.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book-item');
        bookElement.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-category">Category: ${book.category}</p>
            <button onclick="borrowBook(${book.id})">Borrow</button>
        `;
        bookListContainer.appendChild(bookElement);
    });
}

function searchBooks() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery);
    });
    displayBooks(filteredBooks);
}

function filterByCategory() {
    const category = document.getElementById('category-filter').value;
    const filteredBooks = category ? books.filter(book => book.category === category) : books;
    displayBooks(filteredBooks);
}

function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && !borrowedBooks.some(b => b.id === book.id)) {
        const borrowedBook = { ...book, date: new Date().toLocaleDateString() };
        borrowedBooks.push(borrowedBook);
        localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks)); 
        updateBorrowingHistory();
    }
}

function updateBorrowingHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; 

    borrowedBooks.forEach(record => {
        const historyItem = document.createElement('li');
        historyItem.textContent = `${record.title} by ${record.author} (Borrowed on: ${record.date})`;
        historyList.appendChild(historyItem);
    });
}

function updateBorrowingHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = ''; 

    borrowedBooks.forEach((record, index) => {
        const historyItem = document.createElement('li');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            ${record.title} by ${record.author} (Borrowed on: ${record.date})
            <button onclick="removeFromHistory(${index})">Remove</button>
        `;
        historyList.appendChild(historyItem);
    });
}

function removeFromHistory(index) {
    borrowedBooks.splice(index, 1); 
    localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks)); 
    updateBorrowingHistory(); 
}

displayBooks(books);

updateBorrowingHistory();
