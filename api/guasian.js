/*******************************************************
 * Copyright (C) 2019-2020 Mr.Watcharin Sarachai <sarachaii@gmail.com>
 * 
 * This file is part of PV-System Monitoring.
 * 
 * PV-System Monitoring can not be copied and/or distributed without the express
 * permission of Mr.Watcharin Sarachai
 *******************************************************/
function guasian(x, mean = 0.0, variance = 0.5) {
  var standard_deviation = Math.sqrt(variance);
  var m = standard_deviation * Math.sqrt(2 * Math.PI);
  var e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  return e / m;
}

function time(HH, mm, ss) {
  return (HH * 60 * 60) + (mm * 60) + ss;
}

function time_s(d) {
  var HH = d.getHours();
  var mm = d.getMinutes();
  var ss = d.getSeconds();
  return time(HH, mm, ss);
}


class Guasian {

  constructor() {
  }

  uniform(min, max) {
    var range = max - min;
    return parseFloat(((Math.random() * range) + min).toFixed(2));
  }

  get_generation_by_time(t, max = 60000) {
    var val = 0.0;
    var base = 0.0;
    if (time_s(t) >= time(6, 30, 0) && time_s(t) < time(18, 30, 0)) {
      var range = (time(18, 30, 0) - time(6, 30, 0)) / 60;
      var half_range = range / 2;
      var diff = (time_s(t) - time(6, 30, 0)) / 60;
      var pt_range = diff - half_range;
      var v = max * guasian(pt_range / half_range, 0.3);
      val = base + v + this.uniform(0, 20);
    } else {
      val = 0.0
    }
    return parseFloat(val.toFixed(2));
  }

  get_internal_power_supply_by_time(t, max = 50000) {
    var val = 0.0;
    var base = 7.5;
    if (time_s(t) >= time(6, 30, 0) && time_s(t) < time(8, 30, 0)) {
      val = 0;
    } else if ((time_s(t) >= time(8, 30, 0) && time_s(t) < time(13, 0, 0))) {
      var range = (time(13, 0, 0) - time(8, 30, 0)) / 60;
      var half_range = range / 2;
      var diff = (time_s(t) - time(8, 30, 0)) / 60;
      var pt_range = diff - half_range
      var v = max * guasian(pt_range / half_range)
      val = base + v + this.uniform(-2, 2)
    } else if ((time_s(t) >= time(13, 0, 0) && time_s(t) < time(18, 0, 0))) {
      var range = (time(18, 0, 0) - time(13, 0, 0)) / 60;
      var half_range = range / 2
      var diff = (time_s(t) - time(13, 0, 0)) / 60;
      var pt_range = diff - half_range;
      var v = max * guasian(pt_range / half_range);
      val = base + v + this.uniform(-2, 2);
    } else if ((time_s(t) >= time(18, 0, 0) && time_s(t) < time(24, 0, 0))) {
      val = 0;
    } else if ((time_s(t) >= time(24, 0, 0) && time_s(t) < time(6, 30, 0))) {
      val = 0;
    } else {
      val = 0;
    }

    return parseFloat(val.toFixed(2))
  }

  get_self_consumption_by_time(t, max = 50000) {
    var val = 0.0;
    var base = 7.5;
    if (time_s(t) >= time(6, 30, 0) && time_s(t) < time(8, 30, 0)) {
      val = 0;
    } else if ((time_s(t) >= time(8, 30, 0) && time_s(t) < time(13, 0, 0))) {
      var range = (time(13, 0, 0) - time(8, 30, 0)) / 60;
      var half_range = range / 2;
      var diff = (time_s(t) - time(8, 30, 0)) / 60;
      var pt_range = diff - half_range
      var v = max * guasian(pt_range / half_range)
      val = base + v + this.uniform(-2, 2)
    } else if ((time_s(t) >= time(13, 0, 0) && time_s(t) < time(18, 0, 0))) {
      var range = (time(18, 0, 0) - time(13, 0, 0)) / 60;
      var half_range = range / 2
      var diff = (time_s(t) - time(13, 0, 0)) / 60;
      var pt_range = diff - half_range;
      var v = max * guasian(pt_range / half_range);
      val = base + v + this.uniform(-2, 2);
    } else if ((time_s(t) >= time(18, 0, 0) && time_s(t) < time(24, 0, 0))) {
      val = 0;
    } else if ((time_s(t) >= time(24, 0, 0) && time_s(t) < time(6, 30, 0))) {
      val = 0;
    } else {
      val = 0;
    }

    return parseFloat(val.toFixed(2))
  }

  get_consumtion_by_time(t, max = 50000) {
    var val = 0.0;
    var base = 7.5;
    if (time_s(t) >= time(6, 30, 0) && time_s(t) < time(8, 30, 0)) {
      val = 20 + this.uniform(-2, 2);
    } else if ((time_s(t) >= time(8, 30, 0) && time_s(t) < time(13, 0, 0))) {
      var range = (time(13, 0, 0) - time(8, 30, 0)) / 60;
      var half_range = range / 2;
      var diff = (time_s(t) - time(8, 30, 0)) / 60;
      var pt_range = diff - half_range
      var v = max * guasian(pt_range / half_range)
      val = base + v + this.uniform(-2, 2)
    } else if ((time_s(t) >= time(13, 0, 0) && time_s(t) < time(18, 0, 0))) {
      var range = (time(18, 0, 0) - time(13, 0, 0)) / 60;
      var half_range = range / 2
      var diff = (time_s(t) - time(13, 0, 0)) / 60;
      var pt_range = diff - half_range;
      var v = max * guasian(pt_range / half_range);
      val = base + v + this.uniform(-2, 2);
    } else if ((time_s(t) >= time(18, 0, 0) && time_s(t) < time(24, 0, 0))) {
      val = 6000 + this.uniform(0, 500);
    } else if ((time_s(t) >= time(24, 0, 0) && time_s(t) < time(6, 30, 0))) {
      val = 4000 + this.uniform(0, 500);
    } else {
      val = this.uniform(-1, 1);
    }

    var generate_val = this.get_generation_by_time(t);
    if (val < generate_val) {
      val = generate_val + this.uniform(2, 5);
    }
    return parseFloat(val.toFixed(2))
  }
}

const _guasian = new Guasian();

module.exports = _guasian;
