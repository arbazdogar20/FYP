const router = require('express').Router();
const {isLoggedIn,restrictUser} = require('../middleware/auth');
const {createMedicine} = require('../controllers/medicine.controller');

router.post('/create',isLoggedIn,restrictUser("pharmacy"),createMedicine);

module.exports = router;