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

class PVStation extends Model {
}

module.exports = (sequelize, DataTypes) => {
  PVStation.init({
    station_name: DataTypes.STRING,
    station_power: DataTypes.INTEGER,
    station_location: DataTypes.STRING,
    station_commissioning_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PVStation'
  });
  PVStation.associate = function (models) {
    models.PVStation.hasMany(models.PVDevice, {
      foreignKey: 'station_id'
    });
  };
  return PVStation;
};