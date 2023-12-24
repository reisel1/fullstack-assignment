import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors'; // Import CORS module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use CORS middleware to enable CORS

// Optional: Enable CORS for specific origin
// app.use(cors({ origin: 'http://localhost:4200' }));

app.get('/posts', (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    fs.readFile('./src/posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return res.status(500).send('Error reading file');
        }

        try {
            const posts = JSON.parse(data);
            const paginatedPosts = paginate(posts, page, pageSize);
            res.json(paginatedPosts);
        } catch (parseError: unknown) {
            const error = parseError as Error;
            console.error('Error parsing JSON:', error.message);
            return res.status(500).send('Error parsing JSON data');
        }
    });
});

function paginate(array: any[], page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return array.slice(startIndex, endIndex);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
