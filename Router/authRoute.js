const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { login, register, forgetPassword, logOut } = require('../controller/authController');
const { sendOTP, verifyAccount } = require('../controller/otpController');


router.post('/login',login);
router.post('/register', register);
router.post('/forget-password', forgetPassword);
router.post('/send-otp', sendOTP);
router.post('/verify-account', verifyAccount);
router.post('/logout', logOut);


module.exports = router;
