const winston = require('winston');
require('winston-daily-rotate-file');

// Get app version from package.json file
var appVersion = require('./package.json').version;

// Set up logger with timestamps and colors, and optional logging to disk file
const logTransports = [];

logTransports.push(
  new winston.transports.Console({
    name: 'console',
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    ),
  }),
);

const logger = winston.createLogger({
  transports: logTransports,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
});

// Functions to get/set current console logging level
const getLoggingLevel = () => {
  return logTransports.find(transport => {
    return transport.name == 'console';
  }).level;
};

const setLoggingLevel = newLevel => {
  logTransports.find(transport => {
    return transport.name == 'console';
  }).level = newLevel;
};

module.exports = {
  logger,
  appVersion,
  getLoggingLevel,
  setLoggingLevel,
};