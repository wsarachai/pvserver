'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let d = new Date();
    return queryInterface.bulkInsert('Currents', [{
      device_id: 1,
      value: "{}",
      device_time: new Date().toISOString().slice(0,10),
      day: d.getDate(),
      month: d.getMonth()+1,
      year: d.getFullYear(),
      current_value_of_consumption: 0.0,
      external_energy_supply: 0.0,
      internal_power_supply: 0.0,
      current_power: 0.0,
      self_consumption: 0.0,
      grid_feed_in: 0.0,
      temperature_measurement: 0.0,
      ambient_temperature: 0.0,
      total_irradiation: 0.0,
      flag: false,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Currents', null, {});
  }
};
