const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      next({ message: '401 Unauthorize, please login again', status: 401 });
    }
  }

  if (!token) {
    next({ message: '401 Unauthorize, please login again', status: 401 });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next({ message: '401 Unauthorize, please login again', status: 401 });
  }
};

module.exports = { protect, admin };
