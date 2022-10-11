/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const assert = require('assert');
const asyncHandler = require('express-async-handler');
const db = require('../../../../models');
const {
  findMaxValue,
  get_time_label,
  safeAdd,
  getLocalTime
} = require('../../index');

const Currents = asyncHandler(async (req, res, key, stationId) => {
  const t = new Date();
  const _10sec = 1000 * 10;
  const _5min = 1000 * 60 * 5;
  const len_of_5min = _5min / (1000 * 10);
  const mins_mod = Math.floor((t.getTime() % _10sec) / 1000) * 1000;
  let startDate = new Date(t.getTime() - mins_mod);
  const cur_times = get_time_label(startDate);

  try {
    let station = await db.PVStation.findByPk(stationId, {
      include: [
        {
          model: db.PVDevice,
          include: {
            model: db.Current, // Find latest 30 records
            order: [
              ['createdAt', 'DESC']
            ],
            limit: len_of_5min
          }
        }
      ]
    });


    if (!req.session.current) {
      req.session.current = {};
    }

    /*
    * Create a current value array of consumtions and generations
    * according to current time and save in session.
    * The size of array is the number of minute of 10 minute.
    * Fill in only the time in each minute from startDate.
    */
    if (!req.session.current[key]) {
      let consumptions = [];
      let generations = [];
      let st = new Date(startDate);
      for (i = 0; i < len_of_5min; i++) {
        let times = get_time_label(st);
        consumptions.push({ 'name': times });
        generations.push({ 'name': times });
        st = new Date(st.getTime() + _10sec);
      }
      req.session.current[key] = {
        'consumptions': consumptions,
        'generations': generations
      }
    }

    let buffCur = req.session.current[key];

    /*
    * Make sure the values are corrected.
    */
    assert(req.session.current[key].consumptions !== undefined);
    assert(req.session.current[key].generations !== undefined);
    assert(req.session.current[key].consumptions.length == len_of_5min);
    assert(req.session.current[key].consumptions.length == req.session.current[key].generations.length);


    if (station.PVDevices.length > 0) {
      let found = false;
      let cur = {};
      let device;

      for (device of station.PVDevices) {
        if (key === 'Totals') {
          _cur = device.Currents[0];
          cur.current_value_of_consumption = safeAdd(cur.current_value_of_consumption, _cur.current_value_of_consumption);
          cur.external_energy_supply = safeAdd(cur.external_energy_supply, _cur.external_energy_supply);
          cur.internal_power_supply = safeAdd(cur.internal_power_supply, _cur.internal_power_supply);
          cur.current_power = safeAdd(cur.current_power, _cur.current_power);
          cur.self_consumption = safeAdd(cur.self_consumption, _cur.self_consumption);
          cur.grid_feed_in = safeAdd(cur.grid_feed_in, _cur.grid_feed_in);
        }
        else if (device.name === key) {
          cur = device.Currents[0];
          break;
        }
      }

      // Fixed cumulative sum during sum amoung device
      if (cur.grid_feed_in > cur.external_energy_supply) {
        cur.grid_feed_in -= cur.external_energy_supply;
        cur.external_energy_supply = 0;
      } else {
        cur.external_energy_supply -= cur.grid_feed_in;
        cur.grid_feed_in = 0;
      }
      cur.internal_power_supply = cur.current_power - cur.grid_feed_in;

      // Fill-in the current data
      buffCur.stationId = stationId;
      buffCur.currentValueOfConsumption = Math.round(cur.current_value_of_consumption);
      buffCur.externalEnergySupply = Math.round(cur.external_energy_supply);
      buffCur.internalEnergySupply = Math.round(cur.internal_power_supply);
      buffCur.currentPower = Math.round(cur.current_power);
      buffCur.selfConsumption = Math.round(cur.self_consumption);
      buffCur.gridFeedIn = Math.round(cur.grid_feed_in);

      // Assign the data to current time
      let i = 0;
      for (; i < buffCur.consumptions.length; i++) {
        let cmpt = buffCur.consumptions[i];
        let gnat = buffCur.generations[i];
        if (cmpt.name === cur_times) {
          cmpt.EES = Math.round(cur.external_energy_supply);
          cmpt.IPS = Math.round(cur.internal_power_supply);
          gnat.SC = Math.round(cur.self_consumption);
          gnat.GFI = Math.round(cur.grid_feed_in);
          foundIdx = i;
          found = true;
          break;
        }
      }

      /*
       * Due to refresh the time, the previous data may be blank.
       * So, we need to fill it back.
       */

      i = i - 1;
      for (let j = 1;
        i >= 0 && j < device.Currents.length;
        i--, j++) {
        let cmpt = buffCur.consumptions[i];
        let gnat = buffCur.generations[i];
        let wback = device.Currents[j];
        if (!cmpt.EES) {
          cmpt.EES = Math.round(wback.external_energy_supply);
          cmpt.IPS = Math.round(wback.internal_power_supply);
          gnat.SC = Math.round(wback.self_consumption);
          gnat.GFI = Math.round(wback.grid_feed_in);
        }
      }

      /*
       * If they are no space to fill the current data.
       * Push the current data at the last position,
       * and shift oldest data out.
       */
      if (!found) {
        let newConsumption = {
          'name': cur_times,
          'EES': Math.round(cur.external_energy_supply),
          'IPS': Math.round(cur.internal_power_supply)
        };
        let newGeration = {
          'name': cur_times,
          'SC': Math.round(cur.self_consumption),
          'GFI': Math.round(cur.grid_feed_in)
        };
        buffCur.consumptions.push(newConsumption);
        buffCur.generations.push(newGeration);
        buffCur.consumptions.shift();
        buffCur.generations.shift();
      }
    }

    //logger.log("debug", JSON.stringify(req.session.current, null, 2));
    req.session.current[key].time = getLocalTime(t);
    req.session.current[key].maxValue = findMaxValue(req.session.current[key]);
    res.json(req.session.current[key]);
  } catch (err) {
    res.json({});
  }
});

module.exports = Currents;
