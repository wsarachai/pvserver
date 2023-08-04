"use strict";
const logger = require("../middleware/winston/config");

class Logger {
  constructor() {
    this.logger = logger;
  }
}

module.exports = new Logger().logger;
