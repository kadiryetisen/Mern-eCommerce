const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { genRefreshToken, genAccessToken } = require('../utils/generateToken');

const shippingAddress = mongoose.Schema(
  {
    name: { type: String },
    surname: { type: String },
    addressName: { type: String },
    address: { type: String },
    country: { type: String },
    city: { type: String },
    district: { type: String },
    phone: { type: Number },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 6,
    },
    image: { type: String, default: 'https://qph.fs.quoracdn.net/main-qimg-654617264f9192ec976abe6e53356240-lq' },
    resetPasswordCode: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    shippingAddress: [shippingAddress],
  },
  { timestamps: true }
);

// 	@ Comparing hashed password and entered password

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatched = await bcrypt.compare(enteredPassword, this.password);
  if (!isMatched) {
    throw new Error('Invalid Password');
  }
  return isMatched;
};

//generate hash password before saving + NOT : HATA YÖNETİMİNİ ÇÖZEMEDİM !
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  //capitilize name and surname
  this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
  this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1);
  //hashes password
  const genNum = await parseInt(process.env.GEN_SALT);
  const salt = await bcrypt.genSalt(genNum);
  this.password = await bcrypt.hash(this.password, salt);
  // accessToken
  const refreshToken = await genRefreshToken(this);
  this.refreshToken = refreshToken;
});

const User = mongoose.model('users', userSchema);

module.exports = User;
