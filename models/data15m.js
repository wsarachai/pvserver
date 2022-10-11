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

  class Data15M extends Model {
  }

  Data15M.init({
    device_time: DataTypes.DATE,
    daily_value_of_consumption: DataTypes.DECIMAL,
    external_energy_supply: DataTypes.DECIMAL,
    internal_power_supply: DataTypes.DECIMAL,
    daily_yield: DataTypes.DECIMAL,
    self_consumption: DataTypes.DECIMAL,
    grid_feed_in: DataTypes.DECIMAL,
    flag: DataTypes.BOOLEAN,
    device_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Data15M'
  });
  Data15M.associate = function (models) {

  };
  return Data15M;
};