'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PVDevicesTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_unit: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      device_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_class: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_product_group: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_manufacturer: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PVDevicesTypes');
  }
};