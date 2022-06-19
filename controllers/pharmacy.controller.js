const {Pharmacy,validate} = require('../models/Pharmacy.model');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const router = require('../routes/auth.route');

// Registeration
const register = async(req,res,next) => {
    const checkPharmacy = await Pharmacy.findOne(req.params.pharmacyName);
    if(checkPharmacy) return res.status(409).json({message: "Pharmacy Already Exist"});

    try {
        const pharmacy = new Pharmacy({
            pharmacyName: req.body.pharmacyName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            owner: req.body.owner,
            pharmacyLocation: req.body.pharmacyLocation,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString(),
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
        const pharmacy = await Pharmacy.findOne({email: req.body.email});
        if(!pharmacy) return res.status(404).json({message: "User Not Found"});
        const hashPassword = CryptoJS.AES.decrypt(pharmacy.password,process.env.PASS_SECRET);
        const passwords = hashPassword.toString(CryptoJS.enc.Utf8);
        if(passwords !== req.body.password) return res.status(401).json({message: "Invalid Email & Password"});

        // JWT Configuration
        const accessToken = jwt.sign({
            id: pharmacy._id,
            role: pharmacy.role
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
        await Pharmacy.findOneAndDelete(req.params.id);
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

module.exports = {register,login,deletePharmacy,updatePharmacy};