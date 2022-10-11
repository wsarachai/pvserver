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

class Current extends Model {
}

module.exports = (sequelize, DataTypes) => {

  Current.init({
    device_id: DataTypes.INTEGER,
    value: DataTypes.TEXT,
    device_time: DataTypes.DATE,
    day: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    current_value_of_consumption: DataTypes.DECIMAL,
    external_energy_supply: DataTypes.DECIMAL,
    internal_power_supply: DataTypes.DECIMAL,
    current_power: DataTypes.DECIMAL,
    self_consumption: DataTypes.DECIMAL,
    grid_feed_in: DataTypes.DECIMAL,
    temperature_measurement: DataTypes.INTEGER,
    ambient_temperature: DataTypes.INTEGER,
    total_irradiation: DataTypes.INTEGER,
    flag: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Current'
  });

  Current.associate = function (models) {
    // associations can be defined here
  };
  return Current;
};