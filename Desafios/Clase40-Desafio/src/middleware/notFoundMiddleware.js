const { loggerFile } = require("../config/logs/typesLogger");

const notFoundMiddleware = (req, res) => {
  loggerFile.warn(`url: ${req.url} - method: ${req.method}`);
  res.status(404).send({
    error: 'unknow endpoint'
  });
}

module.exports = {
  notFoundMiddleware
}