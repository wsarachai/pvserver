/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const db = require('../../../models');
const { Op } = require('sequelize');
const {
  safeAdd,
  format_datetime
} = require('../../../app/contents');
const logger = require('../../../middleware/winston/config');

/******************************************************************************
 * This function is run every hourly.
 * It read the MODBUS register from data collector device.
 *****************************************************************************/
const _do_HourlyFeedingTask = () => {
  return async () => {
    let transaction;
    try {
      // get transaction
      transaction = await db.sequelize.transaction();

      // Get current time.
      var t = new Date();
      let stations = await db.PVStation.findAll();
      for (let s of stations) {
        let station = await db.PVStation.findByPk(s.id, {
          include: { model: db.PVDevice }
        });
    
        for (let device of station.PVDevices) {
          let data15s = await db.Data15M.findAll({
            where: {
              [Op.and]: [
                { flag: false },
                { device_id: device.id }
              ]
            }
          });
    
          let hCumulator = {
            device_id: device.id,
            device_time: format_datetime(t),
            hourly_value_of_consumption: 0.0,
            external_energy_supply: 0.0,
            internal_power_supply: 0.0,
            hourly_yield: 0.0,
            self_consumption: 0.0,
            grid_feed_in: 0.0,
            day: t.getDate(),
            month: t.getMonth() + 1,
            year: t.getFullYear()
          };
    
          for (item of data15s) {
            hCumulator.hourly_value_of_consumption = safeAdd(hCumulator.hourly_value_of_consumption, item.daily_value_of_consumption);
            hCumulator.external_energy_supply = safeAdd(hCumulator.external_energy_supply, item.external_energy_supply);
            hCumulator.internal_power_supply = safeAdd(hCumulator.internal_power_supply, item.internal_power_supply);
            hCumulator.hourly_yield = safeAdd(hCumulator.hourly_yield, item.daily_yield);
            hCumulator.self_consumption = safeAdd(hCumulator.self_consumption, item.self_consumption);
            hCumulator.grid_feed_in = safeAdd(hCumulator.grid_feed_in, item.grid_feed_in);
          }
    
          data15s_length = Math.max(1, data15s.length);
          hCumulator.hourly_value_of_consumption /= data15s_length;
          hCumulator.external_energy_supply /= data15s_length;
          hCumulator.internal_power_supply /= data15s_length;
          hCumulator.hourly_yield /= data15s_length;
          hCumulator.self_consumption /= data15s_length;
          hCumulator.grid_feed_in /= data15s_length;
    
          await db.Hourly.create(hCumulator);
          for (item of data15s) {
            await db.Data15M.update(
              { flag: true },
              { where: { id: item.id } }
            );
          }
        }
      }
      // commit
      await transaction.commit();
      logger.info("Hourly update is success.");
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      logger.error(err);
      if (transaction) await transaction.rollback();
    }
  }
}

module.exports = _do_HourlyFeedingTask;
