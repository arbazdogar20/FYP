const mongoose = require('mongoose');
const joi = require('joi');
const joiPassword = require('joi-password-complexity');

const PharmacySchema = new mongoose.Schema({
    pharmacyName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
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
        default: "sdfjkfjsdjhk"
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "pharmacy"
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
        owner: joi.string().required().label('Pharmacy Owner Name'),
        pharmacyLocation: joi.string().required().label('Pharmacy Location'),
        image: joi.string().label("Pharmacy Image"),
        password: joiPassword().required().label("Pharmacy Password"),
        role: joi.string().label("role")
    });
    return schema.validate(data);
}

module.exports = {Pharmacy, validate};