/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const db = require('../../../models');
const guassian = require('../../guasian');
const pvapi = require('../../pvapi');
const Int64 = require('node-int64');
const { Sequelize, Op } = require('sequelize');
const {
  format_datetime
} = require('../../../app/contents');
const logger = require('../../../middleware/winston/config');


/******************************************************************************
 * It mockup the data read from the MODBUS register from data collector device.
*/
const _do_readData_mockup = async(device, time) => {
  let deviceTypes = await db.PVDevicesType.findByPk(device.device_type_id, {
    include: {
      model: db.Register,
      where: {
        [Op.and]: [{ flag: 1 }]
      }
    }
  });

  // We need readonly registers
  let registers = deviceTypes.Registers.filter((reg) => {
    return reg.access.toLowerCase() == 'ro';
  });

  let obj_to_save = {}; // The object to be saved data
  for (let register of registers) {
    let register_number = `reg${register.register_number}`;
    let value = guassian.get_consumtion_by_time(time);
    // 30193 UTC system time (s)
    if (register.register_number == 30193) {
      value = Math.round(time.getTime() / 1000);
    }
    // 30513 Total energy fed in on all line conductors (Wh)
    else if (register.register_number == 30513) {
      value = -1423450;
    }
    // 30233 Accumulated connected power of the PV inverter
    else if (register.register_number == 30233) {
      value = value - guassian.uniform(1, 3);
      value = parseFloat(value.toFixed(2));
    }
    // 30513 Total energy fed in on all line conductors
    else if (register.register_number == 30513) {
      value = 17500000;
    }
    // 30775 Current PV feed-in active power on all line
    else if (register.register_number == 30775) {
      value = guassian.get_generation_by_time(time);
      if (value > 0) {
        value = guassian.get_generation_by_time(time) + guassian.uniform(1, 7000);
      }
    }
    // 31249 Active power of system at PCC (W)
    else if (register.register_number == 31249) {
      value = guassian.get_consumtion_by_time(time);
    } else {
      value = 0.0;
    }

    obj_to_save[register_number] = value;
  }
  return obj_to_save;
};

/******************************************************************************
 * This function is run every 10 minutes.
 *****************************************************************************/
const _do_10SecondFeeding_mockupTask = () => {
  return async () => {
    let devices = await db.PVDevice.findAll();

    let time = new Date();
    for (let device of devices) {
      let obj_to_save = await _do_readData_mockup(device, time)

      if (process.env.NODE_ENV !== 'production') {
        logger.verbose("Device ID[" + device.device_ip + "]: " + device.id);
        logger.verbose(JSON.stringify(obj_to_save));
      }

      // Save it to the database.
      let curr = {
        device_id: device.id,
        value: JSON.stringify(obj_to_save),
        device_time: format_datetime(time),
        day: time.getDate(),
        month: time.getMonth() + 1,
        year: time.getFullYear(),
        current_value_of_consumption: pvapi.current_value_of_consumption(obj_to_save),
        external_energy_supply: pvapi.external_energy_supply(obj_to_save),
        internal_power_supply: pvapi.internal_power_supply(obj_to_save),
        current_power: pvapi.current_power(obj_to_save),
        self_consumption: pvapi.self_consumption(obj_to_save),
        grid_feed_in: pvapi.grid_feed_in(obj_to_save),
        temperature_measurement: 0.0,
        total_irradiation: 0.0
      };
      await db.Current.create(curr);
    }
  };
}


module.exports = _do_10SecondFeeding_mockupTask;
