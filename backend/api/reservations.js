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

module.exports = router;