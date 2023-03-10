const router = require('express').Router();
const { 
    register, 
    login, 
    updateDoctor, 
    getDoctor, 
    getAllDoctor, 
    deleteDoctor,
    totalDoctor
} = require('../controllers/doctor.controller');
const { verifyAdmin } = require('../middleware/auth');

// Register
router.post('/register',register);

// Login
router.post('/login',login);

// Update
router.put('/:id',updateDoctor);

//delete
router.delete('/:id',deleteDoctor);

// Get One
router.get('/:id',getDoctor);

// Get All
router.get('/',getAllDoctor);

// TOTAL DOCTORS
router.get('/count/total',totalDoctor);

module.exports = router;