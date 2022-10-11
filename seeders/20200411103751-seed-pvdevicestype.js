'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PVDevicesTypes', [{
      device_unit: 2,
      device_name: 'Cluster Controller',
      device_class: 'Communication products',
      device_product_group: 'SMA Custering',
      device_manufacturer: 'SMA',
      device_type_id: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },{
      device_unit: 2,
      device_name: 'Data Manager',
      device_class: 'Communication products',
      device_product_group: 'Monitoring and control',
      device_manufacturer: 'SMA',
      device_type_id: 2,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PVDevicesTypes', null, {});
  }
};
