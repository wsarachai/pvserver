/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const asyncHandler = require('express-async-handler');
const db = require('../../../models');
const { Sequelize, Op } = require('sequelize');
const pvapi = require('../../../api/pvapi');
const {
  safeAdd
} = require('../index')
const logger = require('../../../middleware/winston/config');


const getDevices = asyncHandler(async (stationId) => {
  let devices = {};
  let station = await db.PVStation.findByPk(stationId, {
    include: [
      {
        model: db.PVDevice,
      }
    ]
  });

  station.PVDevices.forEach(device => {
    devices[device.name] = device;
  });

  return devices;
});

/*
 * Get current power status from DB instead from device
 * 
 */
const getCurrentPVPowerInterface = asyncHandler(async (stationId) => {
  let currents = {};

  try {
    let station = await db.PVStation.findByPk(stationId, {
      include: [
        {
          model: db.PVDevice,
          include: {
            model: db.Current,
            order: [
              ['createdAt', 'DESC']
            ],
            limit: 1
          }
        }
      ]
    });

    for (let device of station.PVDevices) {
      if (device.Currents.length > 0) {
        currents[device.name] = device.Currents[0];
      }
    }
  } catch (err) {
    logger.error(err)
  } finally {
    return currents;
  }
});


const getDailyYieldInterface = asyncHandler(async (devices) => {
  let powers = {};
  try {

    let hourlies = [];
    let keys = Object.keys(devices);
    for (let key of keys) {
      let device = devices[key];
      powers[key] = 0;
      hourlies[key] = await db.Hourly.findAll({
        where: {
          [Op.and]: [
            { device_id: device.id },
            Sequelize.where(Sequelize.fn('DAY', Sequelize.col("device_time")), new Date().getDate())
          ]
        }
      });
    }

    for (let key of keys) {
      let hs = hourlies[key];
      hs.forEach(h => {
        powers[key] = safeAdd(powers[key], h.hourly_yield);
      });
    }
  } catch (err) {
    logger.error(err)
  } finally {
    return powers;
  }
});


const getTotal = asyncHandler(async (device) => {
  let total = await db.Hourly.findAll({
    attributes: [
      [Sequelize.fn('sum', Sequelize.col('hourly_value_of_consumption')), 'DVOC'],
      [Sequelize.fn('sum', Sequelize.col('external_energy_supply')), 'EES'],
      [Sequelize.fn('sum', Sequelize.col('internal_power_supply')), 'IPS'],
      [Sequelize.fn('sum', Sequelize.col('hourly_yield')), 'DY'],
      [Sequelize.fn('sum', Sequelize.col('self_consumption')), 'SC'],
      [Sequelize.fn('sum', Sequelize.col('grid_feed_in')), 'GFI'],
    ],
    where: {
      [Op.and]: [
        { device_id: device.id }
      ]
    }
  });
  return total[0].dataValues;
});


const getTotalPowerInterface = asyncHandler(async (stationId, currents) => {
  let totalPowers = {};
  try {
    let station = await db.PVStation.findByPk(stationId, {
      include: { model: db.PVDevice }
    });

    for (let device of station.PVDevices) {
      let total = await getTotal(device);
      totalPower = total.DY;

      if (!totalPower) {
        totalPower = pvapi.total_energy_fed(currents)
      }
      totalPowers[device.name] = totalPower;
    }
  } catch (err) {
    logger.error(err)
  } finally {
    return totalPowers;
  }
});


const getMaximumSystemPower = (currents) => {
  return pvapi.maxinum_system_power(currents);
};

module.exports = {
  getDevices,
  getCurrentPVPowerInterface,
  getDailyYieldInterface,
  getTotalPowerInterface,
  getMaximumSystemPower
};
