'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Currents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PVDevices',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      value: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      device_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      day: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      month: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      current_value_of_consumption: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      external_energy_supply: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      internal_power_supply: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      current_power: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      self_consumption: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      grid_feed_in: {
        allowNull: false,
        type: Sequelize.DECIMAL(12,2)
      },
      temperature_measurement: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      ambient_temperature: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      total_irradiation: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      flag: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable('Currents');
  }
};