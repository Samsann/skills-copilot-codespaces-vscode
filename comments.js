// Create web server
// Create a POST route for adding a new comment
// Create a GET route for fetching all comments
// Create a GET route for fetching a single comment
// Create a PUT route for updating a comment
// Create a DELETE route for deleting a comment
// Create a web server that listens on port 3000 and serves the comments.html file. Use the comments.html file from the previous exercise.

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = 3000;

app.use(bodyParser.json());

app.post('/comments', function(req, res) {
    var comments = require('./comments.json');
    var newComment = req.body;
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

app.get('/comments', function(req, res) {
    var comments = require('./comments.json');
    res.send(comments);
});

app.get('/comments/:id', function(req, res) {
    var comments = require('./comments.json');
    var id = req.params.id;
    var comment = comments[id];
    if (comment) {
        res.send(comment);
    } else {
        res.sendStatus(404);
    }
});

app.put('/comments/:id', function(req, res) {
    var comments = require('./comments.json');
    var id = req.params.id;
    var updatedComment = req.body;
    comments[id] = updatedComment;
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/comments/:id', function(req, res) {
    var comments = require('./comments.json');
    var id = req.params.id;
    comments.splice(id, 1);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(port, function() {
    console.log('Server is running on port', port);
});