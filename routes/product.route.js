const router = require('express').Router();
const {isLoggedIn, restrictUser} = require('../middleware/auth');

router.get('/',isLoggedIn,restrictUser("customer"),(req,res)=>{
    try {
        res.status(200).json("Working");
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;