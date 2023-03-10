const {Customer} = require('../models/Customer.model');
const jwt = require('jsonwebtoken');
const email = require('../utilities/email');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const { CustomerToken } = require('../models/CustomerToken.model');

const signUp = async (req,res,next) => {
    try {
        const checkCustomerName = await Customer.findOne({username: req.body.username});
        if(checkCustomerName) return res.status(409).json({message:"User Already Exist"});
        const checkCustomerEmail = await Customer.findOne({email: req.body.email});
        if(checkCustomerEmail) return res.status(409).json({message:"Email Already Taken"});
        const p = req.body.password;
        if(p.length < 6) return res.status(409).json({message:"Password Length should be 5 min Character"});

        const customer = new Customer({
            username: req.body.username,
            fullName: req.body.fullName,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(p,process.env.PASS_SECRET).toString(),
            image: req.body.image
        });
        try {
            const token = await new CustomerToken({
                customerId: customer._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
            const savedCustomer = await customer.save();
            const verifyEmail = `${process.env.BASE_URL}api/user/${savedCustomer.id}/verify/${token.token}`;
            await email(customer.email,"Verify Account",verifyEmail);
            res.status(201).json({customer: savedCustomer, message:"A Verification Email Is Send to your email"});  
        } catch (err) {
            res.status(401).json(err.message);
        }

    } catch (err) {
        next(err);
    }
}

const verifyEmail = async (req,res,next) => {
    try {
        const customer = await Customer.findOne({_id: req.params.id});
        if(!customer) return res.status(404).json({message: "User Not Found"});

        const token = await CustomerToken.findOne({
            customerId: customer._id,
            token: req.params.token
        });
        if(!token) return res.status(404).json({message:"Invalid Link"});

        await customer.updateOne({_id:customer._id, verified: true});
        await token.remove();

        res.status(200).json({message: "Email Verified Successfully"});

    } catch (err) {
        next(err);
    }
}

// Login
const login = async (req,res,next) => {
    try {
        const customer = await Customer.findOne({username: req.body.username});
        if(!customer) return res.status(404).json({message: "User Not Found"});
        const hashedPassword = CryptoJS.AES.decrypt(customer.password,process.env.PASS_SECRET);
        const passwords = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(passwords !==  req.body.password) return res.status(401).json({message:"Invalid Email or Password"});

        if(!customer.verified) return res.status(409).json({message: "Please Verify Your Account"});

        // JWT Config
        const accessToken = jwt.sign({
            id: customer._id
        },
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        const {password, ...others} = customer._doc;
        res.status(200).json({...others,accessToken});

    } catch (err) {
        next(err);
    }
};

// Update
const customerUpdate = async (req,res,next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).json({message: "User Not Found"});
        
        const hashedPassword = CryptoJS.AES.decrypt(customer.password,process.env.PASS_SECRET);
        const passwords = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(passwords !==  req.body.password) return res.status(401).json({message:"Password Is Incorrect"});
        if(req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString()
        };
        const updateCustomer = await Customer.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },
            {new: true}
        );
        res.status(200).json({customer:updateCustomer, message:"Profile Updated Successfully"});
    } catch (err) {
        next(err);
    }
};

// DELETE
const deleteCustomer = async (req,res,next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).json({message:"User Not Found"});
        await customer.remove();
        res.status(200).json({message: "User Deleted Successfully"});
    } catch (err) {
        next(err);
    }
}

// GET ONE
const getCustomer = async (req,res,next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).json({message: "User Not Found"});
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

// GET ALL
const getAllCustomer = async (req,res,next) => {
    const query = req.query.new;
    try {
        const customer = query ? await Customer.find().sort({_id:-1}).limit(5) : await Customer.find();
        if(!customer) res.status(404).json({message: "User Not Found"});
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

// GET CUSTOMER STARTS
const customerStats = async(req,res,next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await Customer.aggregate([
            { $match:{createdAt: { $gte:lastYear }}},
            {
                $project:{
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id:"$month",
                    total: { $sum:1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

// TOTAL PHARMACIES
const totalCustomer = async (req,res,next) => {
    try {
        const data = await Customer.count();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = { 
    signUp, 
    verifyEmail, 
    login, 
    customerUpdate,
    getCustomer, 
    getAllCustomer, 
    deleteCustomer, 
    customerStats,
    totalCustomer
};