'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Data15Ms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      daily_value_of_consumption: {
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
      daily_yield: {
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
      flag: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Data15Ms');
  }
};