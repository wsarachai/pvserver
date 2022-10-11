const {
  WEATHER_KEY,
  fetchWeatherData
} = require('../../weatherApi');
const logger = require('../../../middleware/winston/config');

const _do_10MinutesPoolingTask = (cache) => {
  return async () => {
    let w = await fetchWeatherData();
    if (cache.set(WEATHER_KEY, w)) {
      logger.info(`[${WEATHER_KEY}] cache successfully.`);
      logger.info(`Weather data: ${JSON.stringify(w)}`);
    }
  };
}

module.exports = _do_10MinutesPoolingTask;