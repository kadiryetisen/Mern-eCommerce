const asyncHandler = require('express-async-handler');
const { genAccessToken } = require('../../utils/generateToken');
const { findUserByEmail, updateResetCode, findUserByResetCode } = require('../../selectors/userSelector');

const { sendResetPasswordCode } = require('../../email/emailText');

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (user) {
      const updatedUser = await updateResetCode(user);

      sendResetPasswordCode(updatedUser);
      return res.status(201).json({ message: 'Password reset link has been sent to your email adress' });
    }
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { resetCode } = req.body;
  try {
    const user = await findUserByResetCode(resetCode);
    if (user) {
      return res.status(201).json({
        user: {
          id: user._id,
          isAdmin: user.isAdmin,
          token: genAccessToken(user._id),
        },
        message: 'Logged in successfully',
      });
    }
  } catch (err) {
    return res.status(401).json({ message: 'Wrong reset password code' });
  }
});
