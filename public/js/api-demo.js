document.getElementById('fetchBtn').addEventListener('click', async () => {
    const responseDiv = document.getElementById('apiResponse');
    const displayDiv = document.getElementById('booksDisplay');
    
    try {
        // Show loading state
        responseDiv.className = 'alert alert-info';
        responseDiv.textContent = 'Loading data...';
        responseDiv.classList.remove('d-none');
        
        const response = await fetch('/api/books');
        const data = await response.json();
        
        // Show success message
        responseDiv.className = 'alert alert-success';
        responseDiv.textContent = 'Data loaded successfully!';
        
        // Display the books
        displayDiv.innerHTML = data.books.map(book => `
            <div class="col-md-4 mb-4">
                <div class="card book-card">
                    <img src="images/book.jpg" class="card-img-top" alt="${book.title}">
                    <div class="card-header bg-primary text-white">
                        ID: ${book.id}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">
                            <strong>Author:</strong> ${book.author}<br>
                            <strong>Year:</strong> ${book.year}<br>
                            <strong>Genre:</strong> ${book.genre}
                        </p>
                    </div>
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        responseDiv.className = 'alert alert-danger';
        responseDiv.textContent = 'Error loading data: ' + error.message;
    }
});
