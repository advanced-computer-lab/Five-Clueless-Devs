//all fields will be enforced in frontend

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    homeAddress: {
        type: String
    },
    countryCode: {
        type: String
    },
    telephone: {
        type: [String]
    },
    email: {
        type: String
    },
    passportNumber: {
        type: String
    },
    isAdmin:{
        type: Boolean,
        required: true
    },
    reservations:{
        type: [String],
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);