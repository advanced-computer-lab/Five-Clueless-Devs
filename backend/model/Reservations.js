

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  UserID:{
    type : String,
    required: true
  },
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
  cabin:{
    type:String ,
    required:true
  },
  price:{
    type: Number
  },
  numberOfSeats:{
    type: Number
  }
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);