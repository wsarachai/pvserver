/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const CronJob = require('cron').CronJob;
const _do_10SecondFeeding_mockupTask = require('./task_10SecondFeeding_Mockup');
const _do_10SecondFeedingTask = require('./task_10SecondFeeding');
const _do_15MinuteFeedingTask = require('./task_15MinutesFeeding');
const _do_HourlyFeedingTask = require('./task_HourlyFeeding');
const _do_WeatherPoolingTask = require('./task_weatherPooling');

const TIME_ZONE = 'Asia/Bangkok';

/******************************************************************************
 * The FeedingJob class
 *****************************************************************************/
class FeedingJob {
  static get10MinJob() {
    let _10SecondFeedingTask;
    if (process.env.MOCK_UP_DATA==="true") {
      _10SecondFeedingTask = _do_10SecondFeeding_mockupTask;
    } else {
      _10SecondFeedingTask = _do_10SecondFeedingTask;
    }
    return new CronJob({
      cronTime: '0/10 * * * * *',
      onTick: _10SecondFeedingTask(),
      timeZone: TIME_ZONE
    }
  );
  }

  static get15MinuteJob() {
    return new CronJob({
        cronTime: '*/15 * * * *',
        onTick: _do_15MinuteFeedingTask(),
        timeZone: TIME_ZONE
      }
    );
  }

  static getHourlyJob() {
    return new CronJob({
        cronTime: '0 * * * *',
        onTick: _do_HourlyFeedingTask(),
        timeZone: TIME_ZONE
      }
      );
  }

  static getWeatherJob(cache) {
    return new CronJob({
        cronTime: '*/10 * * * *',
        onTick: _do_WeatherPoolingTask(cache),
        timeZone: TIME_ZONE,
        runOnInit: true
      }
      );
  }
}

module.exports = FeedingJob;
