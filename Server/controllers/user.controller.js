const { User } = require('../models/User.model');

const userStats = async(req,res,next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await User.aggregate([
            { $match:{createdAt: { $gte:lastYear }}},
            {
                $project:{
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id:"$month",
                    total: { $sum:1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {userStats};