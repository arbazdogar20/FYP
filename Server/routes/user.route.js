const router = require('express').Router();
const { verifyAdmin } = require('../middleware/auth');
const { userStats } = require('../controllers/user.controller');

router.get('/userstats',userStats);

module.exports = router;