'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PVStations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      station_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      station_power: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      station_location: {
        allowNull: false,
        type: Sequelize.STRING
      },
      station_commissioning_date: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('PVStations');
  }
};