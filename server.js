const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Orko5196!',
      database : 'face-db'
    }
  });


const app = express();
app.use(bp.json());
app.use(cors());

const db2 = {
    users: [
        {
            id: '123',
            name: 'Arko',
            email: 'arko@gmail.com',
            password: 'arko',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '123',
            name: 'Tas',
            email: 'tas@gmail.com',
            password: 'tas',
            entries: 0,
            joined: new Date(),
        }
    ]
}
app.get('/', (req, res) => {
    res.send(db.users);
})

app.post('/signin', (req, res) =>{
    if (req.body.email === db.users[0].email &&
        req.body.password === db.users[0].password) { 
            res.json(db.users[0]);
        } else {
            res.status(400).json('error loggin in');
        }
})

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    }).
    then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('unable to register'))
    
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({
        id:id
    }).then(user => {
        if (user.length) res.json(user[0])
        else res.status(400).json('not found')
    })
    .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req, res) => {
    const { id } = req.body;
     db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

/*
bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3000);