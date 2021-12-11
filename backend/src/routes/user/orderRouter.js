const express = require('express');
const router = express.Router();
const { protect } = require('../../middlewares/authorization');
const { check } = require('express-validator');

const {
  addressValidator,
  saveAddress,
  getAllAdresses,
  deleteAddress,
} = require('../../controllers/user/orderController');
router
  .route('/address')
  .post(
    check('name')
      .notEmpty()
      .withMessage('Name is required')
      .bail()
      .isLength({ min: 2, max: 16 })
      .withMessage('Name must be minimum 2 and less than 16 character')
      .isString()
      .withMessage('Name must be string'),
    check('surname')
      .notEmpty()
      .withMessage('Surname is required')
      .bail()
      .isLength({ min: 2, max: 16 })
      .withMessage('Surname must be minimum 2 and less than 16 character')
      .isString()
      .withMessage('Surname must be string'),
    check('addressName').notEmpty().withMessage('Address name is required').bail(),
    check('address').notEmpty().withMessage('Address is required').bail(),
    check('country').notEmpty().withMessage('Country is required').bail(),
    check('city').notEmpty().withMessage('City is required').bail(),
    check('district').notEmpty().withMessage('District is required').bail(),
    check('phone')
      .notEmpty()
      .withMessage('Phone is required')
      .bail()
      .isNumeric()
      .withMessage('Phone area must be number')
      .bail(),
    protect,
    addressValidator,
    saveAddress
  );

router.get('/all/addresses', protect, getAllAdresses);
router.put('/delete/address', protect, deleteAddress);
module.exports = router;
