const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get('/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    fs.readFile('./src/posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }

        const posts = JSON.parse(data);
        const paginatedPosts = paginate(posts, page, pageSize);

        res.json(paginatedPosts);
    });
});

function paginate(array, page, pageSize) { 
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return array.slice(startIndex, endIndex);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
