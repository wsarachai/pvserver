/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const db = require('../../../models');
const pvapi = require('../../pvapi');
const net = require('net');
const Int64 = require('node-int64');
const { Op } = require('sequelize');
const Modbus = require('jsmodbus');
const {PromiseSocket} = require("promise-socket");
const {
  toPaddedZeroString16,
  format_datetime
} = require('../../../app/contents');
const {
  getLocalTime
} = require('../../../app/contents');
const logger = require('../../../middleware/winston/config');


const s16 = (values) => {
  let value = parseInt(values[0] << 8 | values[1]);
  value = 0xffff & value;
  if ((value ^ 0x8000) === 0) {
    // If NaN value
    return 0;
  } else {
    return 0xffff0000 | value;
  }
};


const u16 = (values) => {
  let value = parseInt(values[0] << 8 | values[1]);
  value = 0xffff & value;
  if ((value ^ 0xffff) === 0) {
    // If NaN value
    return 0;
  } else {
    return value;
  }
};


const s32 = (values) => {
  let value = parseInt(values[0] << 16 | values[1]);
  if ((value ^ 0x80000000) === 0) {
    // If NaN value
    return 0;
  } else {
    return value;
  }
};


const u32 = (values) => {
  var value = `0x${toPaddedZeroString16(values[0], 4)}${toPaddedZeroString16(values[1], 4)}`;
  value = new Int64(value).toNumber(true);
  if ((value ^ 0xffffffff) === 0) {
    // If NaN value
    return 0;
  } else {
    return value;
  }
};


const _convert64 = (values) => {
  var value = `0x${toPaddedZeroString16(values[0], 4)}${toPaddedZeroString16(values[1], 4)}${toPaddedZeroString16(values[2], 4)}${toPaddedZeroString16(values[3], 4)}`;
  value = new Int64(value).toNumber(true);
  return value;
};


const s64 = (values) => {
  let value = _convert64(values);
  return value;
};


/* This is an unsigned int 64-bit functions. 
  It might be a bug in future.
  If the value exceeds 0x7FFFFFFFFFFFFFFF. The value will be below zero.
  */
const u64 = (values) => {
  let value = _convert64(values);
  if ((value ^ 0xffffffffffffffff) === 0) {
    return 0;
  } else {
    return value;
  }
};


const transform_value = (type, values) => {
  switch (type.toLowerCase()) {
    case "s16":
      return s16(values);
    case "u16":
      return u16(values);
    case "s32":
      return s32(values);
    case "u32":
      return u32(values);
    case "s64":
      return s64(values);
    case "u64":
      return u64(values);
    default:
      throw new Error("No convertor type");
  }
};


/******************************************************************************
 * This function is run every 10 minutes.
 * It read the MODBUS register from data collector device.
 *****************************************************************************/
const _do_10SecondFeedingTask = () => {
  return async () => {
    let transaction;
    try {
      // get transaction
      transaction = await db.sequelize.transaction();

      let ct = new Date();
      let time_value = format_datetime(ct);

      let devices = await db.PVDevice.findAll();
      for (let device of devices) {
        let deviceTypes = await db.PVDevicesType.findByPk(device.device_type_id, {
          include: {
            model: db.Register,
            where: {
              [Op.and]: [{ flag: 1 }]
            }
          }
        });

        let newCurrent = {
          device_id: device.id,
          value: "[]",
          device_time: time_value,
          day: ct.getDate(),
          month: ct.getMonth() + 1,
          year: ct.getFullYear(),
          current_value_of_consumption: 0.0,
          external_energy_supply: 0.0,
          internal_power_supply: 0.0,
          current_power: 0.0,
          self_consumption: 0.0,
          grid_feed_in: 0.0,
          temperature_measurement: 0.0,
          ambient_temperature: 0.0,
          total_irradiation: 0.0
        }

        // Preparing the socket and Modbus object.
        const promiseSocket = new PromiseSocket(new net.Socket())
        const socket = promiseSocket.stream;
        const client = new Modbus.client.TCP(socket, deviceTypes.device_unit);
        const options = {
          'host': device.device_ip,
          'port': device.device_port,
          'timeout': 0
        };

        // Find the time register to be readed.
        let time_reg = deviceTypes.Registers.find((reg) => {
          return reg.register_number == 30193;
        });
        if (time_reg) {
          // The callback connect function
          socket.on('connect', async () => {
            try {
              // Acquiring time from the device.
              await client.readHoldingRegisters(time_reg.register_number, time_reg.number_of_word)
                .then((resp) => {
                  let data = transform_value(time_reg.data_type, resp.response._body.valuesAsArray);
                  time_value = data / time_reg.unit_scale;
                });
              /*
                * Acquiring other data from the device,
                * except the time register (30193) and we need to read
                * only the readonly register.
                */
              let registers = deviceTypes.Registers.filter((reg) => {
                return reg.access.toLowerCase() == 'ro';// && reg.register_number != 30193;
              });
              time_value = format_datetime(new Date(time_value));

              let obj_to_save = {}; // The object to be saved data

              // read all register queries
              for (let register of registers) {
                let valid = false;
                await client.readHoldingRegisters(register.register_number, register.number_of_word)
                  .then((resp) => {
                    let data = transform_value(register.data_type, resp.response._body.valuesAsArray);
                    value = data / register.unit_scale;
                    valid = true;
                  }).catch((err) => {
                    logger.error(`Call error: ${err.err}, on ${register.register_number}`);
                  });
                // If read success, save it.
                if (valid) {
                  let register_number = `reg${register.register_number}`;
                  obj_to_save[register_number] = value;
                }
              }

              logger.verbose("Device [" + device.device_ip + "]");
              logger.verbose(JSON.stringify(obj_to_save));

              newCurrent = {
                device_id: device.id,
                value: JSON.stringify(obj_to_save),
                device_time: time_value,
                day: ct.getDate(),
                month: ct.getMonth() + 1,
                year: ct.getFullYear(),
                current_value_of_consumption: pvapi.current_value_of_consumption(obj_to_save),
                external_energy_supply: pvapi.external_energy_supply(obj_to_save),
                internal_power_supply: pvapi.internal_power_supply(obj_to_save),
                current_power: pvapi.current_power(obj_to_save),
                self_consumption: pvapi.self_consumption(obj_to_save),
                grid_feed_in: pvapi.grid_feed_in(obj_to_save),
                temperature_measurement: pvapi.temperature_measurement(obj_to_save),
                ambient_temperature: pvapi.ambient_measurement(obj_to_save),
                total_irradiation: pvapi.total_irradiation(obj_to_save)
              }
            } finally {
              socket.destroy();

              // Save it to the database.
              await db.Current.create(newCurrent);

            }
          });
          // The OnError handling finction
          socket.on('error', (err) => {
            logger.error(err.message);
          });
          socket.setTimeout(2000, async () => {
            socket.destroy();
            logger.error(getLocalTime(new Date()) + "Connection to server timeoout!!");
            // Alway to create defalut current, due to timestemp
            await db.Current.create(newCurrent);
          });
          // Kick start
          await socket.connect(options);
        }
      }
      // commit
      await transaction.commit();
    } catch (err) {
      // Rollback transaction only if the transaction object is defined
      logger.error(err);
      if (transaction) await transaction.rollback();
    }
  };
}

module.exports = _do_10SecondFeedingTask;
