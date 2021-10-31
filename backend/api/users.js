const express = require('express');
const { models } = require('mongoose');
const router = express.Router();

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

module.exports = router;