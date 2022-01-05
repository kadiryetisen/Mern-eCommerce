const User = require('../models/userModel');
const { generateCode } = require('../utils/generateToken');
//sf
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  if (user !== null) {
    return user;
  } else {
    throw new Error('Invalid Email');
  }
};
const findUserById = async (id) => {
  const user = await User.findById(id);

  if (user !== null) {
    return user;
  } else {
    throw new Error('Invalid Email');
  }
};
const findUserByResetCode = async (ResetPasswordCode) => {
  const user = await User.findOne({ ResetPasswordCode });

  if (user) {
    return user;
  } else {
    throw new Error('Wrong Password Code ');
  }
};

//sf
const createUser = async (body) => {
  const user = await User.create({ ...body });
  if (user) {
    return user;
  }
  throw new Error('Unexpected Error , Please try again later');
};
//sf
const deleteUser = async (id) => {
  const user = await User.findOne({ _id: id });

  if (user) {
    await user.remove();
    return;
  }
  throw new Error('User not found');
};
const isExistUser = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }
  throw new Error('This email is already exist');
};
//sf
const updateUser = async (oldUser, updateInfo) => {
  const { name, surname, password } = updateInfo;

  oldUser.name = name;
  oldUser.surname = surname;
  oldUser.password = password;

  const updatedUser = await oldUser.save();
  if (updatedUser) {
    return updatedUser;
  }
  throw new Error('User not be updated');
};
const findAllUsers = async () => {
  const users = await User.find({});

  if (users !== null) {
    return users;
  }
  throw new Error('Users not Found');
};

//sf
const updateResetCode = async (user) => {
  const newCode = await generateCode(5);
  user.resetPasswordCode = newCode;
  const updatedUser = await user.save();
  if (updatedUser) {
    return updatedUser;
  }
  throw new Error('Invalid User');
};
//sf

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
  updateResetCode,
  isExistUser,
  findUserByResetCode,
};
