const mongoose = require('mongoose');
const joi = require('joi');
const joiPassword = require('joi-password-complexity');

const PharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: String,
        required: true
    },
    pharmacyLocation:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    timing: {
        type: String,
        required: true
    }
},
    {timestamps: true}
);

const Pharmacy = mongoose.model("Pharmacy",PharmacySchema);

module.exports = {Pharmacy};