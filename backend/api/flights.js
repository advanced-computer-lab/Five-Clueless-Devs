const express = require('express');
const { models } = require('mongoose');
const router = express.Router();

// Load User model
const Flight = require('../model/Flight');

// @route GET api/flights/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.json({"res" : "123"}));

// POST: Create a flight
router.post('/createFlight', (req, res) => {
    Flight.create({ ...req.body })
        .then(users => res.json({ msg: 'Flight added successfully' }))
        .catch(err => res.status(400).json({ error: 'Unable to add flight' }));
});

//GET: Search for a flight
router.get('/search', (req, res) => {
    Flight.find(req.query)
        .then(flight => res.json(flight))
        .catch(err => res.status(404).json({ nobookfound: 'No flights found' }));
});

//DELETE :Delete a flight
router.delete('/deleteFlight',(req,res) => {
    Flight.deleteOne({...req.body})
        .then(flight => res.json(flight))
        .catch(err => res.status(404).json(err));
})

module.exports = router;