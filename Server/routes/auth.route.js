const router = require('express').Router();
const {register,login, verifyEmail} = require('../controllers/auth.controller');

router.post('/register',register);
router.get('/:id/verify/:token/',verifyEmail);

router.post('/login',login);

module.exports = router;