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

function formatter(options) {
  let { meta, level: level_name, message } = options;

  if (!message) {
    message = '';
  }

  if (!meta) {
    meta = {}
  }

  // https://github.com/Seldaek/monolog/blob/master/doc/message-structure.md
  let record = {
    message,
    level: winston.levels[level_name],
    level_name
  }

  Object.assign(record, meta);

  return JSON.stringify(record);
};
