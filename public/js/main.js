document.addEventListener('DOMContentLoaded', () => {
    const loadBooksBtn = document.getElementById('loadBooks');
    const booksContainer = document.getElementById('booksContainer');

    async function fetchBooks() {
        try {
            const response = await fetch('/api/books');
            const data = await response.json();
            
            booksContainer.innerHTML = data.books.map(book => `
                <div class="book-card">
                    <h3>${book.title}</h3>
                    <p><strong>Author:</strong> ${book.author}</p>
                    <p><strong>Year:</strong> ${book.year}</p>
                    <p><strong>Genre:</strong> ${book.genre}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
            booksContainer.innerHTML = '<p>Error loading books</p>';
        }
    }

    loadBooksBtn?.addEventListener('click', fetchBooks);
});
