const express = require('express');
const router = express.Router();
const { protect } = require('../../middlewares/authorization');
const { getUserProfile } = require('../../controllers/user/userController');

router.get('/info/:id', protect, getUserProfile);

module.exports = router;
