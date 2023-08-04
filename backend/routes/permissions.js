/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const express = require('express');
const router = express.Router();
const db = require('../models');
const logger = require('../winston/config');

// get all permissions
router.get('/', (req, res) => {
  return db.Permissions.findAll()
    .then((permissions) => res.send(permissions))
    .catch((err) => {
      logger.error('There was an error querying permissions', JSON.stringify(err))
      return res.send(err)
    });
});

// get role
router.get('/getRolePermission/:id', (req, res) => {
  const id = parseInt(req.params.id)
  return db.Permissions.findByPk(id)
    .then((permission) => res.send(permission))
    .catch((err) => {
      logger.error('There was an error querying permissions', JSON.stringify(err))
      return res.send(err)
    });
});

module.exports = router;