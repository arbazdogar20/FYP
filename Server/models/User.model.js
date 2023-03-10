const mongoose = require('mongoose');

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
    verified:{
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        default: "default.png"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
},
    {timestamps:true}
);

const User = mongoose.model("User",UserSchema);

module.exports = {User}