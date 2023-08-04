'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hourlies', [{
      device_id: 1,
      device_time: new Date().toISOString().slice(0,10),
      hourly_value_of_consumption: 0.0,
      external_energy_supply: 0.0,
      internal_power_supply: 0.0,
      hourly_yield: 0.0,
      self_consumption: 0.0,
      grid_feed_in: 0.0,
      day: "1",
      month: "1",
      year: "1",
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hourlies', null, {});
  }
};
