const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
var bodyParser = require('body-parser')

// Load User model
const User = require('../model/Reservations');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('reservation route testing!'));

router.post('/createReservation', (req, res) => {  
    console.log('YOU ADDED A Reservation');
    Reservations.create({ ...req.body })
        .then(users => res.json({ msg: 'Reservation added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add reservation' }));
});
module.exports = router;