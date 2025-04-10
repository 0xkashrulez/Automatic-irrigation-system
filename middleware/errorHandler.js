const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {

  logger.error(`Error in ${req.method} ${req.originalUrl}: ${err.message}`);
  logger.error(err.stack);

 
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;


  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
  });
};

module.exports = errorHandler;
