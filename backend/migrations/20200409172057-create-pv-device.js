'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PVDevices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_serial_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_ip: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_port: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      device_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comm_data_request_interval: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      invertor_generator_capacity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      station_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PVStations',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      device_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      device_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('PVDevices');
  }
};