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
  let { timestamp, level: severity, message, meta } = options;
  let logTimestamp = timestamp();

  let seconds = Math.floor(logTimestamp / 1000);
  let milli = new Date(logTimestamp).getMilliseconds();
  let nanos = 0;

  let channel = 'not-defined';

  if (!message) {
    message = '';
  }

  let log = {
    message,
    severity,
    channel,
    timestamp: { seconds, milli, nanos },
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
