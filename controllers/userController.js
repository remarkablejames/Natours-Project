const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const tours = await User.find();
  res.status(200).json({
    status: "success, below are all the users",
    data: tours,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const id = req.params.id * 1;
  const user = await User.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

// delete user
exports.deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id * 1;
  const user = await User.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
