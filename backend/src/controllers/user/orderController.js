const asyncHandler = require('express-async-handler');
const { createNewAddress } = require('../../selectors/orderSelector');
const { validationResult } = require('express-validator');

exports.addressValidator = asyncHandler(async (req, res, next) => {
  const expressErrors = validationResult(req);
  if (!expressErrors.isEmpty()) {
    let errorList = { message: {} };
    await expressErrors.array().forEach((err) => (errorList.message[err.param] = err.msg));
    return res.status(400).json(errorList);
  }

  next();
});

exports.saveAddress = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const address = req.body;
  const updatedUser = await createNewAddress(address, user);

  if (updatedUser) {
    return res.status(201).json({
      message: 'Address has been created',
      addresses: updatedUser.shippingAddress,
    });
  } else {
    next({ message: '409 Address has not been created, please try again later', status: 409 });
  }
});

exports.getAllAdresses = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (user) {
    return res.status(201).json({
      addresses: user.shippingAddress,
    });
  } else {
    next({ message: 'We can not access your address, please try again later', status: 500 });
  }
});

// /delete/address
exports.deleteAddress = asyncHandler(async (req, res, next) => {
  const user = req.user;
  const { id } = req.body;

  try {
    const newAddresses = user.shippingAddress.filter((add) => add.id !== id);
    user.shippingAddress = newAddresses;
    const updatedUser = await user.save();
    if (updatedUser) {
      return res.status(201).json({ addressList: newAddresses, message: 'Address has been deleted successfully' });
    }
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});
