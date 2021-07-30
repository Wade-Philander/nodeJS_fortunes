// Displaying fortunes in web using a res & req.

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fortunes = require('./data/fortune');

app.use(bodyParser.json());

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

// making/adding a new fortune.

app.post('/fortunes', (req, res) => {
    console.log(req.body);

    const {message, lucky_number, spiral_animal } = req.body;

    const fortune_ids = fortunes.map(f => f.id);

    const fortune = { 
        id: (fortune_ids.length > 0 ? Math.max(...fortune_ids) : 0) + 1, 
        message, 
        lucky_number, 
        spiral_animal
    };
    const new_fortunes = fortunes.concat(fortune);

    fs.writeFile('./data/fortunes.json', JSON.stringify(new_fortunes), err => console.log(err));//adds the new fortune created with the curl into the json file we have inside data 

    res.json(new_fortunes)
});

module.exports = app;
