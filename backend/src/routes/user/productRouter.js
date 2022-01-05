const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { protect } = require('../../middlewares/authorization');

const { createProductReview } = require('../../controllers/user/productController');

router.post('/review/:id', createProductReview);

module.exports = router;
