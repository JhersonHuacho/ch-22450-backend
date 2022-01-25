const log4js = require('log4js');

log4js.configure({
  appenders: {
    miLoggerConsole: {
      type: 'console',
    },
    miLoggerFile: {
      type: 'file',
      filename: 'info.log'
    },
    miLoggerFile2: {
      type: 'file',
      filename: 'info2.log'
    }
  },
  categories: {
    default: { appenders: ['miLoggerConsole'], level: 'trace' },
    consola: { appenders: ['miLoggerConsole'], level: 'debug' },
    archivo: { appenders: ['miLoggerFile'], level: 'warn' },
    archivo2: { appenders: ['miLoggerFile2'], level: 'info' },
    todos: { appenders: ['miLoggerConsole', 'miLoggerFile2'], level: 'error' }
  }
});

/**
 * trace
 * debug
 * info
 * warn
 * error
 * fatal
 */
// const logger = log4js.getLogger('archivo');

// logger.trace('logger trace');
// logger.debug('logger debug');
// logger.info('logger info');
// logger.warn('logger warn');
// logger.error('logger error');
// logger.fatal('logger fatal');

/*******************************************************************/
/************************ WISTON ***********************************/
// const { createLogger, transports } = require('winston');
// const logger = createLogger({
//   transports: [
//     new transports.Console({
//       level: "verbose"
//     }),
//     new transports.File({
//       filename: 'info.log',
//       level: 'error'
//     })
//   ]
// });

// logger.log('silly', '127.0.0.1 - log silly');
// logger.log('debug', '127.0.0.1 - log silly');
// logger.log('verbose', '127.0.0.1 - log silly');
// logger.log('info', '127.0.0.1 - log silly');
// logger.log('warn', '127.0.0.1 - log silly');
// logger.log('error', '127.0.0.1 - log silly');

// logger.silly('127.0.0.1 - log silly');
// logger.debug('127.0.0.1 - log silly');
// logger.verbose('127.0.0.1 - log silly');
// logger.info('127.0.0.1 - log silly');
// logger.warn('127.0.0.1 - log silly');
// logger.error('127.0.0.1 - log silly');

/*******************************************************************/
/************************ PINO *************************************/

const logger = require('pino')();
logger.info('Hello world');
logger.error('Hello world');
logger.info('La respuesta es %d', 42);
logger.info({ a: 42 }, 'Hello World');
logger.info({ a: 42, b: 2 }, 'Hello World');

const child = logger.child({});
child.info('Hola mundo con child');