const csv = require('csvtojson');
var fs = require('fs');
var csvFilePath = './public/locales/locales.csv';

var labels_en = {};
var labels_th = {};
var menu_en = {};
var menu_th = {};
var validation_en = {};
var validation_th = {};

csv()
  .fromFile(csvFilePath)
  .then((data) => {
    data.forEach(data => {
      if (data['type'].toLowerCase() === 'labels') {
        labels_en[`${data['key']}`] = data['en'];
        labels_th[`${data['key']}`] = data['th'];
      } else if (data['type'].toLowerCase() === 'menu') {
        menu_en[`${data['key']}`] = data['en'];
        menu_th[`${data['key']}`] = data['th'];
      } else if (data['type'].toLowerCase() === 'validation') {
        validation_en[`${data['key']}`] = data['en'];
        validation_th[`${data['key']}`] = data['th'];
      }
    });

    fs.writeFileSync('./public/locales/en/labels.json', JSON.stringify(labels_en, null, 4));
    fs.writeFileSync('./public/locales/th/labels.json', JSON.stringify(labels_th, null, 4));
    fs.writeFileSync('./public/locales/en/menu.json', JSON.stringify(menu_en, null, 4));
    fs.writeFileSync('./public/locales/th/menu.json', JSON.stringify(menu_th, null, 4));
    fs.writeFileSync('./public/locales/en/validation.json', JSON.stringify(validation_en), null, 4);
    fs.writeFileSync('./public/locales/th/validation.json', JSON.stringify(validation_th, null, 4));
  });

