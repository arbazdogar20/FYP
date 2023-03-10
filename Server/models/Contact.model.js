const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    who: {
        type: String,
    },
    image: {
        type: String,
        required: false,
        default: 'logo.png'
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('contactus',ContactSchema);