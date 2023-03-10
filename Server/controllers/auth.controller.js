const {User} = require('../models/User.model');
const Token = require('../models/Token.model')
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const email = require('../utilities/email');

//Register
const register =  async (req,res)=>{
    const checkUser = await User.findOne({username: req.body.username});
    if(checkUser) return res.status(409).json({message: "User is already exist"}); 

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        image: req.body.image
    });
    try {
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

        const savedUser = await user.save();
        const verifyEmail = `${process.env.BASE_URL}api/auth/${savedUser.id}/verify/${token.token}`;
        await email(user.email,"Verify Account",verifyEmail);
        res.status(201).json({user: savedUser,message: "A verification link is send to your email"});
    } catch (error) {
        res.status(401).json(error)
    }
};

// Verfiy Email
const verifyEmail = async (req,res) =>{
    try {
        const user = await User.findOne({_id: req.params.id});
        if(!user) return res.status(404).json({message: "User Not Found"});

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if(!token) return res.status(404).json({message: "Invalid Link"});
        
        await user.updateOne({_id:user._id, verified: true});
        await token.remove();
        
        res.status(201).json({message: "Email Verified Successfully"});

    } catch (error) {
        res.status(500).json({message: "Innternal Server Error"});
    }
}

//Login
const login = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        if (!user) return res.status(404).json({message: "User Not Found"});
        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const passwords = hashPassword.toString(CryptoJS.enc.Utf8);
        if (passwords !== req.body.password) return res.status(401).json({message:'Invalid username & password'});

        if(!user.verified) return res.status(409).json({message: "Please Verify Your Account"});

        // JWT Configuration 
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET,
            { expiresIn: "15s" }
        );

        const {password,...others} = user._doc;
        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(401).json(error.message);
    }
};

module.exports = {register, login, verifyEmail};