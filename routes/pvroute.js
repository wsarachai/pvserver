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
const Currents = require('../app/contents/energy_balance/current');
const Days = require('../app/contents/energy_balance/day');
const Month = require('../app/contents/energy_balance/month');
const Years = require('../app/contents/energy_balance/year');
const Total = require('../app/contents/energy_balance/total');
const Dashboards = require('../app/contents/dashboard');
const CurrentStatus = require('../app/contents/current_status');
const asyncHandler = require('express-async-handler');

/******************************************************************************
 * The /current route
 *****************************************************************************/
router.get('/current', (req, res) => {
  let key = req.query.key;
  let stationId = req.query.stationId;
  Currents(req, res, key, stationId);
});


/******************************************************************************
 * The /day route
 *****************************************************************************/
router.get('/day', (req, res) => {
  let key = req.query.key;
  let stationId = req.query.stationId;
  Days(req, res, key, stationId);
});


/******************************************************************************
 * The /month route
 *****************************************************************************/
router.get('/month', (req, res) => {
  let key = req.query.key;
  let stationId = req.query.stationId;
  Month(req, res, key, stationId);
});


/******************************************************************************
 * The /year route
 *****************************************************************************/
router.get('/year', (req, res) => {
  let key = req.query.key;
  let stationId = req.query.stationId;
  Years(req, res, key, stationId);
});


/******************************************************************************
 * The /total route
 *****************************************************************************/
router.get('/total', (req, res) => {
  let key = req.query.key;
  let stationId = req.query.stationId;
  Total(req, res, key, stationId);
});


/******************************************************************************
 * The /current/dashboard route
 *****************************************************************************/
router.get('/current/dashboard', asyncHandler(async (req, res) => {
  let stationId = req.query.stationId;
  await Dashboards(req, res, stationId);
}));


/******************************************************************************
 * The /current/status route
 *****************************************************************************/
router.get('/current/status', (req, res) => {
  let stationId = req.query.stationId;
  CurrentStatus(req, res, stationId);
});


module.exports = router;
