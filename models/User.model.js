const mongoose = require('mongoose');
const joi = require('joi');
const joiPassword = require('joi-password-complexity');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
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
    role:{
        type: String,
        enum: ["customer","pharmacy","doctor","admin"],
        default: "customer"
    },
    verified:{
        type: Boolean,
        default: false
    }
},
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema);

const validate = (data) =>{
    const schema = joi.object({
        username: joi.string().required().label("Username"),
        email: joi.string().email().required().label("Email"),
        password: joiPassword().required().label("Password"),
        role: joi.string()
    });
    return schema.validate(data);
}

module.exports = {User,validate}