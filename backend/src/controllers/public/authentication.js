const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { genAccessToken } = require('../../utils/generateToken');
const { findUserByEmail, isExistUser, createUser } = require('../../selectors/userSelector');

exports.userValidationErrorHandler = asyncHandler(async (req, res, next) => {
  const expressErrors = validationResult(req);

  if (!expressErrors.isEmpty()) {
    let errorList = { message: {} };
    await expressErrors.array().forEach((err) => (errorList.message[err.param] = err.msg));

    return res.status(400).json(errorList);
  }
  next();
});

exports.userRegisteration = asyncHandler(async (req, res) => {
  const body = req.body;
  const { email } = req.body;

  try {
    await isExistUser(email);
    const user = await createUser(body);

    if (user) {
      return res.status(201).json({
        user: {
          id: user._id,
          isAdmin: user.isAdmin,
          token: genAccessToken(user._id),
        },
        message: 'Signed up successfully',
      });
    }
  } catch (err) {
    if (err.message === 'This email is already exist') {
      res.status(401).json({ message: { email: err.message } });
    } else {
      next({ message: err.message, status: 500 });
    }
  }
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);

    const isMatchedPassword = await existingUser.matchPassword(password);

    if (existingUser && isMatchedPassword) {
      return res.status(201).json({
        user: {
          id: existingUser._id,
          isAdmin: existingUser.isAdmin,
          token: genAccessToken(existingUser._id),
        },
        message: 'Logged in successfully',
      });
    }
  } catch (err) {
    if (err.message === 'Invalid Email') {
      return res.status(401).json({ message: { email: err.message } });
    }
    if (err.message === 'Invalid Password') {
      return res.status(401).json({ message: { password: err.message } });
    }
  }
});
