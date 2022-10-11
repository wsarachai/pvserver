const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const getEnvs = (envs) => {
  const cwd = process.cwd();
  return [
    '.env.local',
    ...envs.map(env => `.env.${env}.local`),
    '.env',
    ...envs.map(env => `.env.${env}`),
  ]
    .map(fileName => path.resolve(cwd, fileName))
    .filter(filePath => fs.existsSync(filePath))
    .reduce((settings, path) => {
      const foundSettings = dotenv.config({ path });
      if (foundSettings.error) throw foundSettings.error;
      return { ...settings, ...foundSettings.parsed };
    }, {})
}

module.exports = getEnvs;
