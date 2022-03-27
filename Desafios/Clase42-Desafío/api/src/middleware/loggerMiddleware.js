const { loggerConsole } = require("../config/logs/typesLogger");

const loggerMiddleware = (req, res, next) => {
  loggerConsole.info(`url: ${req.url} - method: ${req.method}`);
  next();
}

module.exports = {
  loggerMiddleware
}