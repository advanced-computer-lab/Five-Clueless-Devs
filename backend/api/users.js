const express = require('express');
const { models } = require('mongoose');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

    let { deptFlightId, retFlightId, deptFrom, deptTo, retFrom, retTo, refundedAmount, bookingNumber, to } = req.body
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
        subject: "Reservation Cancellation ",
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>This mail is to confirm that you canceled your flight reservation. </h2>
        <h3>Departure Flight</h3>
        <div>
        <p>Flight ID: ${deptFlightId}</p>
        <p>From: ${deptFrom}</p>
        <p>To: ${deptTo}</p>
        <p></p>
        </div>
        <h3>Return Flight</h3>
        <div>
        <p>Flight ID: ${retFlightId}</p>
        <p>From: ${retFrom}</p>
        <p>To: ${retTo}</p>
        <p></p>
        </div>
        <h3>Amount refunded is  EGP<span style="color:blue; font-size:25px">${refundedAmount}</span> for booking number: <span style="font-size:25px">
        ${bookingNumber}</span> </h3>

    
        <p>All the best, Five clueless devs!</p>
         </div>
    `})
    console.log("Message sent: %s", info.messageId);
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


// router.post("sign_up", async(req,res) => {
//     const user = req.body;

//     const takenEmail = await User.findOne({email: user.email})

//     if(takenEmail){
//         res.json({message: "Email already taken"})
//     }  else{
//         user.password= await bcrypt.hash(req.body.password, 10)

//         User.create({ ...req.body, isAdmin: "false" })
//         .then(console.log('User added successfully'))
//         .catch(err => res.status(400).json({ error: 'Unable to add User' }));
//     }
// })

// router.post("sign_in" , (req,res) => {
//     const userLoggingIn = req.body;

//     User.findOne({email: userLoggingIn.email})
//     .then(dbUser => {
//         if(!dbUser){
//             return res.json({
//                 message: "Invalid email"
//             })
//         }
//         bcrypt.compare(userLoggingIn.password, dbUser.password)
//         .then(isCorrect => {
//             if(isCorrect){
//                 const payload = {
//                     id:dbUser._id,
//                     email: dbUser.email,
//                 }
//                 jwt.sign(
//                     payload, 
//                     process.env.JWT_SECRET,
//                     {expiresIn: 86400},
//                     (err,token) => {
//                         if(err) return res.json({message:err})
//                         return res.json({
//                             message: "Success",
//                             token: "Bearer" + token
//                         })
//                     }
//                 )
//             }else{
//                 return res.json({
//                     message: "Invalid email or password"
//                 })
//             }
//         })
//     })
// })

// function verifyJWT(req,res,next){
//     const token = req.headers["x-access-token"]?.split(' ')[1]
//     if(token){
//         jwt.verify(token,process.env.PASSPORTSECRET, (err,decoded) => {
//             if(err) return res.json({
//                 isLoggedIn: false,
//                 message: "Failed To Authenticate"
//             })
//             req.user = {};
//             req.user.id = decoded.id
//             req.user.email = decoded.email
//             next()
//         })
//      } else{
//             res.json({message: "Incorrect Token Given" , isLoggedIn: false})
//         }
//     }

//     router.get("/getEmail", verifyJWT, (req,res) => {
//         res.json({isLoggedIn: true, username: req.user.email})  
//     })



module.exports = router;