const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');
const mailSender = require('../utils/mailSender');
const OTP = require('../models/otpModel');


const login = async (req, res, next) => {
  const { email, password } = req.body;

   
  if (!email || !password) {
    const error = logger.create('Email and password are required', 400, handleStatus.ERROR);
    return next(error);
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      const error = logger.create('Invalid email or password', 401, handleStatus.ERROR);
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = logger.create('Invalid email or password', 401, handleStatus.ERROR);
      return next(error);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '90d' }
    );

    res.json({ message: 'Login successful',userId:user._id,role:user.role, token });
  } catch (err) {
    res.status(500).json({message:err.message})
  }
};


const register = async (req, res, next) => {
  const { firstName, lastName, email, password, address, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      const error = logger.create('Email already in use', 400, handleStatus.ERROR);
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      role, 
    });

    await newUser.save();
    // Generate OTP
    const otp = (100000 + Math.floor(Math.random() * 900000)).toString();
    const newOTP = new OTP({ email, otp });
    await newOTP.save(); // Ensure OTP is saved before proceeding

    // Find the most recent OTP for the email
    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    
    if (response.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'The OTP is not valid',
        });
    }

    return res.status(201).json({
        success: true,
        message: 'OTP sent successfully',
    });

  } catch (err) {
    res.status(500).json({message:err.message})

  }
};


const forgetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Please provide email, OTP, and new password.' });
  }

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      const otpRecords = await OTP.findOne({otp }).sort({ createdAt: -1 }).limit(1);
      if (otpRecords === null) {
          return res.status(400).json({ message: 'Invalid OTP.' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
      next(error);
  }
};


const logOut = async (req, res, next) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    const error = logger.create('Logout failed', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  login,
  register,
  forgetPassword,
  logOut,
};
