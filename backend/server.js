"use strict";
const dotenv = require("dotenv");
dotenv.config();

const app = require("./app/app");
const logger = require("./utils/logger");

logger.info(`Root directory: ${process.env.PVSYSTEM_ROOT}`);

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

let port = normalizePort(process.env.PORT || "3000");

app.start(port);
