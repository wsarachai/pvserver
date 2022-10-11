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

  class PVDevice extends Model {
  }

  PVDevice.init({
    name: DataTypes.STRING,
    device_serial_number: DataTypes.STRING,
    device_ip: DataTypes.STRING,
    device_port: DataTypes.INTEGER,
    device_status: DataTypes.STRING,
    comm_data_request_interval: DataTypes.INTEGER,
    invertor_generator_capacity: DataTypes.INTEGER,
    type: DataTypes.STRING,
    station_id: DataTypes.INTEGER,
    device_id: DataTypes.INTEGER,
    device_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PVDevice'
  });
  PVDevice.associate = function (models) {
    models.PVDevice.PVStation = models.PVDevice.belongsTo(models.PVStation, {
      as: 'station',
      foreignKey: 'station_id',
    });
    models.PVDevice.hasMany(models.Current, {
      foreignKey: 'device_id'
    });
    models.PVDevice.hasMany(models.Hourly, {
      foreignKey: 'device_id'
    });
  };
  return PVDevice;
};