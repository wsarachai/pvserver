/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config');
const express = require('express');
const router = express.Router();
const db = require('../models');

function findByEmail(email) {
  let promise = new Promise(function (resolve, reject) {
    db.Users.findAll({
      where: {
        email: email
      }
    }).then((users) => {
      if (users && users.length > 0) {
        resolve(users[0]);
      } else {
        reject(new Error('User Not Found'));
      }
    }).catch((error) => reject(error));
  });
  return promise;
}

function updateToken(user, token) {
  promise = new Promise(function (resolve, reject) {
    db.Users.update(
      {accessToken: token},
      {where: {id: user.id}}
    )
      .then(function (rowsUpdated) {
        resolve(rowsUpdated);
      })
      .catch((error) => reject(error))
  });
  return promise;
}

router.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    findByEmail(email)
      .then((user) => {
        if (email === user.email
          && bcrypt.compareSync(password, user.password)) {
          let token = jwt.sign({username: email},
            config.secret,
            {
              expiresIn: '24h' // expires in 24 hours
            }
          );
          updateToken(user, token).then((rowsUpdated) => {
            if (rowsUpdated > 0) {
              user.accessToken = token;
              res.status(200).send(user)
            } else {
              res.status(401).send('Incorrect username or password');
            }
          });
        } else {
          res.status(401).send('Incorrect username or password');
        }
      })
      .catch((error) => {
        res.status(401).send('Authentication failed! Please check the request');
      });
  } else {
    res.status(401).send('Authentication failed! Please check the request');
  }
});

module.exports = router;