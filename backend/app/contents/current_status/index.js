/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const asyncHandler = require('express-async-handler');
const {
  getDevices,
  getCurrentPVPowerInterface
} = require('../api_interface');
const {
  toFixed,
  safeAdd,
  getLocalTime
} = require('../index');
const logger = require('../../../middleware/winston/config');


const FeedInStatus = {
  None: "none",
  Home: "home",
  Battery: "battery",
  HomeBattery: "home-battery"
}

const HomeConsumptionStatus = {
  None: "none",
  FeedIn: "feed-in"
}

const HomeConsumptionSource = {
  PVSystem: "pv-system",
  Battery: "battery"
}

const GridLineStatus = {
  Demand: "demand",
  FeedIn: "feed-in"
}

const _getPVFeedInStatus = (pvFeedInPower) => {
  if (pvFeedInPower > 0) {
    return FeedInStatus.Home;
  }
  return FeedInStatus.None;
};

const _getGridStatus = (grid_feed_in) => {
  if (grid_feed_in > 0) {
    return GridLineStatus.FeedIn;
  }
  return GridLineStatus.Demand;
};

const _getHomeStatus = (grid_feed_in) => {
  if (grid_feed_in > 0) {
    return HomeConsumptionStatus.FeedIn;
  }
  return HomeConsumptionStatus.None;
};

const convertKValue = (power) => {
  if (power >= 1000) {
    return toFixed(power / 1000);
  }
  return toFixed(power);
};

const getUnit = (power) => {
  return (power >= 1000) ? "kW" : "W";
};

const getPVStatus = (current) => {
  //let pvFeedInPower = current.internal_power_supply;
  let pvFeedInPower = current.current_power;
  let external_energy_supply = current.external_energy_supply;
  let total_consumption = current.current_value_of_consumption;

  if (external_energy_supply <= 0) {
    external_energy_supply = current.grid_feed_in;
  }

  let pvFeedInStatus = {
    "power": convertKValue(pvFeedInPower),
    "unit": getUnit(pvFeedInPower),
    "status": _getPVFeedInStatus(pvFeedInPower)
  };

  let gridLineStatus = {
    "power": convertKValue(external_energy_supply),
    "unit": getUnit(external_energy_supply),
    "status": _getGridStatus(current.grid_feed_in)
  };

  let homeConsumptionStatus = {
    "total_consumption": convertKValue(total_consumption),
    "pv_feed_in": convertKValue(pvFeedInPower),
    "unit": getUnit(total_consumption),
    "status": _getHomeStatus(current.grid_feed_in),
    "source": HomeConsumptionSource.PVSystem
  };

  return {
    "pvFeedInStatus": pvFeedInStatus,
    "homeConsumptionStatus": homeConsumptionStatus,
    "gridLineStatus": gridLineStatus
  };
};


const getBatteryStatus = (current) => {
  return {
    "charging": 0,
    "state_of_charging": 0,
    "unit": "W",
    "status": "none",
    "level": 0,
  };
};


const getQuoteStatus = (current) => {
  let self_suff = current.internal_power_supply / current.current_value_of_consumption * 100;
  let self_cons = current.grid_feed_in / current.current_power * 100;
  return {
    "selfSufficiency": {
      "now": toFixed(self_suff)
    },
    "selfConsumption": {
      "now": toFixed(self_cons)
    }
  };
};


const fixedTotalCumulativeValue = (totals) => {
  if (totals.grid_feed_in > totals.external_energy_supply) {
    totals.grid_feed_in -= totals.external_energy_supply;
    totals.external_energy_supply = 0;
  } else {
    totals.external_energy_supply -= totals.grid_feed_in;
    totals.grid_feed_in = 0;
  }
  totals.internal_power_supply = totals.current_power - totals.grid_feed_in;
};


const CurrentStatus = asyncHandler(async (req, res, stationId) => {
  let today  = new Date();
  let cache = req.cache;
  let cacheKey = `CurrentStatus_${stationId}`;
  let currentStatus = cache.get(cacheKey);
  if (currentStatus == undefined) {
    let status = "ok";
    let devices = await getDevices(stationId);
    let current = await getCurrentPVPowerInterface(stationId);
    
    currentStatus = {};

    if (!req.session.currentStatus) {
      req.session.currentStatus = {};
    }

    let totals = {
      "current_power": 0,
      "external_energy_supply": 0,
      "current_value_of_consumption": 0,
      "internal_power_supply": 0,
      "grid_feed_in": 0,
    };

    let keys = Object.keys(devices);
    for (let i=0; i<keys.length; i++) {
      let device = devices[keys[i]];
      let curr = current[device.name];
      let _pvStatus = getPVStatus(curr);
      let _batteryStatus = getBatteryStatus(curr);
      let _quoteStatus = getQuoteStatus(curr);
      currentStatus[device.name] = {
        "status": status,
        "pvStatus": _pvStatus,
        "batteryStatus": _batteryStatus,
        "quoteStatus": _quoteStatus
      };
      totals.current_power = safeAdd(totals.current_power, curr.current_power);
      totals.external_energy_supply = safeAdd(totals.external_energy_supply, curr.external_energy_supply);
      totals.current_value_of_consumption = safeAdd(totals.current_value_of_consumption, curr.current_value_of_consumption);
      totals.internal_power_supply = safeAdd(totals.internal_power_supply, curr.internal_power_supply);
      totals.grid_feed_in = safeAdd(totals.grid_feed_in, curr.grid_feed_in);
    }

    fixedTotalCumulativeValue(totals);
    currentStatus['Totals'] = {
      "status": status,
      "pvStatus": getPVStatus(totals),
      "batteryStatus": getBatteryStatus(totals),
      "quoteStatus": getQuoteStatus(totals)
    };

    if (cache.set(cacheKey, currentStatus, 30 )) {
      logger.info(`[${cacheKey}] cache successfully.`)
    }
  }
  currentStatus['time'] = getLocalTime(today);
  res.json(currentStatus);
  req.session.currentStatus = currentStatus;
});


module.exports = CurrentStatus;
