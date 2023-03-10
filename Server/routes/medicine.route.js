const router = require('express').Router();
const {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicine,
    getAllMedicine,
    availableMedicine,
    medicineStats,
    totalMedicines,
    medicinesCost,
    welTime,
} = require('../controllers/medicine.controller');

// CREATE MEDICINE
router.post('/create',createMedicine);

// UPDATE MEDICINE
router.put('/:id',updateMedicine);

// DELETE MEDICINE
router.delete('/:id',deleteMedicine);

// INSTOCK MEDICINE
router.get('/availablemedicine',availableMedicine);

// GET MEDICINE STATS
router.get('/medicine-stats',medicineStats);

// TOTAL MEDICINES
router.get('/total-medicines',totalMedicines);

// TOTAL MEDICINE COST
router.get('/medicine-cost',medicinesCost);

// WEL TIME
router.get('/wel-time',welTime);

// GET ONE MEDICINE
router.get('/:id',getMedicine);

// GET ALL MEDICINE
router.get('/',getAllMedicine);

module.exports = router;