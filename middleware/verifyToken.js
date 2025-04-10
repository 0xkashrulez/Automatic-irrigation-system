const jwt = require('jsonwebtoken');
const handleStatus = require('../utils/handelStatus');
const logger = require('../utils/logger');

const verifyToken = (req, res, next) => {
   
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    
    if (!authHeader) {
        const error = logger.create('Token is required', 401, handleStatus.ERROR);
        return next(error);
    }

 
    const token = authHeader.split(' ')[1];
    if (!token) {
        const error = logger.create('Token is missing', 401, handleStatus.ERROR);
        return next(error);
    }

    try {
 
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;  
        next(); 

    } catch (err) {
       
        const error = logger.create('Invalid or expired token', 401, handleStatus.ERROR);
        return next(error);
    }   
}

module.exports = verifyToken;
