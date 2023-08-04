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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const middleware = require('../config/middleware');
const db = require('../models');
const config = require('./config');


function getById(id) {
  let promise = new Promise(function (resolve, reject) {
    db.Users.findByPk(id, {
      include: [
        {
          model: db.Roles,
          as: 'roles'
        },
        {
          model: db.Addresses,
          as: 'addresses'
        },
        {
          model: db.SocialNetworks,
          as: 'socialNetworks'
        }
      ]
    }).then((user) => {
      if (!user) {
        reject(new Error('User Not Found'));
      } else {
        resolve(fixRoles(user));
      }
    }).catch((error) => reject(error));
  });
  return promise;
}


function findByToken(token) {
  let promise = new Promise(function (resolve, reject) {
    db.Users.findAll({
      where: {
        accessToken: token
      }, include: [
        {
          model: db.Roles,
          as: 'roles',
          attributes: ['id']
        },
        {
          model: db.Addresses,
          as: 'addresses'
        },
        {
          model: db.SocialNetworks,
          as: 'socialNetworks'
        }
      ]
    }).then((users) => {
      if (users && users.length > 0) {
        resolve(fixRoles(users[0]));
      } else {
        reject(new Error('User Not Found'));
      }
    }).catch((error) => reject(error));
  });
  return promise;
}

function fixRoles(user) {
  let jsonString = JSON.stringify(user);
  user = JSON.parse(jsonString);
  let roles = user.roles.map((role) => role.id);
  user.roles = roles;
  return user;
}

function fixUsersRoles(users) {
  return users.map((user) => fixRoles(user));
}

// get all users
router.get('/usersroles', middleware.checkToken, (req, res) => {
  return db.UsersRoles.findAll()
    .then((uroles) => res.status(200).send(uroles))
    .catch((error) => {
      res.status(400).send(error);
    });
});

// get all users
router.get('/', middleware.checkToken, (req, res) => {
  return db.Users.findAll({
    include: [
      {
        model: db.Roles,
        as: 'roles'
      },
      {
        model: db.Addresses,
        as: 'addresses'
      },
      {
        model: db.SocialNetworks,
        as: 'socialNetworks'
      }
    ],
  }).then((users) => res.status(200).send(fixUsersRoles(users)))
    .catch((error) => {
      res.status(400).send(error);
    });
});

// get user by id
router.get('/:id', middleware.checkToken, (req, res) => {
  let id = parseInt(req.params.id)
  getById(id).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: 'User Not Found',
      });
    }
    return res.status(200).send(user);
  }).catch((error) => res.status(400).send(error));
});

