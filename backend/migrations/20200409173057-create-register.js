'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Registers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      register_number: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      number_of_word: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      data_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      unit_scale: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      format: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access: {
        allowNull: false,
        type: Sequelize.STRING
      },
      device_type_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PVDevicesTypes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      flag: {
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
    return queryInterface.dropTable('Registers');
  }
};