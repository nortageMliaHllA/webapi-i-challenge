// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());

// POST /
server.post('/db', (req, res) => {
    const newDb = req.body;
    db.add(newDb)
    .then(db => {
        res.status(400).json(db);
    })
    .catch(err => {
        res.status(500).json({
            err:err,
            message: "Please provide name and bio for the user."
        });
    });

});



server.listen(5000, () =>{
    console.log('Server is running on port 5000...');
});