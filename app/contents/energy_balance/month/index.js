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
  safeAdd,
  get_date_label,
  getLocalTime
} = require('../../../contents');
const logger = require('../../../../middleware/winston/config');


const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};


const Month = asyncHandler(async (req, res, key, stationId) => {
  let cache = req.cache;
  let cacheKey = `MonthCache-${key}-${stationId}-${req.query.month}`;
  let monthBuff = cache.get(cacheKey);
  if (monthBuff == undefined) {
    try {
      let t = new Date(req.query.month);
      const days_in_month = daysInMonth(t.getMonth() + 1, t.getFullYear());
      let allMonthBuff = {};

      let station = await db.PVStation.findByPk(stationId, {
        include: { model: db.PVDevice }
      });

      /*
      * Find all day in month recoreds
      */
      for (let device of station.PVDevices) {
        let daily = await db.Hourly.findAll({
          attributes: [
            'day',
            [Sequelize.fn('sum', Sequelize.col('hourly_value_of_consumption')), 'DVOC'],
            [Sequelize.fn('sum', Sequelize.col('external_energy_supply')), 'EES'],
            [Sequelize.fn('sum', Sequelize.col('internal_power_supply')), 'IPS'],
            [Sequelize.fn('sum', Sequelize.col('hourly_yield')), 'DY'],
            [Sequelize.fn('sum', Sequelize.col('self_consumption')), 'SC'],
            [Sequelize.fn('sum', Sequelize.col('grid_feed_in')), 'GFI'],
          ],
          order: [
            ['day']
          ],
          where: {
            [Op.and]: [
              { device_id: device.id },
              { month: t.getMonth() + 1 },
              { year: t.getFullYear() }
            ]
          },
          group: ['day']
        });

        if (daily.length !== undefined && daily.length <= 0) {
          let data15ms = await db.Data15M.findAll({
            where: {
              [Op.and]: [
                //Sequelize.where(Sequelize.fn('month', Sequelize.col('device_time')), t.getMonth()+1),
                Sequelize.where(Sequelize.fn('DATE', Sequelize.col("device_time")), get_date_label(t)),
                {
                  device_id: device.id
                }
              ]
            }
          });

          if (data15ms.length > 0) {
            let monthly_value_of_consumption = 0.0;
            let external_energy_supply = 0.0;
            let internal_power_supply = 0.0;
            let monthly_yield = 0.0;
            let self_consumption = 0.0;
            let grid_feed_in = 0.0;
            let s = "";

            for (let j = 0; j < data15ms.length; j++) {
              monthly_value_of_consumption = safeAdd(monthly_value_of_consumption, data15ms[j].daily_value_of_consumption);
              external_energy_supply = safeAdd(external_energy_supply, data15ms[j].external_energy_supply);
              internal_power_supply = safeAdd(internal_power_supply, data15ms[j].internal_power_supply);
              monthly_yield = safeAdd(monthly_yield, data15ms[j].daily_yield);
              self_consumption = safeAdd(self_consumption, data15ms[j].self_consumption);
              grid_feed_in = safeAdd(grid_feed_in, data15ms[j].grid_feed_in);
            }

            monthly_value_of_consumption /= data15ms.length;
            external_energy_supply /= data15ms.length;
            internal_power_supply /= data15ms.length;
            monthly_yield /= data15ms.length;
            self_consumption /= data15ms.length;
            grid_feed_in /= data15ms.length;

            daily = [
              {
                dataValues: {
                  day: t.getDate(),
                  DVOC: monthly_value_of_consumption,
                  EES: external_energy_supply,
                  IPS: internal_power_supply,
                  DY: monthly_yield,
                  SC: self_consumption,
                  GFI: grid_feed_in
                }
              }
            ];
          }
        }

        allMonthBuff[device.name] = {};
        allMonthBuff[device.name].consumptions = [];
        allMonthBuff[device.name].generations = [];
        let consumptions = allMonthBuff[device.name].consumptions;
        let generations = allMonthBuff[device.name].generations;

        for (i = 1; i <= days_in_month; i++) {
          consumptions.push({ 'name': i });
          generations.push({ 'name': i });
        }

        monthBuff = allMonthBuff[device.name];

        if (daily.length > 0) {
          let monthly_value_of_consumption = 0.0;
          let external_energy_supply = 0.0;
          let internal_power_supply = 0.0;
          let monthly_yield = 0.0;
          let self_consumption = 0.0;
          let grid_feed_in = 0.0;

          for (let i = 0; i < days_in_month; i++) {
            let conm = monthBuff.consumptions[i];
            let regn = monthBuff.generations[i];
            for (let j = 0; j < daily.length; j++) {
              let day = daily[j].dataValues;
              if (day.day == conm.name) {
                conm.EES = day.EES;
                conm.IPS = day.IPS;
                regn.SC = day.SC;
                regn.GFI = day.GFI;

                // Sum kWh each day
                monthly_value_of_consumption = safeAdd(monthly_value_of_consumption, day.DVOC);
                external_energy_supply = safeAdd(external_energy_supply, day.EES);
                internal_power_supply = safeAdd(internal_power_supply, day.IPS);
                monthly_yield = safeAdd(monthly_yield, day.DY);
                self_consumption = safeAdd(self_consumption, day.SC);
                grid_feed_in = safeAdd(grid_feed_in, day.GFI);
              }
            }
          }

          // Fill-in the current data
          monthBuff.stationId = stationId;
          monthBuff.monthly_value_of_consumption = Math.round(monthly_value_of_consumption);
          monthBuff.external_energy_supply = Math.round(external_energy_supply);
          monthBuff.internal_power_supply = Math.round(internal_power_supply);
          monthBuff.monthly_yield = Math.round(monthly_yield);
          monthBuff.self_consumption = Math.round(self_consumption);
          monthBuff.grid_feed_in = Math.round(grid_feed_in);

          monthBuff.maxValue = findMaxValue(monthBuff);
        }
      }

      if (key === 'Totals') {
        monthBuff = {};
        monthBuff.consumptions = [];
        monthBuff.generations = [];
        let consumptions = monthBuff.consumptions;
        let generations = monthBuff.generations;
        for (i = 1; i <= days_in_month; i++) {
          consumptions.push({ 'name': i });
          generations.push({ 'name': i });
        }

        for (let i = 0; i < station.PVDevices.length; i++) {
          let _monthBuff = allMonthBuff[station.PVDevices[i].name];
          for (let i = 0; i < days_in_month; i++) {
            let conm = monthBuff.consumptions[i];
            let regn = monthBuff.generations[i];
            let _conm = _monthBuff.consumptions[i];
            let _regn = _monthBuff.generations[i];
            conm['EES'] = safeAdd(conm.EES, _conm.EES);
            conm['IPS'] = safeAdd(conm.IPS, _conm.IPS);
            regn['SC'] = safeAdd(regn.SC, _regn.SC);
            regn['GFI'] = safeAdd(regn.GFI, _regn.GFI);
          }
          monthBuff.monthly_value_of_consumption = safeAdd(monthBuff.monthly_value_of_consumption, _monthBuff.monthly_value_of_consumption);
          monthBuff.external_energy_supply = safeAdd(monthBuff.external_energy_supply, _monthBuff.external_energy_supply);
          monthBuff.internal_power_supply = safeAdd(monthBuff.internal_power_supply, _monthBuff.internal_power_supply);
          monthBuff.monthly_yield = safeAdd(monthBuff.monthly_yield, _monthBuff.monthly_yield);
          monthBuff.self_consumption = safeAdd(monthBuff.self_consumption, _monthBuff.self_consumption);
          monthBuff.grid_feed_in = safeAdd(monthBuff.grid_feed_in, _monthBuff.grid_feed_in);
        }
        monthBuff.maxValue = findMaxValue(monthBuff);
        monthBuff.time = getLocalTime(new Date());
      } else {
        allMonthBuff[key].time = getLocalTime(new Date());
        monthBuff = allMonthBuff[key];
      }

      if (cache.set(cacheKey, monthBuff, 60*10 )) {
        logger.info(`[${cacheKey}] cache successfully.`)
      }

      res.json(monthBuff);
    } catch (err) {
      logger.error(err);
    }
  } else {
    res.json(monthBuff);
  }
});


module.exports = Month;
