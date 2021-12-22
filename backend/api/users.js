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
    currEmail = req.body.email;
    console.log(currEmail);
    User.create({ ...req.body, isAdmin: "false" })
        .then(console.log('User added successfully'))
        .catch(err => res.status(400).json({ error: 'Unable to add User' }));

});

router.get('/search', (req, res) => {
    User.find(req.query)
        .then(user => res.json(user))
        .catch(err => res.status(404).json({ nobookfound: 'No users found' }));
});


router.post('/send_mail', cors(), async (req, res) => {

    let { text, to } = req.body
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
		to: to,
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
    `})
    //console.log("Message sent: %s", info.messageId);  
})


router.put('/update', (req, res) => {
    let { userId } = req.body
    console.log("updating user with id: " + userId);
    User.findOneAndUpdate(req.query, req.body)
        .then(res.status(200).json("updated succesfully"))
        .catch(err =>
            res.status(400).json({ error: 'Unable to update the Database' })
        );
});


router.post("/login" , (req, res) => {
    const userLoggingIn = req.body;
    //console.log(req.body)
    User.findOne({ email: userLoggingIn.email }).then((user) => {
      if (!user) {
        //console.log("invalid")
        return res.json({ message: "Invalid Email or Password" });
      }
      //console.log(user);
      bcrypt
        .compare(userLoggingIn.password, user.password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              id: user.userId,
              username: user.username,
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: "10h" },
              (err, token) => {
                if (err) {
                  return res.json({ message:"error" });
                }
                return res.json({ message: "Success", token: "Bearer " + token, user:user });
              }
            );
          } else {
            res.json({ message: "Invalid email or Password" });
          }  });
    });
  });




module.exports = router;