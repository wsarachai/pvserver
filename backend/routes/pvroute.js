/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 *
 * This file is part of PV-System Monitoring.
 *
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const express = require("express");
const Currents = require("../app/contents/energy_balance/current");
const Days = require("../app/contents/energy_balance/day");
const Month = require("../app/contents/energy_balance/month");
const Years = require("../app/contents/energy_balance/year");
const Total = require("../app/contents/energy_balance/total");
const Dashboards = require("../app/contents/dashboard");
const CurrentStatus = require("../app/contents/current_status");
const asyncHandler = require("express-async-handler");

class PVRoute {
  constructor() {
    this.router = express.Router();
    /******************************************************************************
     * The /current route
     *****************************************************************************/
    this.router.get("/current", (req, res) => {
      let key = req.query.key;
      let stationId = req.query.stationId;
      Currents(req, res, key, stationId);
    });
    /******************************************************************************
     * The /day route
     *****************************************************************************/
    this.router.get("/day", (req, res) => {
      let key = req.query.key;
      let stationId = req.query.stationId;
      Days(req, res, key, stationId);
    });
    /******************************************************************************
     * The /month route
     *****************************************************************************/
    this.router.get("/month", (req, res) => {
      let key = req.query.key;
      let stationId = req.query.stationId;
      Month(req, res, key, stationId);
    });
    /******************************************************************************
     * The /year route
     *****************************************************************************/
    this.router.get("/year", (req, res) => {
      let key = req.query.key;
      let stationId = req.query.stationId;
      Years(req, res, key, stationId);
    });
    /******************************************************************************
     * The /total route
     *****************************************************************************/
    this.router.get("/total", (req, res) => {
      let key = req.query.key;
      let stationId = req.query.stationId;
      Total(req, res, key, stationId);
    });
    /******************************************************************************
     * The /current/dashboard route
     *****************************************************************************/
    this.router.get(
      "/current/dashboard",
      asyncHandler(async (req, res) => {
        let stationId = req.query.stationId;
        await Dashboards(req, res, stationId);
      })
    );
    /******************************************************************************
     * The /current/status route
     *****************************************************************************/
    this.router.get("/current/status", (req, res) => {
      let stationId = req.query.stationId;
      CurrentStatus(req, res, stationId);
    });
  }
}

module.exports = new PVRoute().router;
