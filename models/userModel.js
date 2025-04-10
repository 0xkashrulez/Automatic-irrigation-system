const mongoose = require('mongoose');
const validator = require("validator");
const userRole = require("../utils/userRoles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'field must be a valid email address']
  },
  role: {
    type: String,
    enum: [userRole.USER, userRole.ADMIN],
    default: userRole.USER
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    // select: false
  },
  userProfile: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('User', userSchema);
