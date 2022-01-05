const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middlewares/authorization');
const { check } = require('express-validator');
const {
  checkValidProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getSingleProductToEdit,
  getProductsForPanelList,
} = require('../../controllers/admin/productsController');

router.post(
  '/add-product',
  check('name').notEmpty().withMessage('Name is required').bail(),
  check('price').notEmpty().withMessage('Price is required').bail(),
  check('brand').notEmpty().withMessage('Brand is required').bail(),
  check('description').notEmpty().withMessage('Description is required').bail(),
  check('category').notEmpty().withMessage('Category is required').bail(),
  check('image').notEmpty().withMessage('Image is required').bail(),
  check('countInStock').notEmpty().withMessage('Count in stock is required').bail(),
  checkValidProduct,
  protect,
  admin,
  createProduct
);

router.get('/all', protect, admin, getProductsForPanelList);
router.get('/:id', protect, admin, getSingleProductToEdit);
router.delete('/delete/:id', protect, admin, deleteProduct);
router.put('/update/:id', protect, admin, updateProduct);

module.exports = router;
