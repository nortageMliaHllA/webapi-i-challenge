// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


// GET /
server.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

server.get('/now', (req, res) => {
    const now = new Date().toISOString()
    res.send(now)
  })
  

// POST /
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if ( !name || !bio) {
        res.status(400).json({ 
            err: err,
            message: "Please provide name and bio for the user." })
} else {
        db.insert(req.body)
    
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(err => {
            res.status(500).json({
                err:err,
                message: "There was an error while saving the user to the database" 
            });

        });
    }
})


// GET /users
server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "The users information could not be retrieved." 
        })
    })
})

// GET /:id
server.get('/api/users/:id', (req, res) => {
    db.findById(req.params.id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ 
                message: "The user with the specified ID does not exist." 
            })
        }
    })
    .catch(() => {
        res.status(500).json({ 
            error: "The user information could not be retrieved." 
        })
    })
})

// DELETE /
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(id => {
        if(id && id > 0) {
            res.status(200).json({
                message: "Deleted user"
            })
        } else {
            res.status(404).json({
                message: "The user with the specified ID does not exist."
            })
        }
    })
     .catch(() => {
         res.status(500).json({
             error: "The user could not be removed"
         })
     })  
})


// PUT /
server.put('/api/users/:id', (req, res) => {
    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user." 
        })
    } else {
        db.update(req.params.id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({
                    message: "The user with the specified ID does not exist." 
                });
            }
        })
        .catch(() => {
            res.status(500).json({
                error: "The user with the specified ID does not exist."
            })
        })   
    }
})

server.listen(5000, () =>{
    console.log('Server is running on port 5000...');
});

