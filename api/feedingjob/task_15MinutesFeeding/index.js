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
 * This function is run every 15 minutes.
 * It read the current data back 15 records.
 *****************************************************************************/
const _do_15MinuteFeedingTask = () => {
  
  const init_value_current = () => {
    return {
      current_value_of_consumption: 0.0,
      external_energy_supply: 0.0,
      internal_power_supply: 0.0,
      current_power: 0.0,
      self_consumption: 0.0,
      grid_feed_in: 0.0
    };
  }

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
          /*
          * Query all current uncalculated data
          */
          let currents = await db.Current.findAll({
            order: [
              ['createdAt']
            ],
            where: {
              [Op.and]: [
                { flag: false },
                { device_id: device.id }
              ]
            }
          });
      
          /* 
          * Collect all energy from all channels
          */
          let sum_current = init_value_current();
          for (let q of currents) {
            sum_current.current_value_of_consumption = safeAdd(sum_current.current_value_of_consumption, q.current_value_of_consumption);
            sum_current.external_energy_supply = safeAdd(sum_current.external_energy_supply, q.external_energy_supply);
            sum_current.internal_power_supply = safeAdd(sum_current.internal_power_supply, q.internal_power_supply);
            sum_current.current_power = safeAdd(sum_current.current_power, q.current_power);
            sum_current.self_consumption = safeAdd(sum_current.self_consumption, q.self_consumption);
            sum_current.grid_feed_in = safeAdd(sum_current.grid_feed_in, q.grid_feed_in);
          }
      
          /*
          * Calculate kWh cumulation per 15 minutes
          */
          let num_of_query = Math.max(currents.length, 1); // Number of recoreds queried
          let value_in_15m = {
            device_time: format_datetime(new Date(t)), // Time recored
            daily_value_of_consumption: sum_current.current_value_of_consumption / num_of_query,
            external_energy_supply: sum_current.external_energy_supply / num_of_query,
            internal_power_supply: sum_current.internal_power_supply / num_of_query,
            daily_yield: sum_current.current_power / num_of_query,
            self_consumption: sum_current.self_consumption / num_of_query,
            grid_feed_in: sum_current.grid_feed_in / num_of_query,
            device_id: device.id,
            flag: false
          };
      
          await db.Data15M.create(value_in_15m);  // Keep in value field
          for (let q of currents) {
            await db.Current.update(
              { flag: true },
              { where: { id: q.id } }
            );
          }
        }
      }
      // commit
      await transaction.commit();
      logger.info("15 minute update is success.");
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      logger.error(err);
      if (transaction) await transaction.rollback();
    }
  };
}

module.exports = _do_15MinuteFeedingTask;
