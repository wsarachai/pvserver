/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 *
 * This file is part of PV-System Monitoring.
 *
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const express = require("express");
const NodeCache = require("node-cache");
const bodyParser = require("body-parser");
const pvapiRoute = require("../routes/pvroute");
const cacheMiddleware = require("../middleware/mem-cache/config");
const logger = require("../utils/logger");
const session = require("../middleware/sesion");
const FeedingJob = require("../api/feedingjob");

class App {
  constructor() {
    this.app = express();

    const myCache = new NodeCache({ checkperiod: 60 });

    this.app.use(logger.logWrapper());
    this.app.use(logger.morganWrapper());
    this.app.use(cacheMiddleware(myCache));
    this.app.use(session);

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use("/", express.static(process.env.PVSYSTEM_ROOT));
    this.app.use("/api/pv", pvapiRoute);
    this.app.use("*", express.static(process.env.PVSYSTEM_ROOT));

    this.env = process.env.NODE_ENV || "development";
    logger.info("Config environment.");
    logger.info(`Using env: ${this.env}`);
  }

  startFeeding() {
    //   FeedingJob.get10MinJob().start();
    //   FeedingJob.get15MinuteJob().start();
    //   FeedingJob.getHourlyJob().start();
    //   FeedingJob.getWeatherJob(myCache).start();
  }

  start(port) {
    this.app.listen(port, () => {
      logger.info(`The app listening on port ${port}!`);
      this.startFeeding();
    });
  }
}

module.exports = new App();
