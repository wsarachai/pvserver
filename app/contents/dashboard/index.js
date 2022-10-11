/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const asyncHandler = require('express-async-handler');
const logger = require('../../../middleware/winston/config');
const {
  getCurrentPVPowerInterface,
  getDailyYieldInterface,
  getTotalPowerInterface,
  getDevices
} = require('../api_interface');
const {
  toFixed,
  safeAdd,
  getLocalTime
} = require('../index');
const {WEATHER_KEY} = require('../../../api/weatherApi');

const getCurrentPVPower = (key, power) => {
  let maxPower = power.current_power;

  if (key === "Yotsuk Building") {
    maxPower = process.env.PV_SYSTEM_POWER_YOTSUK;
  } else if (key === "Building A") {
    maxPower = process.env.PV_SYSTEM_POWER_A;
  } else if (key === "Building B") {
    maxPower = process.env.PV_SYSTEM_POWER_B;
  }

  return {
    "power": toFixed(power.current_power),
    "MaxPower": maxPower
  };
};


const getConsumptionStatus = (internal_power_supply, external_energy_supply) => {
  if (parseFloat(internal_power_supply) > parseFloat(0) && parseFloat(external_energy_supply) > parseFloat(0)) {
    return "pvGrid";
  } else if (parseFloat(internal_power_supply) > parseFloat(0) && parseFloat(external_energy_supply) === parseFloat(0)) {
    return "pv";
  } else if (parseFloat(internal_power_supply) === parseFloat(0) && parseFloat(external_energy_supply) > parseFloat(0)) {
    return "grid";
  }
};


const getCurrentConsumpotion = (power) => {
  return {
    "consumption": toFixed(power.current_value_of_consumption),
    "unit": 'W',
    "status": getConsumptionStatus(power.internal_power_supply, power.external_energy_supply)
  };
};


const getCurrentPVSystemStatus = (power) => {
  return {
    "status": power.current_power > 0 ? true : false
  };
};


const getInverterComparisonStatus = (key) => {
  return {
    "comparisionStatus": "Warning: Unexpected deviation at 4/3/2020"
  };
};


const getPVEnergy = (power, totalPower) => {
  return {
    "energy": {
      "power": toFixed(power),
      "unit": 'W'
    },
    "total": {
      "power": toFixed(totalPower),
      "unit": 'W'
    }
  };
};


const getCo2Avoided = (power, totalPower) => {
  const co2Avoided = process.env.CO2AVOIDED_VALUE || '0.446';
  let todayAvoided = power / 1000.0 * co2Avoided;
  let totalAvoided = totalPower / 1000000.0 * co2Avoided;
  return {
    "avoided": {
      "power": toFixed(todayAvoided),
      "unit": "kg"
    },
    "total": {
      "power": toFixed(totalAvoided),
      "unit": "t"
    }
  };
};


const getWeatherData = (cache) => {
  let defaultVal = {
    "station": 'No Station',
    "status": 'n/a',
    "icon": '',
    "description": ''
  };
  let weatherData = cache.get(WEATHER_KEY);
  if (typeof weatherData !== undefined) {
    try {
      return {
        "station": weatherData.name,
        "status": weatherData.main.temp,
        "icon": weatherData.weather[0].icon,
        "description": weatherData.weather[0].description
      }
    } catch (error) {
      return defaultVal;
    }
  } 
  return defaultVal;
};


const getTemperatureMeasurement = (currents) => {
  return currents.temperature_measurement;
};


const getAmbientTemperature = (currents) => {
  return currents.ambient_temperature;
};


const getTotalIrradiation = (currents) => {
  return currents.total_irradiation;
};


const getPVSystemInformation = (key) => {
  //const pv_system_power = getMaximumSystemPower(currents)/1000.0;
  const pv_system_power_yotsuk = process.env.PV_SYSTEM_POWER_YOTSUK || '0';
  const pv_system_power_a = process.env.PV_SYSTEM_POWER_REW_A || '0';
  const pv_system_power_b = process.env.PV_SYSTEM_POWER_REW_B || '0';
  const commissioning_yotsuk = process.env.COMMISSIONING_YOTSUK || '';
  const commissioning_rew = process.env.COMMISSIONING_REW || '';

  if (key === "Yotsuk Building") {
    pv_system_power = pv_system_power_yotsuk;
    commissioning = commissioning_yotsuk;
  } else if (key == "Building A") {
    pv_system_power = pv_system_power_a;
    commissioning = commissioning_rew;
  } else if (key === "Building B") {
    pv_system_power = pv_system_power_b;
    commissioning = commissioning_rew;
  }

  return {
    "systemPower": toFixed(pv_system_power / 1000, 3),
    "unit": "kWp",
    "commissioning": commissioning
  };
};


const getLocation = (key) => {
  let location = {}

  if (key === "Yotsuk Building") {
    location['station'] = "yotsuk"
    location['map'] = process.env.PV_LOCATION_YOTSUK || "#";
  }
  else {
    location['station'] = key
    location['map'] = process.env.PV_LOCATION_REW || "#";
  }

  return location;
};

