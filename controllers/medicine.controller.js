const {Medicine,validate} = require('../models/Medicine.model');

const createMedicine = async(req,res) => {
    // const medicine = new Medicine({
    //     medicineName: req.body.medicineName,
    //     generic: req.body.generic,
    //     mg_ml: req.body.mg_ml,
    //     price: req.body.price,
    //     quantity: req.body.quantity,
    // });
    res.status(200).json("working");
}

module.exports = {createMedicine};