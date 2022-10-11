'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Hourlies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      device_time: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      hourly_value_of_consumption: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      external_energy_supply: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      internal_power_supply: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      hourly_yield: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      self_consumption: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      grid_feed_in: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      day: {
        allowNull: false,
        type: Sequelize.STRING
      },
      month: {
        allowNull: false,
        type: Sequelize.STRING
      },
      year: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Hourlies');
  }
};