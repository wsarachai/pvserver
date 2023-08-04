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

  class Register extends Model {
  }

  Register.init({
    register_number: DataTypes.INTEGER,
    description: DataTypes.STRING,
    number_of_word: DataTypes.INTEGER,
    data_type: DataTypes.STRING,
    unit_scale: DataTypes.FLOAT,
    format: DataTypes.STRING,
    access: DataTypes.STRING,
    device_type_id: DataTypes.INTEGER,
    flag: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Register'
  });
  Register.associate = function (models) {
    models.Register.PVDevicesType = Register.belongsTo(models.PVDevicesType, {
      as: 'deviceType',
      foreignKey: 'device_type_id',
    });
  };
  return Register;
};