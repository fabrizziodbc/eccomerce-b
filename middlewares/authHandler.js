const boom = require('@hapi/boom');
const { config } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized('No está autorizado'));
  }
};

const checkAdmingrole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized('No está autorizado'));
  }
};
const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized('No está autorizado'));
    }
  };
};

module.exports = { checkApiKey, checkAdmingrole, checkRoles };
