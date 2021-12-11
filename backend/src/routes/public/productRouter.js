const express = require('express');
const router = express.Router();

const { getAllProducts, getDetailPage } = require('../../controllers/public/productController');

router.get('/', getAllProducts);
router.get('/detail/:id', getDetailPage);
module.exports = router;
