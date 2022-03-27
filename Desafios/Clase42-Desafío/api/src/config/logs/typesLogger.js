const log4js = require('log4js');

const loggerConsole = log4js.getLogger();
const loggerFile = log4js.getLogger('loggerFile');

module.exports = {
  loggerConsole,
  loggerFile
}