const Dashboards = asyncHandler(async (req, res, stationId) => {
  let today = new Date();
  let cache = req.cache;
  let cacheKey = `DashboardsCache_${stationId}`;
  let allObjs = cache.get(cacheKey);
  if (allObjs == undefined) {
    let devices = await getDevices(stationId);
    let currents = await getCurrentPVPowerInterface(stationId);
    let dailyYield = await getDailyYieldInterface(devices);
    let totalPower = await getTotalPowerInterface(stationId, currents);
    let keys = Object.keys(devices);
    
    allObjs = {};

    for (let key of keys) {
      let newObj = {};
      newObj.key = key;
      newObj.currentPvPower = getCurrentPVPower(key, currents[key]);
      newObj.currentConsumption = getCurrentConsumpotion(currents[key]);
      newObj.currentPvSystemStatus = getCurrentPVSystemStatus(currents[key]);
      newObj.inverterComparisonStatus = getInverterComparisonStatus(key);
      newObj.pvEnergy = getPVEnergy(dailyYield[key], totalPower[key]);
      newObj.co2Avoided = getCo2Avoided(dailyYield[key], totalPower[key]);
      newObj.pvSystemInformation = getPVSystemInformation(key);
      newObj.location = getLocation(key);
      newObj.weatherFor = getWeatherData(cache);
      newObj.temperatureMeasurement = getTemperatureMeasurement(currents[key]);
      newObj.ambientTemperature = getAmbientTemperature(currents[key]);
      newObj.total_irradiation = getTotalIrradiation(currents[key]);
      newObj.internal_power_supply = currents[key].internal_power_supply;
      newObj.external_energy_supply = currents[key].external_energy_supply;
      allObjs[key] = newObj;
    };

    let sumObj = {
      "currentPvPower": {
        "unit": 'W'
      },
      "currentConsumption": {
        "unit": 'W'
      },
      "pvSystemInformation": {
        "unit": "kWp"
      },
      "pvEnergy": {
        "energy": {},
        "total": {}
      },
      "co2Avoided": {
        "avoided": {},
        "total": {}
      },
      "currentPvSystemStatus": allObjs[keys[0]].currentPvSystemStatus,
      "inverterComparisonStatus": allObjs[keys[0]].inverterComparisonStatus,
      "weatherFor": allObjs[keys[0]].weatherFor,
      "location": allObjs[keys[0]].location,
      "temperatureMeasurement": allObjs[keys[0]].temperatureMeasurement,
      "ambientTemperature": allObjs[keys[0]].ambientTemperature,
      "total_irradiation": allObjs[keys[0]].total_irradiation
    };
    for (let i = 0; i < keys.length; i++) {
      sumObj.currentPvPower["power"] = safeAdd(sumObj.currentPvPower.power, allObjs[keys[i]].currentPvPower.power);
      sumObj.currentPvPower["MaxPower"] = safeAdd(sumObj.currentPvPower.MaxPower, allObjs[keys[i]].currentPvPower.MaxPower);
      sumObj.currentConsumption["consumption"] = safeAdd(sumObj.currentConsumption.consumption, allObjs[keys[i]].currentConsumption.consumption);
      sumObj.pvSystemInformation["systemPower"] = safeAdd(sumObj.pvSystemInformation.systemPower, allObjs[keys[i]].pvSystemInformation.systemPower);
      sumObj.pvSystemInformation["commissioning"] = allObjs[keys[i]].pvSystemInformation.commissioning;
      sumObj.pvEnergy.energy["power"] = safeAdd(sumObj.pvEnergy.energy.power, allObjs[keys[i]].pvEnergy.energy.power);
      sumObj.pvEnergy.energy["unit"] = allObjs[keys[i]].pvEnergy.energy.unit;
      sumObj.pvEnergy.total["power"] = safeAdd(sumObj.pvEnergy.total.power, allObjs[keys[i]].pvEnergy.total.power);
      sumObj.pvEnergy.total["unit"] = allObjs[keys[i]].pvEnergy.total.unit;
      sumObj.co2Avoided.avoided["power"] = safeAdd(sumObj.co2Avoided.avoided.power, allObjs[keys[i]].co2Avoided.avoided.power);
      sumObj.co2Avoided.avoided["unit"] = allObjs[keys[i]].co2Avoided.avoided.unit;
      sumObj.co2Avoided.total["power"] = safeAdd(sumObj.co2Avoided.total.power, allObjs[keys[i]].co2Avoided.total.power);
      sumObj.co2Avoided.total["unit"] = allObjs[keys[i]].co2Avoided.total.unit;
      sumObj.internal_power_supply = safeAdd(sumObj.internal_power_supply, allObjs[keys[i]].internal_power_supply);
      sumObj.external_energy_supply = safeAdd(sumObj.external_energy_supply, allObjs[keys[i]].external_energy_supply);
      sumObj.location = allObjs[keys[0]].location;
    }

    sumObj.key = 'Totals';
    sumObj.currentConsumption["status"] = getConsumptionStatus(sumObj.internal_power_supply, sumObj.external_energy_supply);
    allObjs['Totals'] = sumObj;
    allObjs['time'] = getLocalTime(today);
    allObjs['status'] = 'ok';
    
    if (cache.set(cacheKey, allObjs, 60 )) {
      logger.info(`[${cacheKey}] cache successfully.`)
    }

    res.json(allObjs);
  } else {
    allObjs['time'] = getLocalTime(today);
    res.json(allObjs);
  }
});


module.exports = Dashboards;
