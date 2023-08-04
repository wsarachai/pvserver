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
  toFixed,
  scaleToM_unit,
  getLocalTime
} = require('../../../contents');
const logger = require('../../../../middleware/winston/config');


const Years = asyncHandler(async (req, res, key, stationId) => {
  let cache = req.cache;
  let cacheKey = `YearsCache-${key}-${stationId}-${req.query.year}`;
  let yearBuff = cache.get(cacheKey);
  if (yearBuff == undefined) {
    try {
      let t = new Date(req.query.year);
      const month_in_year = 12;
      let allYearBuff = {};

      let station = await db.PVStation.findByPk(stationId, {
        include: { model: db.PVDevice }
      });

      for (let device of station.PVDevices) {
        /*
        * Find all month of current year recoreds
        */
        let monthly = await db.Hourly.findAll({
          attributes: [
            'month',
            [Sequelize.fn('sum', Sequelize.col('hourly_value_of_consumption')), 'DVOC'],
            [Sequelize.fn('sum', Sequelize.col('external_energy_supply')), 'EES'],
            [Sequelize.fn('sum', Sequelize.col('internal_power_supply')), 'IPS'],
            [Sequelize.fn('sum', Sequelize.col('hourly_yield')), 'DY'],
            [Sequelize.fn('sum', Sequelize.col('self_consumption')), 'SC'],
            [Sequelize.fn('sum', Sequelize.col('grid_feed_in')), 'GFI'],
          ],
          order: [
            ['month']
          ],
          where: {
            [Op.and]: [
              { device_id: device.id },
              { year: t.getFullYear() }
              //Sequelize.where(Sequelize.fn('month', Sequelize.col('device_time')), t.getMonth()+1),
            ]
          },
          group: ['month']
        });

        // if (monthly.length !== undefined && monthly.length <= 0) {
        //   let data15ms = await db.Data15M.findAll({
        //     where: {
        //       [Op.and]: [
        //         Sequelize.where(Sequelize.fn('MONTH', Sequelize.col("device_time")), t.getMonth() + 1),
        //         {
        //           device_id: device.id
        //         }
        //       ]
        //     }
        //   });

        //   if (data15ms.length > 0) {
        //     let monthly_value_of_consumption = 0.0;
        //     let external_energy_supply = 0.0;
        //     let internal_power_supply = 0.0;
        //     let monthly_yield = 0.0;
        //     let self_consumption = 0.0;
        //     let grid_feed_in = 0.0;
        //     for (let j = 0; j < data15ms.length; j++) {
        //       monthly_value_of_consumption = safeAdd(monthly_value_of_consumption, data15ms[j].daily_value_of_consumption);
        //       external_energy_supply = safeAdd(external_energy_supply, data15ms[j].external_energy_supply);
        //       internal_power_supply = safeAdd(internal_power_supply, data15ms[j].internal_power_supply);
        //       monthly_yield = safeAdd(monthly_yield, data15ms[j].daily_yield);
        //       self_consumption = safeAdd(self_consumption, data15ms[j].self_consumption);
        //       grid_feed_in = safeAdd(grid_feed_in, data15ms[j].grid_feed_in);
        //     }

        //     monthly_value_of_consumption /= data15ms.length;
        //     external_energy_supply /= data15ms.length;
        //     internal_power_supply /= data15ms.length;
        //     monthly_yield /= data15ms.length;
        //     self_consumption /= data15ms.length;
        //     grid_feed_in /= data15ms.length;

        //     monthly = [
        //       {
        //         dataValues: {
        //           month: t.getMonth() + 1,
        //           DVOC: monthly_value_of_consumption,
        //           EES: external_energy_supply,
        //           IPS: internal_power_supply,
        //           DY: monthly_yield,
        //           SC: self_consumption,
        //           GFI: grid_feed_in
        //         }
        //       }
        //     ];
        //   }
        // }

        allYearBuff[device.name] = {};
        allYearBuff[device.name].consumptions = [];
        allYearBuff[device.name].generations = [];
        let consumptions = allYearBuff[device.name].consumptions;
        let generations = allYearBuff[device.name].generations;

        for (i = 1; i <= month_in_year; i++) {
          consumptions.push({ 'name': i });
          generations.push({ 'name': i });
        }

        yearBuff = allYearBuff[device.name];

        if (monthly.length > 0) {
          let yearlyValueOfConsumption = 0;
          let externalEnergySupply = 0;
          let internalEnergySupply = 0;
          let annual_yield = 0;
          let selfConsumption = 0;
          let gridFeedIn = 0;

          for (let i = 0; i < month_in_year; i++) {
            for (let j = 0; j < monthly.length; j++) {
              if (monthly[j].dataValues.month == i + 1) {
                yearBuff.consumptions[i].EES = toFixed(Math.round(monthly[j].dataValues.EES));
                yearBuff.consumptions[i].IPS = toFixed(Math.round(monthly[j].dataValues.IPS));
                yearBuff.generations[i].SC = toFixed(Math.round(monthly[j].dataValues.SC));
                yearBuff.generations[i].GFI = toFixed(Math.round(monthly[j].dataValues.GFI));
                // Sum kWh each month
                yearlyValueOfConsumption = safeAdd(yearlyValueOfConsumption, monthly[j].dataValues.DVOC);
                externalEnergySupply = safeAdd(externalEnergySupply, monthly[j].dataValues.EES);
                internalEnergySupply = safeAdd(internalEnergySupply, monthly[j].dataValues.IPS);
                annual_yield = safeAdd(annual_yield, monthly[j].dataValues.DY);
                selfConsumption = safeAdd(selfConsumption, monthly[j].dataValues.SC);
                gridFeedIn = safeAdd(gridFeedIn, monthly[j].dataValues.GFI);
              }
            }

          }

          // Fill-in the current data
          yearBuff.stationId = stationId;
          yearBuff.yearlyValueOfConsumption = scaleToM_unit(yearlyValueOfConsumption);
          yearBuff.externalEnergySupply = scaleToM_unit(externalEnergySupply);
          yearBuff.internalEnergySupply = scaleToM_unit(internalEnergySupply);
          yearBuff.annual_yield = scaleToM_unit(annual_yield);
          yearBuff.selfConsumption = scaleToM_unit(selfConsumption);
          yearBuff.gridFeedIn = scaleToM_unit(gridFeedIn);

          yearBuff.maxValue = findMaxValue(yearBuff);
        }
      }

      if (key === 'Totals') {
        yearBuff = Object.assign({}, allYearBuff[station.PVDevices[0].name]);
        for (let i = 1; i < station.PVDevices.length; i++) {
          let _yearBuff = allYearBuff[station.PVDevices[i].name];

          for (let i = 0; i < month_in_year; i++) {
            yearBuff.consumptions[i].EES = safeAdd(yearBuff.consumptions[i].EES, _yearBuff.consumptions[i].EES);
            yearBuff.consumptions[i].IPS = safeAdd(yearBuff.consumptions[i].IPS, _yearBuff.consumptions[i].IPS);
            yearBuff.generations[i].SC = safeAdd(yearBuff.generations[i].SC, _yearBuff.generations[i].SC);
            yearBuff.generations[i].GFI = safeAdd(yearBuff.generations[i].GFI, _yearBuff.generations[i].GFI);
          }

          // Sum kWh each month
          yearBuff.yearlyValueOfConsumption = safeAdd(yearBuff.yearlyValueOfConsumption, _yearBuff.yearlyValueOfConsumption);
          yearBuff.externalEnergySupply = safeAdd(yearBuff.externalEnergySupply, _yearBuff.externalEnergySupply);
          yearBuff.internalEnergySupply = safeAdd(yearBuff.internalEnergySupply, _yearBuff.internalEnergySupply);
          yearBuff.annual_yield = safeAdd(yearBuff.annual_yield, _yearBuff.annual_yield);
          yearBuff.selfConsumption = safeAdd(yearBuff.selfConsumption, _yearBuff.selfConsumption);
          yearBuff.gridFeedIn = safeAdd(yearBuff.gridFeedIn, _yearBuff.gridFeedIn);
        }
        yearBuff.maxValue = findMaxValue(yearBuff);
        yearBuff.time = getLocalTime(new Date());
      } else {
        allYearBuff[key].time = getLocalTime(new Date());
        yearBuff = allYearBuff[key];
      }
      
      if (cache.set(cacheKey, yearBuff, 60*10 )) {
        logger.info(`[${cacheKey}] cache successfully.`)
      }

      res.json(yearBuff);
    } catch (err) {
      logger.error(err);
    }
  } else {
    yearBuff.time = getLocalTime(new Date());
    res.json(yearBuff);
  }
});


module.exports = Years;
