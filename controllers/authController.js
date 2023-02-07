const User = require("../models/userModel");

exports.signup = async (req, res) => {
  ({ name, email, password, passwordConfirm } = req.body);
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      passwordConfirm,
    });
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
