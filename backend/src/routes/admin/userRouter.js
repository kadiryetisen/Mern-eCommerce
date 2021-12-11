const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middlewares/authorization');

const { getUsersForPanelList, deleteUser } = require('../../controllers/admin/usersController');

router.get('/all', protect, admin, getUsersForPanelList);

router.delete('/delete/:id', protect, admin, deleteUser);

module.exports = router;
