const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { nextTick } = require('process')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Please provide user name:'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email:'],
    validate: [validator.isEmail, 'Please provide valid email:'],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide your password:'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide your password:'],
    validate: {
      validator: function (el) {
        return this.password === el
      },
      message: 'Passwords dont match',
    },
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 10)

  this.passwordConfirm = undefined

  return next()
})

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword,
) {
  return bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
