/*
 * Logging level:
 *  error: 0
 *  warn: 1
 *  info: 2
 *  http: 3
 *  verbose: 4
 *  degug: 5
 *  silly: 6
 */
const morgan = require('morgan');
//const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


class PVLogger {
  
  constructor() {
    this.PVLoggerFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    this.options = {
      file: {
        level: 'info',
        //filename: `${appRoot}/logs/app.log`,
        filename: process.env.LOG_FILE,
        handleExceptions: true,
        format: format.combine(
          format.timestamp(),
          this.PVLoggerFormat /*,format.json()*/)
      },
      console: {
        level: process.env.LOG_LEVEL || 'info',
        handleExceptions: true,
        format: format.combine(
          format.timestamp(),
          this.PVLoggerFormat,
          format.colorize(), /*format.prettyPrint()*/)
      },
    };

    if (process.env.logging === 'off') {
      this.logger = createLogger({
        transports: [
          new DailyRotateFile(this.options.file),
        ],
        exitOnError: false, // do not exit on handled exceptions
      });
    } else {
      this.logger = createLogger({
        transports: [
          new DailyRotateFile(this.options.file),
          new transports.Console(this.options.console),
        ],
        exitOnError: false, // do not exit on handled exceptions
      });
    }
  }

  logWrapper() {
    let _logger = this;
    return (req, res, next) => {
      req.logger = _logger;
      next();
    };
  }

  morganWrapper() {
    let _logger = this.logger;
    _logger.stream = {
      write(message) {
        _logger.log("debug", message);
      },
    };
    let options = {
      stream: _logger.stream
    };
    return morgan('combined', options);
  }

  error(message) {
    this.logger.error(message);
  }

  warn(message) {
    this.log("warn", message);
  }
  
  info(message) {
    this.logger.info(message);
  }

  http(message) {
    this.logger.log("http", message);
  }

  verbose(message) {
    this.logger.log("verbose", message);
  }
  
  degug(message) {
    this.logger.log("degug", message);
  }
  
  silly(message) {
    this.logger.log("silly", message);
  }
}

let pvLogger = new PVLogger();

module.exports = pvLogger;