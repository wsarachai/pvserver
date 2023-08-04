'use strict';
const PVDevice = require('../models/pvdevice');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PVDevices', [{
      name: 'Building A',
      device_serial_number: '3006081961',
      device_ip: '10.1.53.231',
      device_port: 502,
      device_status: 'OK',
      comm_data_request_interval: 5,
      invertor_generator_capacity: 5,
      type: '',
      station_id: 1,
      device_id: 1,
      device_type_id: 2,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },
    {
      name: 'Yotsuk Building',
      device_serial_number: '3006081961',
      device_ip: '10.1.53.231',
      device_port: 502,
      device_status: 'OK',
      comm_data_request_interval: 5,
      invertor_generator_capacity: 5,
      type: '',
      station_id: 3,
      device_id: 2,
      device_type_id: 2,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },
    {
      name: 'Building B',
      device_serial_number: '165021462',
      device_ip: '10.1.61.2',
      device_port: 502,
      device_status: 'OK',
      comm_data_request_interval: 5,
      invertor_generator_capacity: 5,
      type: '',
      station_id: 1,
      device_id: 3,
      device_type_id: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {
      include: [{
            association: PVDevice.PVStation
      }]
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PVDevices', null, {});
  }
};
