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
