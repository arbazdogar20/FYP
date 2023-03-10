const Laboratory = require('../models/Laboratory.model');

const register = async(req,res,next) => {
    try {
        const checkLaboratory = await Laboratory.findOne({labName:req.body.labName});
        if(checkLaboratory) return res.status(409).json({message:"Laboratory Already Exit"});
        const laboratory = new Laboratory({
            labName: req.body.labName,
            phoneNumber: req.body.phoneNumber,
            labLocation: req.body.labLocation,
            timing: req.body.timing,
            image: req.body.image,
            area: req.body.area,
        });
        await laboratory.save();
        res.status(201).json(laboratory);
    } catch (err) {
        next(err);
    }
};

const updateLaboratory = async (req,res,next) => {
    try {
        const laboratory = await Laboratory.findById(req.params.id);
        if(!laboratory) return res.status(404).json({message: "Laboratory Not Found"});
        // const a = req.body.password;
        // if(a.length <= 5) return res.status(401).json({message: "Password Length Minimum 5 Character"});
        // if(req.body.password) {
        //     req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()
        // }
        const updateLaboratory = await Laboratory.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },
            {new: true}
        );
        res.status(200).json(updateLaboratory);
    } catch (err) {
        next(err);
    }
};

// DELETE LABORATORY
const deleteLaboratory = async (req,res,next) => {
    try {
        const laboratory = await Laboratory.findById(req.params.id);
        if(!laboratory) return res.status(404).json({message: "Laboratory Not Found"});
        await Laboratory.remove();
        res.status(200).json({message:"Laboratory Deleted Successfully"});
    } catch (err) {
        next(err)
    }
};


// GET ONE
const getLaboratory = async (req,res,next) => {
    try {
        const laboratory = await Laboratory.findById(req.params.id);
        if(!laboratory) return res.status(404).json({message: "Laboratory Not Found"});
        res.status(200).json(laboratory);
    } catch (err) {
        next(err);
    }
}

// GET ALL Laboratory
const getAllLaboratory = async (req,res,next) => {
    const query = req.query.new;
    try {
        const laboratory = query ? await Laboratory.find().sort({_id:-1}).limit(5) : await Laboratory.find();
        if(!laboratory) return res.status(404).json({message: "Laboratires Not Found"});
        res.status(200).json(laboratory);
    } catch (err) {
        next(err);
    }
}

// TOTAL Laboratory
const totalLaboratory = async (req,res,next) => {
    try {
        const data = await Laboratory.count();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    register,
    updateLaboratory,
    deleteLaboratory,
    getLaboratory,
    getAllLaboratory,
    totalLaboratory
};