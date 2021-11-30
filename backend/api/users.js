const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
var bodyParser = require('body-parser')


// Load User model
const User = require('../model/User');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user route testing!'));


// @route GET api/users
// @description Get all users
// @access Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ noUsersFound: 'No Users found' }));
});


router.post('/createAdmin', (req, res) => {
    console.log(req.body);
    User.create({ ...req.body, isAdmin: "true" })
        .then(users => res.json({ msg: 'Admin added successfully' }))
        .catch(err => res.status(400).json({ error: err }));
});

router.post('/createUser', (req, res) => {
   currEmail=req.body.email;
   console.log(currEmail);
    User.create({ ...req.body , isAdmin:"false" })
        .then(users => res.json({ msg: 'User added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add User' }));
    
});


router.put('/update', (req, res) => {
    console.log("User updated");
    User.findOneAndUpdate(req.query, req.body)
        .then(book => res.json({msg: "updated succesfully"}))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});


module.exports = router;