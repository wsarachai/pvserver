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
const router = express.Router();
const asyncHandler = require('express-async-handler');
const db = require('../models');
const middleware = require('../config/middleware');
const logger = require('../winston/config');


function fixPermissions(role) {
  let jsonString = JSON.stringify(role);
  role = JSON.parse(jsonString);
  let permissions = role.permissions.map((pm) => pm.id);
  role.permissions = permissions;
  return role;
}

function fixRolesPermissions(roles) {
  return roles.map((role) => fixPermissions(role));
}


// Get all roles
router.get('/', (req, res) => {
  return db.Roles.findAll({
    include: [{
      model: db.Permissions,
      as: 'permissions',
      attributes: ['id', 'name']
    }],
  })
    .then((roles) => res.status(200).send(fixRolesPermissions(roles)))
    .catch((error) => {
      res.status(400).send(error);
    });
});

// find by id
router.get('/:id', (req, res) => {
  let id = parseInt(req.params.id);
  db.Roles.findByPk(id, {
    include: [{
      model: db.Permissions,
      as: 'permissions'
    }]
  })
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          message: 'Role Not Found',
        });
      }
      return res.status(200).send(fixPermissions(role));
    })
    .catch((error) => res.status(400).send(error));
});

// create
router.post('/', middleware.checkToken, asyncHandler(async (req, res) => {
  const {title, isCoreRole, permissions} = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    let role = await db.Roles.create({title, isCoreRole});

    permissions.forEach(async (pmId) => {
      let pm;
      if (pmId) {
        pm = {
          roleId: role.id,
          permissionId: pmId
        };
      }
      const savedResult = await db.RolesPermissions.create(pm, {w: 1}, {returning: true});
    });

    return res.status(200).send(role);
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// update
router.put('/', middleware.checkToken, asyncHandler(async (req, res) => {
  const {id, title, isCoreRole, permissions} = req.body;

  const transaction = await db.sequelize.transaction();
  try {
    let role = await db.Roles.findByPk(id);

    const oldPermissions = await role.getPermissions();
    if (oldPermissions) {
      role.removePermissions(oldPermissions);
    }
    permissions.forEach(async (pmId) => {
      let pm;
      if (pmId) {
        pm = {
          roleId: role.id,
          permissionId: pmId
        };
      }
      const savedResult = await db.RolesPermissions.create(pm, {w: 1}, {returning: true});
    });

    await role.update({title, isCoreRole});

    return res.status(200).send(role);
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// delete
router.delete('/:id', middleware.checkToken, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id)
  const transaction = await db.sequelize.transaction();
  try {
    let role = await db.Roles.findByPk(id)
      .catch((err) => {
        logger.error('***Error deleting role', JSON.stringify(err))
        res.status(400).send(err)
      });
    let permissions = await role.getPermissions();
    if (permissions) {
      await role.removePermissions(permissions);
    }
    await role.destroy();
    return res.status(200).send({id: id});
  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// Check Role Before deletion
router.get('/checkIsRollAssignedToUser/:id', asyncHandler(async (req, res) => {
  let roleId = parseInt(req.params.id)
  try {
    let users = await db.Users.findAll();
    let res = false;
    users.forEach(async (_user) => {
      _roles = await _user.getRoles();
      if (_roles) {
        _roles.forEach((_role) => {
          if (_role) {
            res = _user.id === roleId;
          }
        })
      }
    });

    return res.status(200).send({isRoleAssignedToUsers: res});
  } catch (ex) {
    res.status(400).send({});
  }
}));

router.post('/findRoles', asyncHandler(async (req, res) => {
  let {filter, pageNumber, pageSize, sortField, sortOrder} = req.body;

  let filterOption = Object.keys(filter).reduce((total, key) => {
    total[key] = {[Sequelize.Op.like]: "%" + filter[key] + "%"};
    return total;
  }, {});

  const transaction = await db.sequelize.transaction();
  try {
    let totalRoles = await db.Roles.count();
    let roles = await db.Roles.findAll({
      offset: pageNumber,
      limit: pageSize,
      order: [
        [sortField, sortOrder.toUpperCase()]
      ],
      where: {
        [Sequelize.Op.or]: filterOption
      },
      include: [{
        model: db.Permissions,
        as: 'permissions'
      }]
    });

    return res.status(200).send({
      items: fixRolesPermissions(roles),
      totalCount: totalRoles
    });

  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

module.exports = router;