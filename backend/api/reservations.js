const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
var bodyParser = require('body-parser')


// Load User model
const Reservations = require('../model/Reservations');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('reservation route testing!'));

router.post('/createReservation', (req, res) => {
    console.log('YOU ADDED A Reservation');
    Reservations.create({ ...req.body })
        .then(Reservations => res.json(Reservations))
        .catch(err => res.status(400).json({ error: 'Unable to add reservation' }));
});
router.delete('/cancelReservation', (req, res) => {
    Reservations.deleteOne({ ...req.query })
        .then(Reservations => res.json(Reservations))
        .catch(err => res.status(404).json(err));
});
router.get('/GetReservation', (req, res) => {
    Reservations.find(req.query)
        .then(Reservations => res.json(Reservations))
        .catch(err => res.status(404).json({ noreservationfound: 'No Reservation found' }));
});

router.put('/update', (req, res) => {
    Reservations.findOneAndUpdate(req.query, req.body)
        .then(reservation => res.json({ msg: "Reservation updated succesfully" }))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the reservation' })
        );
});



module.exports = router;