const jwt = require('jsonwebtoken');

const isLoggedIn = (req,res,next) => {
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

const restrictUser = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(401).json("You Are Not Admin");
        }
        next();
    }
}

module.exports = {isLoggedIn, restrictUser}