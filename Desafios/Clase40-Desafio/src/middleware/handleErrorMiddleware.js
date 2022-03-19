const { loggerFile } = require("../config/logs/typesLogger");

const handleErrorMiddleware = (error, req, res, next) => {
  loggerFile.error(`url: ${req.url} - method: ${req.method}`);
  res.status(500).send();
}

module.exports = {
  handleErrorMiddleware
}