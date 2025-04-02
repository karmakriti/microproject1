import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
const apiRouter = express.Router();

// GET /api/books
apiRouter.get('/books', async (req, res) => {
    try {
        const jsonData = await readFile(join(__dirname, 'data', 'books.json'), 'utf8');
        const books = JSON.parse(jsonData);
        
        // Handle query parameters for filtering
        const { genre, search } = req.query;
        let filteredBooks = books.books;

        if (genre) {
            filteredBooks = filteredBooks.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
        }

        if (search) {
            filteredBooks = filteredBooks.filter(book => 
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.json({ books: filteredBooks });
    } catch (error) {
        console.error('Error reading books:', error);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// GET /api/books/:id
apiRouter.get('/books/:id', async (req, res) => {
    try {
        const jsonData = await readFile(join(__dirname, 'data', 'books.json'), 'utf8');
        const books = JSON.parse(jsonData);
        const book = books.books.find(b => b.id === parseInt(req.params.id));
        
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.json(book);
    } catch (error) {
        console.error('Error reading book:', error);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// GET /api/genres
apiRouter.get('/genres', async (req, res) => {
    try {
        const jsonData = await readFile(join(__dirname, 'data', 'books.json'), 'utf8');
        const books = JSON.parse(jsonData);
        const genres = [...new Set(books.books.map(book => book.genre))];
        res.json({ genres });
    } catch (error) {
        console.error('Error reading genres:', error);
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
});

// Mount API routes
app.use('/api', apiRouter);

// Serve HTML routes
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.get('/books', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'books.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'contact.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
