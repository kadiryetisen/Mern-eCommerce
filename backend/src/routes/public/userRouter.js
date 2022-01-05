const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { userValidationErrorHandler, userRegisteration, loginUser } = require('../../controllers/public/authentication');

const { forgotPassword, resetPassword } = require('../../controllers/public/forgotPassword');

router.route('/register').post(
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
  check('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Email must be valid'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isLength({ min: 6, max: 24 })
    .withMessage('Password must be minimum 6 and less than 24 character')
    .bail()
    .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/)
    .withMessage('Password must have at least 1 uppercase, 1 lowercase and 1 number'),
  userValidationErrorHandler,
  userRegisteration
);

router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/forgotPassword', forgotPassword);

module.exports = router;
