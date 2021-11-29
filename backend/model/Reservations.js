

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userID:{
      type:String,
      required:true
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
  }

});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);