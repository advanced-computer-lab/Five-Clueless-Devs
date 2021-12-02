const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
var bodyParser = require('body-parser')

require("dotenv").config

const nodemailer = require("nodemailer")
const cors = require('cors');

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
        .then(console.log('User added successfully'))
        .catch(err => res.status(400).json({ error: 'Unable to add User' }));
    
});

router.get('/search', (req, res) => {
    User.find(req.query)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nobookfound: 'No users found' }));
});


router.post('/send_mail', cors(), async (req, res) => {
    User.find(req.query).then(user => console.log(user));
	let { text } = req.body
	const transport = nodemailer.createTransport({
		host: process.env.MAIL_HOST,
		port: process.env.MAIL_PORT,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	})

	await transport.sendMail({
		from: process.env.MAIL_FROM,
		to: "dado.said1@gmail.com",
		subject: "test email",
		html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>This mail it to confirm that you canceled your flight reservation. </h2>
        <p>${text}</p>
    
        <p>All the best, Five clueless devs!</p>
         </div>
    `
	})
})

router.put('/update', (req, res) => {
    console.log("User updated");
    User.findOneAndUpdate(req.query, req.body)
        .then(console.log("updated succesfully"))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});


module.exports = router;