const morgan = require('morgan');
const logger = require('../utils/logger');

logger.stream = {
  write: (message) => logger.warn(message.substring(0, message.lastIndexOf('\n'))),
  write: (message) => logger.error(message.substring(0, message.lastIndexOf('\n'))),
};

module.exports = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: logger.stream,
});
