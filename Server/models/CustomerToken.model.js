const mongoose = require('mongoose');

const CustomerTokenSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Customer",
        unique: true
    },
    token:{
        type: String,
        required: true,
    }
},
    {timestamps: true}
);

const CustomerToken = mongoose.model("CustomerToken",CustomerTokenSchema);

module.exports = {CustomerToken};