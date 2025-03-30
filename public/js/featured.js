async function loadFeaturedBooks() {
    try {
        const response = await fetch('/api/books');
        const data = await response.json();
        const featuredBooks = data.books.slice(0, 3);
        
        const display = document.getElementById('featuredBooks');
        display.innerHTML = featuredBooks.map(book => `
            <div class="col-md-4">
                <div class="card book-card">
                    <img src="images/book.jpg" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">By ${book.author}</p>
                        <a href="books.html" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching featured books:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadFeaturedBooks);
