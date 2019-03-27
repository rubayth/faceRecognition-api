const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
//const bcrypt = require('bcrypt-nodejs')

const app = express();
app.use(bp.json());
app.use(cors());

const db = {
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

    
    db.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date(),
    })
    res.json(db.users[db.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.users.forEach( user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found){
        res.status('400').json("not found");
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    db.users.forEach( user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if (!found){
        res.status('400').json("not found");
    }
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