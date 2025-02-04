// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Cannot read comments');
            return;
        }
        res.send(data);
    });
});

// Post a comment
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        res.status(400).send('Missing name or comment');
        return;
    }
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Cannot read comments');
            return;
        }
        const comments = JSON.parse(data);
        comments.push({ name, comment });
        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Cannot write comments');
                return;
            }
            res.send('Comment posted');
        });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running');
});