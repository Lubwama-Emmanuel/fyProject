const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = function (user, statusCode, res) {
  const token = signToken(user.id)
  user.password = undefined;

  res.status(statusCode).json({
    status: 'Success',
    token,
    data: {
      user,
    },
  })
}

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  })
  createSendToken(newUser, 201, res)
})

exports.logIn = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body
  // 1) Check if user provided his username and password
  if (!userName || !password) {
    return next(new AppError('Please provide your userName and Password', 400))
  }
  // 2) find user with correct password
  const user = await User.findOne({ userName }).select('+password')
  const correct = await user.correctPassword(password, user.password)

  if (!userName || !correct) {
    return next(new AppError('Incorrect UserName or Password', 400))
  }
  const token = signToken(user.id)
  res.status(200).json({
    status: 'Success',
    token
  })
})
