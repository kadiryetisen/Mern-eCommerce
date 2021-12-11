/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const crpyto = require('crypto');

const genAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '30d',
  });
};

const genRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '365d',
  });
};

const generateCode = (length) => {
  return crpyto.randomBytes(length).toString('hex').toUpperCase().substring(0, length);
};
module.exports = { genAccessToken, generateCode, genRefreshToken };
