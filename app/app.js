/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const pvapiRoute = require('../routes/pvroute');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const FeedingJob = require('../api/feedingjob');
const NodeCache = require("node-cache");
const cacheMiddleware = require('../middleware/mem-cache/config');
const logger = require('../middleware/winston/config');

const env = process.env.NODE_ENV || 'development';

let myCache = new NodeCache({ checkperiod: 60 });

let app = express();
app.use(logger.logWrapper());
app.use(logger.morganWrapper());
app.use(cacheMiddleware(myCache));

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

logger.info("Config environment.");
logger.info(`Using env: ${env}`);

function main() {
  let port = normalizePort(process.env.PORT || '3000');

  var options = {
    host: 'localhost',
    port: 3306,
    user: {"ENV": "DB_USER"},
    password: {"ENV": "DB_PASSWORD"},
    database: {"ENV": "DB_DATABASENAME"}
  };

  for (let key in options) {
    if (options[key].ENV != undefined) {
      options[key] = process.env[options[key].ENV];
    }
  }
  let sessionStore = new MySQLStore(options);

  let sess = {
    key: 'session_cookie_name',
    store: sessionStore,
    secret: '__pvsystem__',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 5 * 60 * 1000} // 5 minutes
  }

  // if (process.env.NODE_ENV === 'production') {
  //   app.set('trust proxy', 1); // trust first proxy
  //   sess.cookie.secure = true; // serve secure cookies
  // }

  logger.info(`Root directory: ${process.env.PVSYSTEM_ROOT}`);

  app.use(session(sess));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use('/', express.static(process.env.PVSYSTEM_ROOT));
  app.use('/api/pv', pvapiRoute);
  app.use('*', express.static(process.env.PVSYSTEM_ROOT));

  logger.info(`Running on: ${env} environment.`)
  app.listen(port, () => logger.info(`The app listening on port ${port}!`));

  FeedingJob.get10MinJob().start();
  FeedingJob.get15MinuteJob().start();
  FeedingJob.getHourlyJob().start();
  FeedingJob.getWeatherJob(myCache).start();
}

main();