// delete user by id
router.delete('/:id', middleware.checkToken, asyncHandler(async (req, res) => {
  let id = parseInt(req.params.id)
  const transaction = await db.sequelize.transaction();
  try {
    let user = await db.Users.findByPk(id);
    if (!user) {
      return res.status(400).send({
        message: 'Role Not Found',
      });
    }

    let roles = await user.getRoles();
    let addresses = await user.getAddresses();
    let social = await user.getSocialNetworks();
    if (roles) {
      user.removeRoles(roles);
    }
    if (addresses) {
      addresses.destroy();
    }
    if (social) {
      social.destroy();
    }

    return user
      .destroy()
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).send(error));

  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// get user by token
router.get('/tk/:id', (req, res) => {
  let userToken = req.params.id;

  findByToken(userToken).then((user) => {
    if (user) {
      user.password = undefined;
      res.send(user);
    }
  }).catch((error) => res.status(400).send(error));
});

router.get('/forgot/:email', (req, res) => {
  let email = req.params.email;
});

router.post('/findUsers', middleware.checkToken, asyncHandler(async (req, res) => {
  let {filter, pageNumber, pageSize, sortField, sortOrder} = req.body;

  let filterOption = Object.keys(filter).reduce((total, key) => {
    total[key] = {[Sequelize.Op.like]: "%" + filter[key] + "%"};
    return total;
  }, {});

  const transaction = await db.sequelize.transaction();
  try {
    let totalUsers = await db.Users.count();
    let users = await db.Users.findAll({
      offset: pageNumber,
      limit: pageSize,
      order: [
        [sortField, sortOrder.toUpperCase()]
      ],
      where: {
        [Sequelize.Op.or]: filterOption
      },
      include: [
        {
          model: db.Roles,
          as: 'roles'
        },
        {
          model: db.Addresses,
          as: 'addresses'
        },
        {
          model: db.SocialNetworks,
          as: 'socialNetworks'
        }
      ]
    });

    users = fixUsersRoles(users);
    return res.status(200).send({
      items: users,
      totalCount: totalUsers
    });

  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

// register or create user
router.post('/', (req, res) => {
  let {
    email,
    username,
    fullname,
    password,
    roles
  } = req.body;

  if (username && fullname) {
    let salt = bcrypt.genSaltSync(config.saltRounds);
    let hash = bcrypt.hashSync(password, salt);
    let token = jwt.sign({username: username},
      config.secret,
      {
        expiresIn: '24h' // expires in 24 hours
      }
    );
    db.Users.create({
      email: email,
      username: username,
      fullname: fullname,
      password: hash,
      salt: salt,
      accessToken: token,
      refreshToken: token,
      pic: './assets/media/users/default.jpg'
    })
      .then((newUser) => {
        if (roles && roles.length > 0) {
          roles.forEach(roleId => {
            getById(roleId)
              .then((role) => {
                db.UsersRoles.create({
                  userId: newUser.id,
                  roleId: role.id
                }).catch((error) => res.status(400).send(error));

              })
              .catch((error) => res.status(400).send(error));
          });
          // TODO: should call after all of Roles created.
          res.status(200).send(newUser);
        } else {
          res.status(200).send(newUser);
        }
      })
      .catch((error) => res.status(400).send(error));
  } else {
    res.sendStatus(403).json({
      success: false,
      message: 'Incorrect username or password'
    });
  }
});

// update user
router.put('/', middleware.checkToken, asyncHandler(async (req, res) => {
  let {
    id,
    username,
    password,
    email,
    accessToken,
    refreshToken,
    roles,
    pic,
    fullname,
    occupation,
    companyName,
    phone,
    addresses,
    socialNetworks
  } = req.body;
  const transaction = await db.sequelize.transaction();
  try {
    const user = await db.Users.findByPk(id);
    const oldRoles = await user.getRoles();
    if (oldRoles) {
      user.removeRoles(oldRoles);
    }

    roles.forEach(async (newRoleId) => {
      let ru;
      if (newRoleId) {
        ru = {
          userId: id,
          roleId: newRoleId
        };
      }
      const savedUsersRoles = await db.UsersRoles.create(ru, {w: 1}, {returning: true});
    });

    if (addresses) {
      const oldAddress = await user.getAddresses();
      if (oldAddress) {
        oldAddress.destroy();
      }
      const addr = {
        userId: id,
        addressLine: addresses.addressLine || user.address.addressLine,
        city: addresses.city || user.addresses.city,
        state: addresses.state || user.addreses.state,
        postCode: addresses.postCode || user.addresses.postCode
      };

      const saveAddresses = await db.Addresses.create(addr, {w: 1}, {returning: true});
    }

    if (socialNetworks) {
      const oldSocialNetworks = await user.getSocialNetworks();
      if (oldSocialNetworks) {
        oldSocialNetworks.destroy();
      }
      const social = {
        userId: id,
        linkedIn: socialNetworks.linkedIn || user.socialNetworks.linkedIn,
        facebook: socialNetworks.facebook || user.socialNetworks.facebook,
        twitter: socialNetworks.twitter || user.socialNetworks.twitter,
        instagram: socialNetworks.instagram || user.socialNetworks.instagram
      };

      const saveSocial = await db.SocialNetworks.create(social, {w: 1}, {returning: true});
    }

    let hash;
    let token;

    if (password && password !== user.password) {
      hash = bcrypt.hashSync(password, user.salt);
      token = jwt.sign({username: username},
        config.secret,
        {
          expiresIn: '24h' // expires in 24 hours
        }
      );
    }

    let updateUser = {
      'username': username || user.username,
      'password': hash || user.password,
      'email': email || user.email,
      'accessToken': token || accessToken,
      'refreshToken': token || refreshToken,
      'pic': pic || user.pic,
      'fullname': fullname || user.fullname,
      'occupation': occupation || user.occupation,
      'companyName': companyName || user.companyName,
      'phone': phone || user.phone
    }

    const updatedUser = await db.Users.update(updateUser, {where: {id: id}});
    updateUser = await db.Users.findByPk(id);

    return res.status(200).send(updatedUser);

  } catch (ex) {
    await transaction.rollback();
    res.status(400).send({});
  }
}));

module.exports = router;