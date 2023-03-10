const router = require('express').Router();
const {
    register, 
    updateLaboratory,
    deleteLaboratory,
    getLaboratory,
    getAllLaboratory,
    totalLaboratory
} = require('../controllers/laboratory.controller');

// Register
router.post('/create',register);

// Update
router.put('/:id',updateLaboratory);

// DELETE
router.delete('/:id',deleteLaboratory);

// GET ONE
router.get('/:id',getLaboratory);

//GET ALL
router.get('/',getAllLaboratory);

// TOTAL PHARMACY
router.get('/count/total',totalLaboratory);

module.exports = router;