const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(201).json({
    status: "success",
    data: {
      users,
    },
  });
});
exports.deleteUsers = catchAsync(async (req, res, next) => {
  const users = await User.deleteMany();
  res.status(200).json({
    status: "Success",
  });
});
