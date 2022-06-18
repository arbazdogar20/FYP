const mongoose = require('mongoose');
const joi = require('joi');

const MedicineSchema = new mongoose.Schema({
    medicineName:{
        type: String,
        required: true,
        unique: true
    },
    generic:{
        type: String,
        required: true,
    },
    mg_ml: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false,
        default: "default.png"
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
},{timestamps:true});

const Medicine = mongoose.model("Medicine",MedicineSchema);

const validate = (data) => {
    const schema = joi.object({
        medicineName: joi.string().required().label("Medicine Name"),
        generic: joi.string().required().label("Medicine Generic/Formula"),
        mg_ml: joi.number().required().label("Medicine mg_ml"),
        img: joi.string().required().label("Medicne Image"),
        price: joi.number().required().label("Medicine Price"),
        quantity: joi.number().required().label("Medicine Quantity"),

    });
    return schema.validate(data);
}

module.exports = {Medicine,validate};