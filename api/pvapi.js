/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/

/*
 * A Maximum System power 
 */
const _MaximumSystemPower = (currents) => {
  currents = currents.value
  let power = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg30233')) {
    power = obj.reg30233;
  }
  return power;
};


/*
 * A real value from PV system
 */
const _realPVPowerGenerated = (currents) => {
  let power = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg30775')) {
    power = obj.reg30775;
  }
  return power;
};


/*
 * Current utility grid export active power P in W
 * (actual value of the active power fed in at the grid-connection point;
 * measured with an external measuring device).
 */
const _realPCCSystem = (currents) => {
  let power = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg31249')) {
    power = obj.reg31249;
  }
  return power;
};


/*
 * Total irradiation on the external irradiation sensor/pyranometer (W/m²)
 *
 */
const _TotalIrradiation = (currents) => {
  let value = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg34623')) {
    value = obj.reg34623;
  }

  return Math.max(0, value);
};


/*
 * PV module temperature (°C)
 */
const _PV_module_temperature = (currents) => {
  let value = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg34621')) {
    value = obj.reg34621;
  }

  return Math.max(0, value);
};

/*
 * PV module temperature (°C)
 */
const _PV_module_ambient = (currents) => {
  let value = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg34609')) {
    value = obj.reg34609;
  }

  return Math.max(0, value);
};

/*
 * Total energy fed in on all line conductors (Wh)
 */
const _total_energy_fed = (currents) => {
  currents = currents.value;
  let value = 0;
  let obj;
  try {
    // try parse stringtify
    obj = JSON.parse(currents);
  } catch (err) {
    // if not, it is a JSON object
    obj = currents;
  }
  if (obj != null && obj.hasOwnProperty('reg30513')) {
    value = obj.reg30513;
  }
  return value;
};


class ModbusAPI {

  constructor() {
  }


  maxinum_system_power(currents) {
    let val = _MaximumSystemPower(currents);
    return val;
  }


  total_energy_fed(currents) {
    let val = _total_energy_fed(currents);
    return val;
  }

  /*
   * The total value of power that the building is used
   * @current_value_of_consumption
   * = @external_energy_supply + @internal_power_supply
   */
  current_value_of_consumption(currents) {
    let eenergy_supply = this.external_energy_supply(currents);
    let ipower_supply = this.internal_power_supply(currents);
    let val = eenergy_supply + ipower_supply;
    return val;
  }


  /*
   * The sum of PV system, including of feed-in grid
   * @current_power
   */
  current_power(currents) {
    let rpgen = _realPVPowerGenerated(currents);
    return rpgen;
  }


  /*
   * The power the the building used from PV only
   * exclude the power from grid.
   * @self-consumption
   */
  self_consumption(currents) {
    let rpgen = _realPVPowerGenerated(currents);
    let gfeed_in = this.grid_feed_in(currents);
    let power = rpgen - gfeed_in;
    return power;
  }


  /*
   * Internal power supply
   * @internal_power_supply = @current_power - @grid_feed_in
   */
  internal_power_supply(currents) {
    let currp = this.current_power(currents);
    let gfeed_in = this.grid_feed_in(currents);
    let power = currp - gfeed_in;
    return power;

    // if (currp >= gfeed_in) {
    //   // Normal situation the value grid-feed-in is less than current power
    //   power = currp - gfeed_in;
    //   g_last_internal_power = power;
    // } else {
    //   // Abnormal situation the grid-feed-in is more than current power.
    //   // This happen when some inverter lack of information
    //   // let last saved instead.
    //   power = g_last_internal_power;
    // }

  }


  /*
   * External supply (Grid)
   * @external_energy_supply
   */
  external_energy_supply(currents) {
    let ppcs = _realPCCSystem(currents);
    let val = Math.max(ppcs, 0);
    return val;
  }


  /*
   * The grid feed in (We generate PV power and feed back to Grid)
   * @grid_feed_in
   */
  grid_feed_in(currents) {
    let rppcs = _realPCCSystem(currents);
    let val = Math.min(rppcs, 0);
    return val * (-1);
  }


  /*
  * Total irradiation on the external irradiation sensor/pyranometer (W/m²)
  *
  */
  total_irradiation(currents) {
    let val = _TotalIrradiation(currents);
    return val;
  }


 /*
  * PV module temperature (°C)
  */
  temperature_measurement(currents) {
    let val = _PV_module_temperature(currents);
    return val/10.0;
  }

 /*
  * PV module ambient temperature (°C)
  */
 ambient_measurement(currents) {
    let val = _PV_module_ambient(currents);
    return val/10.0;
  }

}

let mapi = new ModbusAPI();

module.exports = mapi;
