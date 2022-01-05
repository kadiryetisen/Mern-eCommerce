const { deleteUser, findAllUsers } = require('../../selectors/userSelector');
const asyncHandler = require('express-async-handler');

exports.getUsersForPanelList = asyncHandler(async (req, res) => {
  try {
    const users = await findAllUsers();

    const userList = await users.filter((user) => user.isAdmin === false);

    if (userList) {
      res.status(201).json(userList);
    }
  } catch (err) {
    next({ message: err.message, status: 409 });
  }
});
exports.deleteUser = asyncHandler(async (req, res) => {
  try {
    await deleteUser(req.params.id);
    const lastUsers = await findAllUsers();
    const userList = lastUsers.filter((user) => user.isAdmin === false);

    res.status(201).json({ message: 'User removed', users: userList });
  } catch (err) {
    next({ message: err.message, status: 500 });
  }
});
