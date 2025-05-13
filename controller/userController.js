const User = require('../models/userModel');
const logger = require('../utils/logger');
const handleStatus = require('../utils/handelStatus');
const Support = require('../models/supportModel');

const getCurrentUser = async (req, res, next) => {
  try {
    console.log(req.currentUser);
    
    const user = await User.findById(req.currentUser.id).select('-password');
    if (!user) {
      const error = logger.create('User not found', 404, handleStatus.ERROR);
      return next(error);
    }
    res.json(user);
  } catch (err) {
    const error = logger.create('Server error', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.currentUser.id, req.body, {
      new: true,
    }).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    const error = logger.create('Failed to update profile', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const fetchAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    const error = logger.create('Failed to fetch users', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const {subject, message} = req.body;

    const newMessage = new Support({
      userId: req.currentUser.id,
      subject,
      message
    });

    await newMessage.save();

    console.log(`Message from user ${req.currentUser.id}:, { subject, message }`);
    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    const error = logger.create('Failed to send message', 500, handleStatus.ERROR, err.message);
    return next(error);
  }
};

module.exports = {
  getCurrentUser,
  editUser,
  fetchAllUser,
  sendMessage,
};
