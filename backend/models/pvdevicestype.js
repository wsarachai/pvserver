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
  
  class PVDevicesType extends Model {
  }

  PVDevicesType.init({
    device_unit: DataTypes.INTEGER,
    device_name: DataTypes.STRING,
    device_class: DataTypes.STRING,
    device_product_group: DataTypes.STRING,
    device_manufacturer: DataTypes.STRING,
    device_type_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PVDevicesType'
  });
  PVDevicesType.associate = function(models) {
    models.PVDevicesType.hasMany(models.Register, {
      foreignKey: 'device_type_id'
    });
  };
  return PVDevicesType;
};