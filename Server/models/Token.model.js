const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
        unique: true
    },
    token:{
        type: String,
        required: true,
    }
},
    {timestamps: true}
);

const Token = mongoose.model("Token",TokenSchema);

module.exports = Token;