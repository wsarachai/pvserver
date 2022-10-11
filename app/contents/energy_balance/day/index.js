/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const asyncHandler = require('express-async-handler');
const db = require('../../../../models');
const { findMaxValue } = require('../../index');
const { Sequelize, Op } = require('sequelize');
const {
  get_time_label,
  safeAdd,
  getLocalTime
} = require('../../index')
const logger = require('../../../../middleware/winston/config');

const Days = asyncHandler(async (req, res, key, stationId) => {
  let cache = req.cache;
  let cacheKey = `DaysCache-${key}-${stationId}-${req.query.day}`;
  let buffDay = cache.get(cacheKey);
  if (buffDay == undefined) {
    let t = new Date(req.query.day);
    t.setHours(0);
    t.setMinutes(0);
    t.setSeconds(0);
    t.setMilliseconds(0);

    const t15min = 1000 * 60 * 15;
    const total_day_len = (24 * 4) + 1;
    
    buffDay = {};

    try {
      let station = await db.PVStation.findByPk(stationId, {
        include: { model: db.PVDevice }
      });

      /*
      * Find currently day recored
      */
      let queryTime = t.getDate();
      let allData15ms = {};
      for (let device of station.PVDevices) {
        allData15ms[device.name] = await db.Data15M.findAll({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('DAY', Sequelize.col("device_time")), queryTime),
              {
                device_id: device.id
              }
            ]
          }
        });
      }

      let allBuffDay = {};
      let allResObj = {};

      // Fill-in 15 min graph
      for (let device of station.PVDevices) {
        let st = new Date(t);

        allBuffDay[device.name] = {};
        allBuffDay[device.name].consumptions = [];
        allBuffDay[device.name].generations = [];
        let consumptions = allBuffDay[device.name].consumptions;
        let generations = allBuffDay[device.name].generations;

        for (i = 0; i < total_day_len; i++) {
          let times = get_time_label(st);
          consumptions.push({ 'name': times, time: st.getTime() });
          generations.push({ 'name': times, time: st.getTime() });
          st = new Date(st.getTime() + t15min);
        }

        let _buffDay = allBuffDay[device.name];
        let data15ms = allData15ms[device.name];

        for (let i = 0; i < total_day_len; i++) {
          let st_tick = _buffDay.consumptions[i].time;
          let en_tick = _buffDay.consumptions[i].time + t15min;
          for (let j = 0; j < data15ms.length; j++) {
            let device_time_tick = data15ms[j].device_time.getTime();
            if (device_time_tick >= st_tick
              && device_time_tick < en_tick) {
              _buffDay.consumptions[i].EES = Math.round(data15ms[j].external_energy_supply);
              _buffDay.consumptions[i].IPS = Math.round(data15ms[j].internal_power_supply);
              _buffDay.generations[i].SC = Math.round(data15ms[j].self_consumption);
              _buffDay.generations[i].GFI = Math.round(data15ms[j].grid_feed_in);
            }
          }
        }

        // Query hourly by day
        let hourly = await db.Hourly.findAll({
          order: [
            ['createdAt']
          ],
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('DAY', Sequelize.col("device_time")), t.getDate()),
              { device_id: device.id }
            ]
          }
        });

        // Add sum hourly
        _buffDay.hourlyValueOfConsumption = 0.0;
        _buffDay.externalEnergySupply = 0.0;
        _buffDay.internalEnergySupply = 0.0;
        _buffDay.hourly_yield = 0.0;
        _buffDay.selfConsumption = 0.0;
        _buffDay.gridFeedIn = 0.0;

        for (let hour of hourly) {
          _buffDay.hourlyValueOfConsumption = safeAdd(_buffDay.hourlyValueOfConsumption, hour.hourly_value_of_consumption);
          _buffDay.externalEnergySupply = safeAdd(_buffDay.externalEnergySupply, hour.external_energy_supply);
          _buffDay.internalEnergySupply = safeAdd(_buffDay.internalEnergySupply, hour.internal_power_supply);
          _buffDay.hourly_yield = safeAdd(_buffDay.hourly_yield, hour.hourly_yield);
          _buffDay.selfConsumption = safeAdd(_buffDay.selfConsumption, hour.self_consumption);
          _buffDay.gridFeedIn = safeAdd(_buffDay.gridFeedIn, hour.grid_feed_in);
        }

        // Clean some attributes
        let resObj = Object.assign({}, _buffDay);
        resObj.consumptions = [..._buffDay.consumptions];
        resObj.generations = [..._buffDay.generations];
        for (let i = 0; i < resObj.consumptions.length; i++) {
          resObj.consumptions[i] = Object.assign({}, resObj.consumptions[i]);
          delete resObj.consumptions[i].time;
        }
        for (let i = 0; i < resObj.generations.length; i++) {
          resObj.generations[i] = Object.assign({}, resObj.generations[i]);
          delete resObj.generations[i].time;
        }

        allResObj[device.name] = resObj;
      }

      if (key === 'Totals') {
        buffDay.consumptions = [];
        buffDay.generations = [];
        for (let device of station.PVDevices) {
          let _buffDay = allResObj[device.name];
          buffDay.hourlyValueOfConsumption = safeAdd(buffDay.hourlyValueOfConsumption, _buffDay.hourlyValueOfConsumption);
          buffDay.externalEnergySupply = safeAdd(buffDay.externalEnergySupply, _buffDay.externalEnergySupply);
          buffDay.internalEnergySupply = safeAdd(buffDay.internalEnergySupply, _buffDay.internalEnergySupply);
          buffDay.hourly_yield = safeAdd(buffDay.hourly_yield, _buffDay.hourly_yield);
          buffDay.selfConsumption = safeAdd(buffDay.selfConsumption, _buffDay.selfConsumption);
          buffDay.gridFeedIn = safeAdd(buffDay.gridFeedIn, _buffDay.gridFeedIn);

          for (let i=0; i<_buffDay.consumptions.length; i++) {
            let c = _buffDay.consumptions[i];
            let g = _buffDay.generations[i];
            if (!buffDay.consumptions[i]) {
              buffDay.consumptions[i] = {};
            }
            if (!buffDay.generations[i]) {
              buffDay.generations[i] = {};
            }
            buffDay.consumptions[i].name = c.name;
            buffDay.consumptions[i].EES = safeAdd(buffDay.consumptions[i].EES, c.EES);
            buffDay.consumptions[i].IPS = safeAdd(buffDay.consumptions[i].IPS, c.IPS);
            buffDay.generations[i].name = g.name;
            buffDay.generations[i].SC = safeAdd(buffDay.generations[i].SC, g.SC);
            buffDay.generations[i].GFI = safeAdd(buffDay.generations[i].GFI, g.GFI);
          }
        }
      } else {
        allResObj[key].maxValue = findMaxValue(allResObj[key]);
        buffDay = allResObj[key];
      }
      buffDay.stationId = stationId;
    } catch (err) {
      logger.error(err);
    }
    
    if (cache.set(cacheKey, buffDay, 60*10 )) {
      logger.info(`[${cacheKey}] cache successfully.`)
    }

    buffDay.time = getLocalTime(new Date());
    res.json(buffDay);
  } else {
    buffDay.time = getLocalTime(new Date());
    res.json(buffDay);
  }
});


module.exports = Days;
