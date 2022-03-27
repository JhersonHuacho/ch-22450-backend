// Logger
const log4js = require('log4js');

log4js.configure({
  appenders: {
    loggerConsole: { type: 'console' },

    archivoWarn: { type: 'file', filename: 'warn.log' },
    archivoError: { type: 'file', filename: 'error.log' },
    loggerArchivoWarn: { type: 'logLevelFilter', appender: 'archivoWarn', level: 'warn' },
    loggerArchivoError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error' }
  },
  categories: {
    default: { appenders: ['loggerConsole'], level: 'info' },
    loggerFile: { appenders: ['loggerArchivoWarn', 'loggerArchivoError'], level: 'all' }
  }
});

