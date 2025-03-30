const express = require('express');
const path = require('path');
const booksData = require('./data/books.json');

const app = express();
const port = 3000;

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get books data
app.get('/api/books', (req, res) => {
    res.json(booksData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
