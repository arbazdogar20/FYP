const  Medicine = require('../models/Medicines.models');

// CREATE MEDICINE
const createMedicine = async (req, res, next) => {
    try {
        const medicines = new Medicine(req.body);
        await medicines.save();
        res.status(201).json(medicines);
    } catch (err) {
        next(err);
    }
};

// UPDATE MEDICINE
const updateMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
        if (medicine.pharmacyName === req.body.pharmacyName) {
            try {
                const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedMedicine);
            } catch (error) {
                res.status(401).json({ message: "You Only Update Your Medicine" });
            }
        } else {
            res.status(401).json({ message: "You Only Update Your Medicine" });
        }
    } catch (err) {
        next(err);
    }
};

// DELETE MEDICINE
const deleteMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
        if (medicine.pharmacyName === req.body.pharmacyName) {
            try {
                await medicine.remove();
                res.status(200).json({ message: "Medicine Deleted Successfully" });
            } catch (error) {
                res.status(401).json({ message: "Can't Process Your Request" });
            }
        } else {
            res.status(401).json({ message: "You Only Delete Your Medicine" });
        }
    } catch (err) {
        next(err);
    }
};

// GET MEDICINE
const getMedicine = async (req, res, next) => {
    try {
        const medicine = await Medicine.findById(req.params.id);
        if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
        res.status(200).json(medicine);
    } catch (err) {
        next(err);
    }
};

// GET ALL MEDICINE
const getAllMedicine = async (req, res, next) => {
    const listNew = req.query.new;
    const query = req.query.pharmacyname;
    try {
        // const medicine = query ? await Medicine.find().sort({_id:-1}).limit(5) : await Medicine.find();
        if (query && listNew) {
            const medicine = await Medicine.find({ pharmacyName: query });
            if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
            res.status(200).json(medicine);
        } else if (query) {
            const medicine = await Medicine.find({ pharmacyName: query }).sort({ _id: -1 }).limit(5);
            if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
            res.status(200).json(medicine);
        } else {
            const medicine = await Medicine.find();
            if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
            res.status(200).json(medicine);
        }
    } catch (err) {
        next(err);
    }
};

// App Side Medicine Call
const availableMedicine = async (req, res, next) => {
    const two = req.query.two;
    try {
        const medicine = await Medicine.find({ inStock: two });
        if (!medicine) return res.status(404).json({ message: "Medicine Not Found" });
        res.status(200).json(medicine);
    } catch (err) {
        next(err);
    }
}

// GET MEDICINE STATS
const medicineStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const pharmacyName = req.query.pn;
    try {
        const data = await Medicine.aggregate([
            { $match: { pharmacyName, createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

// TOTAL MEDICINES
const totalMedicines = async (req, res, next) => {
    const fi = req.query.count;
    try {
        const data = await Medicine.find({ pharmacyName: fi }).count();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

// TOTAL MEDICINES COST
const medicinesCost = async (req, res, next) => {
    const pharmacyName = req.query.count;
    try {
        const data = await Medicine.aggregate(
            [
                { $match: { pharmacyName } },
                { $group: { _id: `$pharmacyName`, Amount: { $sum: `$price` } } }
            ]
        )
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

// WELCOME TIME
const welTime = async (req, res, next) => {
    try {
        const date = new Date();
        const a = date.getHours();
        if (a > 4 && a <= 12) return res.status(200).json("Good Morning 👋");
        if (a > 12 || a <= 18) return res.status(200).json("Good Afternoon 👋");
        if (a > 17 || a < 5) return res.status(200).json("Good Evening 👋");
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createMedicine,
    updateMedicine,
    deleteMedicine,
    getMedicine,
    getAllMedicine,
    availableMedicine,
    medicineStats,
    totalMedicines,
    medicinesCost,
    welTime
};