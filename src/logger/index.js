import log4js from 'log4js';
log4js.configure({
  appenders: {
    console: { type: 'console' },
    warningFile: { type: 'file', filename: 'warn.log' },
    errorsFile: { type: 'file', filename: 'error.log' },
  },
  categories: {
    default: {
      appenders: ['console'], level: 'trace'
    },
    info: { appenders: ['console'], level: 'info' },
    warning: { appenders: ['console', 'warningFile'], level: 'warn' },
    error: { appenders: ['console', 'errorsFile'], level: 'error' },

  }
});

const consoleLogger = log4js.getLogger('info');
const warnFileLogger = log4js.getLogger('warning');
const errorFileLogger = log4js.getLogger('error');

export  {
  consoleLogger,
  warnFileLogger,
  errorFileLogger
}