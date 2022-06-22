const router = require('express').Router();
const {register, login, deletePharmacy, updatePharmacy, getAllPharmacy, getPharmacy} = require('../controllers/pharmacy.controller');
const { isLoggedIn, restrictUser } = require('../middleware/auth');

// Register
router.post('/register',isLoggedIn,restrictUser('admin'),register);

// LOGIN
router.post('/login',login);

// DELETE PHARMACY
router.delete('/:id',isLoggedIn,restrictUser('admin'),deletePharmacy);

// UPDATE PHARMACY
router.put('/:id',isLoggedIn,restrictUser('pharmacy','admin'),updatePharmacy);

// GET ONE PHARMACY
router.get('/:id',isLoggedIn,restrictUser('pharmacy','admin'),getPharmacy);

// GET ALL PHARMACY
router.get('/',isLoggedIn,getAllPharmacy);

module.exports = router;