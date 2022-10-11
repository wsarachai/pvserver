'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PVStations', [{
      station_name: 'School of Renewable Energy MJU',
      station_power: 300,
      station_location: 'School of Renewable Energy MJU',
      station_commissioning_date: new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },{
      station_name: 'อาคารอธิการบดี',
      station_power: 300,
      station_location: 'อาคารอธิการบดี',
      station_commissioning_date: new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },{
      station_name: 'อาคารอำนวยยศสุข',
      station_power: 302.08,
      station_location: 'อาคารอำนวยยศสุข',
      station_commissioning_date: new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },{
      station_name: 'สนามกีฬาอินทนิน',
      station_power: 300,
      station_location: 'สนามกีฬาอินทนิน',
      station_commissioning_date: new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    },{
      station_name: 'หอสมุด',
      station_power: 300,
      station_location: 'หอสมุด',
      station_commissioning_date: new Date().toISOString().slice(0,10),
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PVStations', null, {});
  }
};
