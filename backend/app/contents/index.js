/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
const moment = require('moment');

const get_time_label = (d) => {
  let options = {hour12: false}
  return d.toLocaleString('th-TH', options).slice(-8)
};


const format_datetime = (d) => {
  return d.getFullYear().toString() + "-" + ((d.getMonth() + 1).toString().length == 2 ? (d.getMonth() + 1).toString() : "0" + (d.getMonth() + 1).toString()) + "-" + (d.getDate().toString().length == 2 ? d.getDate().toString() : "0" + d.getDate().toString()) + " " + (d.getHours().toString().length == 2 ? d.getHours().toString() : "0" + d.getHours().toString()) + ":" + ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2 ? (parseInt(d.getMinutes() / 5) * 5).toString() : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) + ":00";
};


const get_date_label = (d) => {
  let label = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  return label;
};

const getLocalTime = (d) => {
  const lastUpdateMoment = moment.unix(d.getTime() / 1000);
  return lastUpdateMoment.format('HH:mm:ss');
};


/******************************************************************************
 * The toPaddedZeroString16 function
 *****************************************************************************/
const toPaddedZeroString16 = (num, len) => {
  str = num.toString(16);
  return "0".repeat(len - str.length) + str;
}


/******************************************************************************
 * The hex_format function
 *****************************************************************************/
const hex_format = (values, len) => {
  let out = "["
  values.forEach((value, index, array) => {
    if (index == values.length - 1) {
      out += `0x${toPaddedZeroString16(value, len)}]`;
    } else {
      out += `0x${toPaddedZeroString16(value, len)}, `;
    }
  });
  return out
}


const toFixed = (v, fixed=2) => {
  return parseFloat(parseFloat(v).toFixed(fixed))
}


const safeAdd = (a, b) => {
  a = a ? a : 0;
  b = b ? b : 0;
  return toFixed(parseFloat(a) + parseFloat(b));
}


const scaleToM_unit = (val) => {
  let v = parseFloat((val / 1000000).toFixed(2));
  return v;
};

const findMaxValue = (resObj, ratio = 0.2) => {
  let defaultValue = 1.0;
  let maxConValue = Math.max(...resObj.consumptions.map(e => e.EES == undefined ? defaultValue : e.EES));
  maxConValue = Math.max(maxConValue, Math.max(...resObj.consumptions.map(e => e.IPS == undefined ? defaultValue : e.IPS)));
  let maxGenValue = Math.max(...resObj.generations.map(e => e.SC == undefined ? defaultValue : e.SC));
  maxGenValue = Math.max(maxGenValue, Math.max(...resObj.generations.map(e => e.GFI == undefined ? defaultValue : e.GFI)));
  let sumValue = maxConValue + maxGenValue;
  //let max = Math.round(sumValue + sumValue * ratio);
  let max = toFixed(sumValue + sumValue * ratio);
  return [0, max];
}

module.exports = {
  findMaxValue,
  get_time_label,
  get_date_label,
  format_datetime,
  toPaddedZeroString16,
  hex_format,
  safeAdd,
  toFixed,
  scaleToM_unit,
  getLocalTime
};
