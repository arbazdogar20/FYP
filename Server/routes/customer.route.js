const router = require('express').Router();
const { 
    signUp, 
    verifyEmail, 
    login, 
    customerUpdate, 
    getCustomer, 
    getAllCustomer, 
    customerStats, 
    deleteCustomer,
    totalCustomer
} = require('../controllers/customer.controller');

// GET STATS
router.get('/customerStats',customerStats);

// Register
router.post('/register',signUp);

// Verify Email
router.get('/:id/verify/:token/',verifyEmail);

// Login
router.post('/login',login);

// DELETE
router.delete('/:id',deleteCustomer);

// Update
router.put('/:id',customerUpdate);

// GET ONE
router.get('/:id',getCustomer);

// GET ALL
router.get('/',getAllCustomer);

// TOTAL CUSTOMERS
router.get('/count/total',totalCustomer);

module.exports = router;