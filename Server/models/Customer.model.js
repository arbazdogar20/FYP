const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        requird: true
    },
    image: {
        type: String,
        default: "2.jpg"
    },
    city: {
        type: String,
        default: 'Lahore'
    },
    phoneNumber: {
        type: String,
        default: '03001234567'
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true}
);

const Customer = mongoose.model('Customer',CustomerSchema);

module.exports = {Customer};