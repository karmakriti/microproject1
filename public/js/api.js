let allBooks = [];

async function loadBooks(searchTerm = '', genre = '') {
    try {
        let url = '/api/books';
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (genre) params.append('genre', genre);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        allBooks = data.books;
        displayBooks(allBooks);
        if (!genre) updateGenreFilter();
    } catch (error) {
        console.error('Error fetching books:', error);
        document.getElementById('booksDisplay').innerHTML = 
            '<div class="alert alert-danger">Error loading books. Please try again later.</div>';
    }
}

function displayBooks(books) {
    const display = document.getElementById('booksDisplay');
    display.innerHTML = books.map(book => `
        <div class="col-md-4 col-lg-3">
            <div class="card book-card">
                <img src="images/book.jpg" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">By ${book.author}</p>
                    <p class="card-text"><small class="text-muted">Year: ${book.year}</small></p>
                    <span class="badge bg-primary">${book.genre}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function updateGenreFilter() {
    const genres = [...new Set(allBooks.map(book => book.genre))];
    const genreFilter = document.getElementById('genreFilter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    
    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const genreFilter = document.getElementById('genreFilter').value;
        filterBooks(searchTerm, genreFilter);
    });

    document.getElementById('genreFilter')?.addEventListener('change', (e) => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const genreFilter = e.target.value;
        filterBooks(searchTerm, genreFilter);
    });
});

function filterBooks(searchTerm, genre) {
    let filtered = allBooks;
    if (searchTerm) {
        filtered = filtered.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );
    }
    if (genre) {
        filtered = filtered.filter(book => book.genre === genre);
    }
    displayBooks(filtered);
}
