const mongoose = require('mongoose');

const LaboratorySchema = new mongoose.Schema({
    labName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    labLocation: {
        type: String,
        required: true,
        unique: true
    },
    timing: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('laboratory',LaboratorySchema);