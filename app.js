// Displaying fortunes in web using a res & req.

const express = require('express');


const app = express();

const fortunes = require('./data/fortune');

app.get('/fortunes',(req, res) => {
    res.json(fortunes)
});

// Random function
// fetching a random fortune from data fortune 
// Localhost:3000/fortunes/random

app.get('/fortunes/random',(req, res) => {

    console.log('requesting randomn fortune');

    res.json(fortunes[Math.floor(Math.random() * fortunes.length)])

});

// Getting a fortune with directly using a id from the database.
// Localhost:3000/fortunes/1

app.get('/fortunes/:id', (req, res) => {
    console.log(req.params);

    res.json(fortunes.find(f => f.id == req.params.id));
});

module.exports = app;