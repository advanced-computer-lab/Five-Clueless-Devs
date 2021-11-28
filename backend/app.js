const express = require('express');

const connectDB = require('./config/db.js');

const app = express();

var cors = require('cors');


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


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));