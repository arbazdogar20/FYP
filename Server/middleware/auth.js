const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err) return res.status(403).json("Invalid Token");
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are Not Authenticated");
    }
}

const verifyTokenPharmacy = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.JWT_SECRET,(err,pharmacy)=>{
            if(err) return res.status(403).json("Invalid Token");
            req.pharmacy = pharmacy;
            next();
        });
    } else {
        return res.status(401).json({message: "You are Not Authenticated"})
    }
}

const verifyPharmacy = (req,res,next) => {
    verifyTokenPharmacy(req,res,next,()=>{
        if(req.pharmacy.id === req.params.id) {
            return next();
        } else {
            return res.status(401).json({message: "You are not admin"});;
        }
    });
}

const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin) { return next() }
        else { 
            return res.status(403).json({message: "You are not admin"}); 
        }
    });
}

module.exports = {verifyAdmin, verifyPharmacy}