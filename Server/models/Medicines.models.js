const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    medicineName: {
        type: String,
        required: true
    },
    generic: {
        type: String,
        required: true
    },
    mg_ml: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "16601145081729134panadol extra 100tabs.png"
    },
    inStock: {
        type: Boolean,
        default: true
    },
    pharmacyName: {
        type: String,
        required: true
    },
    pharmacyLocation: {
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

module.exports = mongoose.model("Medicine",MedicineSchema);