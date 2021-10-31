const express = require('express');
const { models } = require('mongoose');
const router = express.Router();

// Load User model
const Flight = require('../model/Flight');

// @route GET api/flights/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.send('user flight testing!'));


module.exports = router;