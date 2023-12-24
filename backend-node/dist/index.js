"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors")); // Import CORS module
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)()); // Use CORS middleware to enable CORS
app.get('/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    fs_1.default.readFile('./src/posts.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err.message);
            return res.status(500).send('Error reading file');
        }
        try {
            const posts = JSON.parse(data);
            const paginatedPosts = paginate(posts, page, pageSize);
            res.json(paginatedPosts);
        }
        catch (parseError) {
            const error = parseError;
            console.error('Error parsing JSON:', error.message);
            return res.status(500).send('Error parsing JSON data');
        }
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
