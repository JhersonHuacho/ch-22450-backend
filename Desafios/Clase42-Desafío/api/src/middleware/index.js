const { loggerMiddleware } = require("./loggerMiddleware");
const { notFoundMiddleware } = require("./notFoundMiddleware");
const { handleErrorMiddleware } = require("./handleErrorMiddleware");

module.exports = {
  loggerMiddleware,
  notFoundMiddleware,
  handleErrorMiddleware
}