/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Hourly extends Model {
  }

  Hourly.init({
    device_id: DataTypes.INTEGER,
    device_time: DataTypes.DATEONLY,
    hourly_value_of_consumption: DataTypes.DECIMAL,
    external_energy_supply: DataTypes.DECIMAL,
    internal_power_supply: DataTypes.DECIMAL,
    hourly_yield: DataTypes.DECIMAL,
    self_consumption: DataTypes.DECIMAL,
    grid_feed_in: DataTypes.DECIMAL,
    day: DataTypes.STRING,
    month: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hourly'
  });
  Hourly.associate = function (models) {

  };
  return Hourly;
};