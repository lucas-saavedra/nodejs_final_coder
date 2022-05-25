import {
    consoleLogger,
    warnFileLogger,
    errorFileLogger
} from '../logger/index.js'

const consoleLogs = (req, res, next) => {
    consoleLogger.info(`[${req.method}]=> ${req.originalUrl} `);
    next()
};
const warningLogs = (req, res, next) => {
    warnFileLogger.warn(`[${req.method}]=> ${req.originalUrl} `);
    next();
}
const errorLogs = (err, req, res, next) => {
    if (err) {
        errorFileLogger.error(err);
    }
    next();
}
export { consoleLogs, errorLogs, warningLogs };

