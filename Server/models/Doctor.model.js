const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    specialist: {
        type: String,
        required: true
    },
    clinicName: {
        type: String,
        required: true
    },
    doctorEducation: {
        type: String,
        required: true
    },
    doctorLocation: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    days: {
        type: String,
        required: true
    }
});

const Doctor = mongoose.model("Doctor",DoctorSchema);

module.exports = {Doctor};