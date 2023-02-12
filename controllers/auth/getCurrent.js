const { User } = require(`../../models/user`);

const getCurrent = async (req, res) => {
  const { _id } = req.user;
  const currentUser = await User.findById(_id);

  res.status(200).json({
    email: currentUser.email,
    token: currentUser.token,
  });
};

module.exports = getCurrent;
