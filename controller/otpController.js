const User = require('../models/userModel');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');
const OTP = require('../models/otpModel');
const otpGenerator = require('otp-generator');

const sendOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp: otp  });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      otp,
    });
  } catch (err) {
    const error = logger.create('Failed to send OTP', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const existingOTP = await OTP.findOneAndDelete({ email, otp });
    if (existingOTP) {
      const user = await User.findOne({ email });
      console.log(user);
      if (user) {
        user.verified = true;
        await user.save();
        console.log("user", user);
        // OTP is valid
        res.status(200).json({ success: true, message: 'OTP verification successfully' });
      } else {
        res.status(404).json({ success: false, error: 'User not found' });
      }
    } else {
      // OTP is invalid
      res.status(400).json({ success: false, error: 'Invalid OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  sendOTP,
  verifyAccount,
};
