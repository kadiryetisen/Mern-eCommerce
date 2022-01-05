const { findUserById } = require('../../selectors/userSelector');
const asyncHandler = require('express-async-handler');

//

exports.getUserProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const user = await findUserById(id);

    if (user) {
      return res.status(201).json({
        name: user.name,
        surname: user.surname,
        email: user.email,
        image: user.image,
      });
    }
  } catch (err) {
    next({ message: err.message, status: 401 });
  }
});
