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
  scaleToM_unit
} = require('../../../contents');
const logger = require('../../../../middleware/winston/config');


const Total = asyncHandler(async (req, res, key, stationId) => {
  let cache = req.cache;
  let cacheKey = `TotalCache-${key}-${stationId}`;
  let totalBuff = cache.get(cacheKey);
  if (totalBuff == undefined) {
    try {
      let t = new Date();
      let allTotalBuff = {};
      let yearly;

      let station = await db.PVStation.findByPk(stationId, {
        include: { model: db.PVDevice }
      });

      for (let device of station.PVDevices) {
        /*
        * Find all month of current year recoreds
        */
        yearly = await db.Hourly.findAll({
          attributes: [
            'year',
            [Sequelize.fn('sum', Sequelize.col('hourly_value_of_consumption')), 'DVOC'],
            [Sequelize.fn('sum', Sequelize.col('external_energy_supply')), 'EES'],
            [Sequelize.fn('sum', Sequelize.col('internal_power_supply')), 'IPS'],
            [Sequelize.fn('sum', Sequelize.col('hourly_yield')), 'DY'],
            [Sequelize.fn('sum', Sequelize.col('self_consumption')), 'SC'],
            [Sequelize.fn('sum', Sequelize.col('grid_feed_in')), 'GFI'],
          ],
          order: [
            ['year']
          ],
          where: {
            [Op.and]: [
              { device_id: device.id }
            ]
          },
          group: ['year']
        });

        if (yearly.length !== undefined && yearly.length <= 0) {
          let data15ms = await db.Data15M.findAll({
            where: {
              [Op.and]: [
                Sequelize.where(Sequelize.fn('YEAR', Sequelize.col("device_time")), t.getFullYear()),
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

            yearly = [
              {
                dataValues: {
                  month: t.getMonth() + 1,
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

        if (yearly.length > 0) {
          totalBuff = {};
          totalBuff.consumptions = [];
          totalBuff.generations = [];
          let consumptions = totalBuff.consumptions;
          let generations = totalBuff.generations;

          for (i = 0; i < yearly.length; i++) {
            consumptions.push({ 'name': yearly[i].year });
            generations.push({ 'name': yearly[i].year });
          }

          totalValueOfConsumption = 0;
          externalEnergySupply = 0;
          internalEnergySupply = 0;
          total_yield = 0;
          selfConsumption = 0;
          gridFeedIn = 0;

          for (let i = 0; i < yearly.length; i++) {
            totalBuff.consumptions[i].EES = toFixed(Math.round(yearly[i].dataValues.EES));
            totalBuff.consumptions[i].IPS = toFixed(Math.round(yearly[i].dataValues.IPS));
            totalBuff.generations[i].SC = toFixed(Math.round(yearly[i].dataValues.SC));
            totalBuff.generations[i].GFI = toFixed(Math.round(yearly[i].dataValues.GFI));
            // Sum kWh each year
            totalValueOfConsumption = safeAdd(totalValueOfConsumption, yearly[i].dataValues.DVOC);
            externalEnergySupply = safeAdd(externalEnergySupply, yearly[i].dataValues.EES);
            internalEnergySupply = safeAdd(internalEnergySupply, yearly[i].dataValues.IPS);
            total_yield = safeAdd(total_yield, yearly[i].dataValues.DY);
            selfConsumption = safeAdd(selfConsumption, yearly[i].dataValues.SC);
            gridFeedIn = safeAdd(gridFeedIn, yearly[i].dataValues.GFI);
          }

          // Fill-in the current data
          totalBuff.stationId = stationId;
          totalBuff.totalValueOfConsumption = scaleToM_unit(totalValueOfConsumption);
          totalBuff.externalEnergySupply = scaleToM_unit(externalEnergySupply);
          totalBuff.internalEnergySupply = scaleToM_unit(internalEnergySupply);
          totalBuff.total_yield = scaleToM_unit(total_yield);
          totalBuff.selfConsumption = scaleToM_unit(selfConsumption);
          totalBuff.gridFeedIn = scaleToM_unit(gridFeedIn);

          totalBuff.maxValue = findMaxValue(totalBuff);
          allTotalBuff[device.name] = totalBuff;
        }
      }

      if (key === 'Totals') {
        totalBuff = {};
        totalBuff.consumptions = [];
        totalBuff.generations = [];
        let consumptions = totalBuff.consumptions;
        let generations = totalBuff.generations;

        for (i = 0; i < yearly.length; i++) {
          consumptions.push({ 'name': yearly[i].year });
          generations.push({ 'name': yearly[i].year });
        }

        for (let device of station.PVDevices) {
          let _totalBuff = allTotalBuff[device.name];
          for (let j = 0; j < yearly.length; j++) {
            let cons = totalBuff.consumptions[j];
            let gens = totalBuff.generations[j];
            let _cons = _totalBuff.consumptions[j];
            let _gens = _totalBuff.generations[j];
            cons['EES'] = safeAdd(cons['EES'], _cons.EES);
            cons['IPS'] = safeAdd(cons['IPS'], _cons.IPS);
            gens['SC'] = safeAdd(gens['SC'], _gens.SC);
            gens['GFI'] = safeAdd(gens['GFI'], _gens.GFI);
          }
          totalBuff.totalValueOfConsumption = safeAdd(totalBuff.totalValueOfConsumption, _totalBuff.totalValueOfConsumption);
          totalBuff.externalEnergySupply = safeAdd(totalBuff.externalEnergySupply, _totalBuff.externalEnergySupply);
          totalBuff.internalEnergySupply = safeAdd(totalBuff.internalEnergySupply, _totalBuff.internalEnergySupply);
          totalBuff.total_yield = safeAdd(totalBuff.total_yield, _totalBuff.total_yield);
          totalBuff.selfConsumption = safeAdd(totalBuff.selfConsumption, _totalBuff.selfConsumption);
          totalBuff.gridFeedIn = safeAdd(totalBuff.gridFeedIn, _totalBuff.gridFeedIn);
        }

        totalBuff.maxValue = findMaxValue(totalBuff);
      } else {
        totalBuff = allTotalBuff[key];
      }
      
      if (cache.set(cacheKey, totalBuff, 60*10 )) {
        logger.info(`[${cacheKey}] cache successfully.`)
      }

      res.json(totalBuff);
    } catch (err) {
      logger.error(err);
    }
  } else {
    res.json(totalBuff);
  }
});


module.exports = Total;
