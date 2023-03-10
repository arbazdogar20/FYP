const { Doctor } = require('../models/Doctor.model');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

// Register
const register = async (req,res,next) => {
    const doctor = await Doctor.findOne({username: req.body.username});
    if(doctor) return res.status(409).json({message: "Doctor Already Exist"});
    try {
        const addDoctor = new Doctor({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString(),
            doctorName: req.body.doctorName,
            phoneNumber: req.body.phoneNumber,
            specialist: req.body.specialist,
            clinicName: req.body.clinicName,
            doctorEducation: req.body.doctorEducation,
            doctorLocation: req.body.doctorLocation,
            image: req.body.image,
            area: req.body.area,
            timing: req.body.timing,
            fee: req.body.fee,
            days: req.body.days
        });
        const savedDoctor = await addDoctor.save();
        res.status(201).json(savedDoctor);  
    } catch (err) {
        next(err);
    }
}

// Login
const login = async (req,res,next) => {
    try {
        const doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor) return res.status(404).json({message: "Doctor Not Found"});

        const hashPassword = CryptoJs.AES.decrypt(doctor.password,process.env.PASS_SECRET);
        const passwords = hashPassword.toString(CryptoJs.enc.Utf8);
        if(passwords !== req.body.password) return res.status(401).json({message: "Invalid Email & Password"});

        // JWT Configuration
        const accessToken = jwt.sign({
            id: doctor._id
        },
         process.env.JWT_SECRET,
         {expiresIn: "2d"}
        );
        const {password,...others} = doctor._doc;
        res.status(200).json({...others,accessToken});
    } catch (err) {
        next(err);
    }
};

// Update
const updateDoctor = async(req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor) return res.status(404).json({message: "Doctor Not Found"});
        if(req.body.password) {
            req.body.password = CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()
        }
        const updateDoctor = await Doctor.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },
            {new: true}
        );
        res.status(200).json(updateDoctor);
    } catch (err) {
        next(err);
    }
};

// Delete
const deleteDoctor = async(req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor) return res.status(404).json({message:"Doctor Not Found"});
        await doctor.remove();   
        res.status(200).json({message: "Doctor Deleted Successfully"});
    } catch (err) {
        next(err);
    }
}

// GET One
const getDoctor = async(req,res,next)=> {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if(!doctor) return res.status(404).json({message:"Doctor Not Found"});
        res.status(200).json(doctor);
    } catch (err) {
        next(err);
    }
}

// GET ALL 
const getAllDoctor = async (req,res,next) => {
    const query = req.query.new;
    try {
        const doctor = query ? await Doctor.find().sort({_id: -1}).limit(5) : await Doctor.find();
        if(!doctor) return res.status(404).json({message:"Doctor Not Found"});
        res.status(200).json(doctor);
    } catch (err) {
        next(err);
    }
}

// TOTAL DOCTORS
const totalDoctor = async (req,res,next) => {
    try {
        const data = await Doctor.count();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register, 
    login, 
    updateDoctor, 
    deleteDoctor, 
    getDoctor, 
    getAllDoctor,
    totalDoctor
};