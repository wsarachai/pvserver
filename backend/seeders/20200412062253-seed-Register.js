'use strict';
const Register = require('../models/register');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Registers', [{
      register_number: 30193,
      description: 'UTC system time, in s',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 0.001,
      format: 'DT',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30513,
      description: 'Total energy fed in across all line conductors, in Wh (accumulated values of the inverters)',
      number_of_word: 4,
      data_type: 'U64',
      unit_scale: 1000000,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30517,
      description: 'Energy fed in on current day across all line conduc-tors, in Wh (accumulated values of the inverters)',
      number_of_word: 4,
      data_type: 'U64',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30775,
      description: 'Current active power on all line conductors (W), accumulated values of the inverters',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30805,
      description: 'Reactive power across all line conductors (VAr) (accumulated values of the inverters)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31235,
      description: 'Active power setpoint Digital I/O in %',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31237,
      description: 'Active power setpoint Analog input in %',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31239,
      description: 'Active power setpoint in %s Specification Modbus Electric utility company',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31241,
      description: 'Active power setpoint in %s Specification Modbus Direct marketing',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31243,
      description: 'Resulting setpoint in % (minimum value definition of all specifications)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31249,
      description: 'Current utility grid export active power P in W (actual value of the active power fed in at the grid-connection point; measured with an external measuring device).',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31251,
      description: 'Current utility grid export reactive power Q in VAr (actual value of the reactive power fed in at the grid-connection point; measured with an external measur-ing device).',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34609,
      description: 'Ambient temperature (°C)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34611,
      description: 'Highest measured ambient temperature (°C)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34613,
      description: 'Total irradiation on the sensor surface (W/m²)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34615,
      description: 'Wind speed (m/s)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX1',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34617,
      description: 'Humidity (%)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34619,
      description: 'Air pressure (Pa)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34621,
      description: 'PV module temperature (°C)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34623,
      description: 'Total irradiation on the external irradiation sen-sor/pyranometer (W/m²)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34625,
      description: 'Ambient temperature (°F)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34627,
      description: 'Ambient temperature (K)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34629,
      description: 'PV module temperature (°F)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34631,
      description: 'PV module temperature (K)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34633,
      description: 'Wind speed (km/h)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX1',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34635,
      description: 'Wind speed (mph)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX1',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34637,
      description: 'Analog current input 1 (mA)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34639,
      description: 'Analog current input 2 (mA)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34641,
      description: 'Analog current input 3 (mA)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34643,
      description: 'Analog current input 4 (mA)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34645,
      description: 'Analog voltage input 1 (V)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34647,
      description: 'Analog voltage input 2 (V)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34649,
      description: 'Analog voltage input 3 (V)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34651,
      description: 'Analog voltage input 4 (V)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34653,
      description: 'Digital input group 1, coded as status:\n311 = Open\n2055 = DI1\n2056 = DI1 DI2\n2057 = DI1 DI2 DI3\n2058= DI1 DI2 DI3 DI4\n2059 = DI1 DI2 DI4\n2060 = DI1 DI3\n2061 = DI1 DI3 DI4\n2062 = DI1 DI4\n2063 = DI2\n2064 = DI2 DI3\n2065 = DI2 DI3 DI4\n2066 = DI2 DI4\n2067 = DI3\n2068 = DI3 DI4\n2069 = DI4',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'ENUM',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34655,
      description: 'Digital input group 2, coded as status:\n311 = Open\n2070 = DI5\n2071 = DI5 DI6\n2072 = DI5 DI6 DI7\n2073 = DI5 DI6 DI7 DI8\n2074 = DI5 DI6 DI8\n2075 = DI5 DI7\n2076 = DI5 DI7 DI8\n2077 = DI5 DI8\n2078 = DI6\n2079 = DI6 DI7\n2080 = DI6 DI7 DI8\n2081 = DI6 DI8\n2082 = DI7\n2083 = DI7 DI8\n2084 = DI8',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'ENUM',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 40001,
      description: 'Reading and setting the UTC system time (s)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'DT',
      Access: 'RW',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 40003,
      description: 'Reading and setting the time zone',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'ENUM',
      Access: 'RW',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 40005,
      description: 'Automatic daylight saving time conversion active:\n1129 = Active\n1130 = Not active',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'ENUM',
      Access: 'RW',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 40493,
      description: 'Direct marketer:\nActive power setpoint P, in % of the maximum active power (PMAX) of the PV plant. Value range:\n-100.00% to < 0% = Load\n0% = No active power\n< 0% to +100.00% = Generator',
      number_of_word: 1,
      data_type: 'S16',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'WO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 41167,
      description: 'Active power setpoint in % (manual specification)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 1,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},{
      register_number: 30193,
      description: 'UTC system time, in s',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: .001,
      format: 'DT',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30233,
      description: 'Accumulated connected power of the PV inverter (W)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30513,
      description: 'Total energy fed in on all line conductors (Wh)',
      number_of_word: 4,
      data_type: 'U64',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30775,
      description: 'Current PV feed-in active power on all line conductors (W)',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 30805,
      description: 'Reactive power on all line conductors (VAr) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31235,
      description: 'Power limitation via digital input (%) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31239,
      description: 'PV power limitation via communication (%) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31241,
      description: 'PV power limitation via communication for direct marketing (%)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31243,
      description: 'Minimum PV power limitation (%) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31245,
      description: 'Internal PV power limitation (%) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31249,
      description: 'Active power of system at PCC (W) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 31251,
      description: 'Reactive power of system at PCC (VAr) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 32185,
      description: 'Internal PV reactive power limitation (%) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34609,
      description: 'Ambient temperature (°C) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34615,
      description: 'Global wind speed (m/s) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34621,
      description: 'PV module temperature (°C) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34623,
      description: 'Total irradiation on the external irradiation sensor/pyranometer (W/m²)',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX0',
      Access: 'RO',
      device_type_id: 2,
      flag: 1,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34625,
      description: 'Ambient temperature (°F) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34627,
      description: 'Ambient temperature (K) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34629,
      description: 'PV module temperature (°F) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34631,
      description: 'PV module temperature (K) ',
      number_of_word: 2,
      data_type: 'S32',
      unit_scale: 1,
      format: 'TEMP',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34633,
      description: 'Global wind speed (km/h) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX1',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34635,
      description: 'Global wind speed (mph) ',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX1',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 34653,
      description: 'Digital input group 1, coded as status:\n311 = Open\n2055 = DI1\n2056 = DI1 DI2\n2057 = DI1 DI2 DI3\n2058 = DI1 DI2 DI3 DI4\n2059 = DI1 DI2 DI4\n2060 = DI1 DI3\n2061 = DI1 DI3 DI4\n2062 = DI1 DI4\n2063 = DI2\n2064 = DI2 DI3\n2065 = DI2 DI3 DI4\n2066 = DI2 DI4\n2067 = DI3\n2068 = DI3 DI4\n2069 = DI4',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'ENUM',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 40493,
      description: 'Direct marketer: Active power setpoint P, in % of the maximum active power (PMAX) of the PV plant. Value range:\n-100% to -1% = load\n0% = no active power',
      number_of_word: 1,
      data_type: 'S16',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RW',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
},
{
      register_number: 41167,
      description: 'Manually set active power limit for the entire system (%)\n< 0% to 100% = generator',
      number_of_word: 2,
      data_type: 'U32',
      unit_scale: 1,
      format: 'FIX2',
      Access: 'RO',
      device_type_id: 2,
      flag: 0,
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10)
}], {
      include: [
            {
                  association: Register.PVDevicesType
            }
      ]
});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Registers', null, {});
  }
};
