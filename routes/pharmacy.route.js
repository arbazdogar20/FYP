const router = require('express').Router();
const {register, login, deletePharmacy, updatePharmacy} = require('../controllers/pharmacy.controller');
const { isLoggedIn, restrictUser } = require('../middleware/auth');

// Register
router.post('/register',register);

// LOGIN
router.post('/login',login);

// DELETE PHARMACY
router.delete('/:id',isLoggedIn,restrictUser('admin'),deletePharmacy);

// UPDATE PHARMACY
router.put('/:id',isLoggedIn,restrictUser('pharmacy','admin'),updatePharmacy);


module.exports = router;