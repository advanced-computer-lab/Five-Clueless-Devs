const express = require('express');

const connectDB = require('./config/db.js');

const app = express();

require("dotenv").config


const nodemailer = require("nodemailer")
const cors = require('cors');




// Connect Database
connectDB();


const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cors({ origin: true, credentials: true }));


app.get('/', (req, res) => res.send('Hello world!'));

//const bookRouter = require("./api/books")
//app.use("/api/books", bookRouter);

const userRouter = require('./api/users');
app.use('/api/users', userRouter);

const flightRouter = require('./api/flights');
app.use('/api/flights', flightRouter);

const reservationRouter = require('./api/reservations');
app.use('/api/reservations', reservationRouter);


app.post("/send_mail", cors(), async (req, res) => {
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
        <h2>Here is your email!</h2>
        <p>${text}</p>
    
        <p>All the best, Five clueless devs!</p>
         </div>
    `
	})
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));