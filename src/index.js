const winston = require('winston');


module.exports = createLogger();


function createLogger() {
  const consoleTransport = new (winston.transports.Console)({
    timestamp,
    formatter
  });

  const logger = new (winston.Logger)({
    transports: [ consoleTransport ]
  });

  return logger;
};

function timestamp() {
  return Date.now();
};

function formatter(options) {
  let { timestamp, level, message, meta } = options;

  if (!message) {
    message = '';
  }

  let log = {
    message,
    level,
    timestamp: new Date()
  };

  if (isPojo(meta)) {
    Object.assign(log, meta);
  }

  log = JSON.stringify(log);
  log = sanitizeLog(log);

  return log;
};

function isPojo(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};

function sanitizeLog(log) {
  // TODO: sanitize policy
  return log;
};
