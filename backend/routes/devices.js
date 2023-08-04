/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const express = require('express');
const Sequelize = require('sequelize');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const db = require('../models');
const middleware = require('../config/middleware');
const logger = require('../winston/config');

const pvDeviceInclude = [
  {
    model: db.PVPanels,
    as: 'pvPanel'
  },
  {
    model: db.HomeConsumtions,
    as: 'homeConsumtion'
  },
  {
    model: db.GridFeedings,
    as: 'gridFeeding'
  },
  {
    model: db.Batteries,
    as: 'battery'
  },
  {
    model: db.QuotaStuffs,
    as: 'quotaStuff'
  },
  {
    model: db.RateStuffs,
    as: 'rateStuff'
  }
];

// get all devices
router.get('/', (req, res) => {
  return db.PVDevices.findAll({include: pvDeviceInclude})
    .then((pvDevices) => res.send(pvDevices))
    .catch((err) => {
      logger.error('There was an error querying pv device', JSON.stringify(err))
      return res.send(err)
    });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.PVDevices.findByPk(id, {include: pvDeviceInclude})
    .then((pvDevice) => {
      res.send(pvDevice)
    })
    .catch((err) => {
      logger.error('There was an error querying pv device', JSON.stringify(err));
      return res.status(400).send(err);
    });
});

router.post('/findDevices', asyncHandler(async (req, res) => {
  let {filter, pageNumber, pageSize, sortField, sortOrder} = req.body;
  let filterOption = Object.keys(filter).reduce((total, key) => {
    total[key] = {[Sequelize.Op.like]: "%" + filter[key] + "%"};
    return total;
  }, {});

  const transaction = await db.sequelize.transaction();
  try {
    let totalPVDevices = await db.PVDevices.count();
    let pvDevices = await db.PVDevices.findAll({
      offset: pageNumber,
      limit: pageSize,
      order: [
        [sortField, sortOrder.toUpperCase()]
      ],
      where: {
        [Sequelize.Op.or]: filterOption
      },
      include: pvDeviceInclude
    });

    return res.status(200).send({
      items: pvDevices,
      totalCount: totalPVDevices
    });

  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// delete device by id
router.delete('/:id', middleware.checkToken, asyncHandler(async (req, res) => {
  let id = parseInt(req.params.id);

  const transaction = await db.sequelize.transaction();
  try {
    let pvDevice = await db.PVDevices.findByPk(id)
      .catch((err) => {
        logger.error('***Error deleting PV Device', JSON.stringify(err))
        res.status(400).send(err)
      });
    await pvDevice.destroy();
    return res.status(200).send({id: id});
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// update device
router.put('/', middleware.checkToken, asyncHandler(async (req, res) => {
  let {
    id,
    deviceName,
    hasBattery,
    powerUnit
  } = req.body;

  let totalConsumtion = 0;
  let purchasedElectricity = 0;
  hasBattery = 0;
  powerUnit = "KW";

  const transaction = await db.sequelize.transaction();
  try {
    let pvDevice = await db.PVDevices.findByPk(id);

    await pvDevice.update({
      deviceName,
      totalConsumtion,
      purchasedElectricity,
      hasBattery,
      powerUnit
    });

    return res.status(200).send(pvDevice);
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// create device
router.post('/', middleware.checkToken, asyncHandler(async (req, res) => {
  let {
    deviceName,
    hasBattery,
    powerUnit
  } = req.body;

  let totalConsumtion = 0;
  let purchasedElectricity = 0;
  hasBattery = 0;
  powerUnit = "KW";

  const transaction = await db.sequelize.transaction();
  try {
    let pvDevice = await db.PVDevices.create({
      deviceName,
      totalConsumtion,
      purchasedElectricity,
      hasBattery,
      powerUnit
    });
    return res.status(200).send(pvDevice);
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

module.exports = router;