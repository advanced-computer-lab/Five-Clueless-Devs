

const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  from: {
    type: Number,
    required: true
  },
  to: {
    type: Number,
    required: true
  },
});

module.exports = Reservation = mongoose.model('reservation', ReservationSchema);