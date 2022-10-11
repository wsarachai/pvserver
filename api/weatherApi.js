const request = require('request');

const WEATHER_KEY = "api/WEATHER_KEY";

const fetchWeatherData = () => {
  let promise = new Promise(function (resolve, reject) {
    request({
      //url: 'http://api.openweathermap.org/data/2.5/weather?id=1153671&APPID=0819004d5d111c6827274ee2ef9efa22&units=Metric&lang=th',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=18.899270&lon=99.012103&APPID=0819004d5d111c6827274ee2ef9efa22&units=Metric&lang=th',
      json: true
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject('unable to fetch weather');
      }
    });
  });
  return promise;
};

module.exports = {
  WEATHER_KEY,
  fetchWeatherData
}