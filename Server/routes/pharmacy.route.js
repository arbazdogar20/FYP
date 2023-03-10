const router = require('express').Router();
const {
    register, 
    login, 
    deletePharmacy, 
    updatePharmacy, 
    getAllPharmacy, 
    getPharmacy,
    totalPharmacy
} = require('../controllers/pharmacy.controller');
const { verifyAdmin } = require('../middleware/auth');

// Register
router.post('/register',register);

// LOGIN
router.post('/login',login);

// DELETE PHARMACY
router.delete('/:id',deletePharmacy);

// UPDATE PHARMACY
router.put('/:id',updatePharmacy);

// GET ONE PHARMACY
router.get('/:id',getPharmacy);

// GET ALL PHARMACY
router.get('/',getAllPharmacy);

// TOTAL PHARMACY
router.get('/count/total',totalPharmacy);

module.exports = router;