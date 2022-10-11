'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Data15Ms', [{
      device_time: new Date().toISOString().slice(0,10),
      daily_value_of_consumption: 0.0,
      external_energy_supply: 0.0,
      internal_power_supply: 0.0,
      daily_yield: 0.0,
      self_consumption: 0.0,
      grid_feed_in: 0.0,
      flag: false,
      device_id: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Data15Ms', null, {});
  }
};
