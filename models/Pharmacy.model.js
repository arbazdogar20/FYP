const mongoose = require('mongoose');
const joi = require('joi');

const PharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    ownerName:{
        type: String,
        required: true
    },
    pharmacyLocation:{
        type: String,
        required: true,
        unique: true
    }
},
    {timestamps: true}
);

const Pharmacy = mongoose.model("Pharmacy",PharmacySchema);

const validate = (data) => {
    const schema = joi.object({
        pharmacyName: joi.string().required().label("Pharmacy Name"),
        email: joi.string().required().label('Pharmacy Email'),
        phoneNumber: joi.string().required().label('Pharmacy Contact Number'),
        ownerName: joi.string().required().label('Pharmacy Owner Name'),
        pharmacyLocation: joi.string().required().label('Pharmacy Location')
    });
    return schema.validate(data);
}

module.exports = {Pharmacy, validate};