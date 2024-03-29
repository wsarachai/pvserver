module.exports = {
  apps : [{
    name: 'pvserver',
    script: 'npm start --prefix /home/keng/Documents/workspace/pvserver',
    watch: '/home/keng/Documents/workspace/pvserver',
    max_memory_restart: "900M",
    error_file: "/dev/null",
    env: {
      "NODE_ENV": "development",
      "PORT": "3000",
      "LOG_LEVEL": "verbose",
      "LOG_FILE":"/home/keng/tmp/logs/pvserver.log",
      "MOCK_UP_DATA": "false",
      "PVSYSTEM_ROOT": "/home/keng/Documents/workspace/pv-web-server/build",
      "DB_USER": "pvuser",
      "DB_PASSWORD": "1234",
      "DB_DATABASENAME": "pvdb",
      "CO2AVOIDED_VALUE": "0.440",
      "PV_SYSTEM_POWER_YOTSUK": "302080",
      "PV_SYSTEM_POWER_REW_A": "100800",
      "PV_SYSTEM_POWER_REW_B": "208600",
      "PV_LOCATION_YOTSUK": "https://goo.gl/maps/gWCkN2AaDC65GSqdA",
      "PV_LOCATION_REW": "https://goo.gl/maps/sPoSabDpenE56SrP6",
      "COMMISSIONING_YOTSUK": "6/21/2020",
      "COMMISSIONING_REW": "9/1/2020"
    }
  }]
};
