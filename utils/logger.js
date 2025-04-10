const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

const create = (message, status, statustxt) => {
  return {
    message,
    status,
    statustxt
  };
};

module.exports = {
  info,
  error,
  create 
};
