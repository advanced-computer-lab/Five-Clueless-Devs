const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightId: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    availableEconomy: {
        type: Number,
        required: true
    },
    availableBusiness: {
        type: Number,
        required: true
    },
    availableFirst: {
        type: Number,
        required: true
    },
    arrivalTerminal: {
        type: String,
        required: true
    },
    departureTerminal: {
        type: String,
        required: true
    }
});

module.exports = Flight = mongoose.model('flight', FlightSchema);