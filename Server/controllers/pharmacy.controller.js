const {Pharmacy} = require('../models/Pharmacy.model');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

// Registeration
const register = async(req,res,next) => {
    try {
        const checkPharmacy = await Pharmacy.findOne({pharmacyName:req.body.pharmacyName});
        if(checkPharmacy) return res.status(409).json({message: "Pharmacy Already Exist"});

        const pharmacy = new Pharmacy({
            pharmacyName: req.body.pharmacyName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            owner: req.body.owner,
            pharmacyLocation: req.body.pharmacyLocation,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString(),
            image: req.body.image,
            area: req.body.area,
            timing: req.body.timing
        });
        const savePharmacy =await pharmacy.save();
        res.status(201).json({pharmacy: savePharmacy,message: "Pharmacy Created Successfully"});
    } catch (err) {
        next(err)
    }
}

// Login
const login = async (req,res,next) => {
    try {
        const pharmacy = await Pharmacy.findOne({pharmacyName: req.body.pharmacyName});
        if(!pharmacy) return res.status(404).json({message: "User Not Found"});
        const hashPassword = CryptoJS.AES.decrypt(pharmacy.password,process.env.PASS_SECRET);
        const passwords = hashPassword.toString(CryptoJS.enc.Utf8);
        if(passwords !== req.body.password) return res.status(401).json({message: "Invalid Pharmacy & Password"});

        // JWT Configuration
        const accessToken = jwt.sign({
            id: pharmacy._id
        },
            process.env.JWT_SECRET,
            {expiresIn: "2d"}
        );
        const {password,...others} = pharmacy._doc;
        res.status(200).json({...others,accessToken});
    } catch (err) {
        next(err)
    }
}

// DELETE PHARMACY
const deletePharmacy = async (req,res,next) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if(!pharmacy) return res.status(404).json({message: "Pharmacy Not Found"});
        await pharmacy.remove();
        res.status(200).json({message:"Pharmacy Deleted Successfully"});
    } catch (err) {
        next(err)
    }
}

// UPDATE PHARMACY
const updatePharmacy = async (req,res,next) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if(!pharmacy) return res.status(404).json({message: "Pharmacy Not Found"});
        const a = req.body.password;
        if(a.length <= 5) return res.status(401).json({message: "Password Length Minimum 5 Character"});
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()
        }
        const updatePharmacy = await Pharmacy.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },
            {new: true}
        );
        res.status(200).json(updatePharmacy);
    } catch (err) {
        next(err);
    }
}

// GET ONE
const getPharmacy = async (req,res,next) => {
    try {
        const pharmacy = await Pharmacy.findById(req.params.id);
        if(!pharmacy) return res.status(404).json({message: "Pharmacy Not Found"});
        res.status(200).json(pharmacy);
    } catch (err) {
        next(err);
    }
}

// GET ALL PHARMACY
const getAllPharmacy = async (req,res,next) => {
    const query = req.query.new;
    try {
        const pharmacy = query ? await Pharmacy.find().sort({_id:-1}).limit(5) : await Pharmacy.find();
        if(!pharmacy) return res.status(404).json({message: "Pharmacies Not Found"});
        res.status(200).json(pharmacy);
    } catch (err) {
        next(err);
    }
}

// TOTAL PHARMACIES
const totalPharmacy = async (req,res,next) => {
    try {
        const data = await Pharmacy.count();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    deletePharmacy,
    updatePharmacy,
    getAllPharmacy,
    getPharmacy,
    totalPharmacy
};