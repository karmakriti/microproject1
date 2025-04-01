import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

let booksData;

try {
    const jsonData = await readFile(new URL('./data/books.json', import.meta.url), 'utf8');
    booksData = JSON.parse(jsonData);
} catch (error) {
    console.error('Error reading books data:', error);
    booksData = { books: [] }; // Fallback empty data
}

// Serve static files from public directory
app.use(express.static('public'));

// API endpoint to get books data
app.get('/api/books', (req, res) => {
    res.json(booksData);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
