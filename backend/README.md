# Docker

docker build -t wsarachai/pv-backend .
docker run -d --rm -p 3000:3000 --name pv-backend wsarachai/pv-backend

# To use this project add .env file for all

NODE_ENV=development
PORT=3000
LOG_LEVEL=verbose
LOG_FILE=/home/keng/tmp/logs/pvserver.log
MOCK_UP_DATA=false
PVSYSTEM_ROOT=/home/keng/Documents/workspace/pv-web-server/build
DB_USER=pvuser
DB_PASSWORD=1234
DB_DATABASENAME=pvdb
CO2AVOIDED_VALUE=0.440
PV_SYSTEM_POWER_YOTSUK=302080
PV_SYSTEM_POWER_REW_A=100800
PV_SYSTEM_POWER_REW_B=208600
PV_LOCATION_YOTSUK=https://goo.gl/maps/gWCkN2AaDC65GSqdA
PV_LOCATION_REW=https://goo.gl/maps/sPoSabDpenE56SrP6
COMMISSIONING_YOTSUK=6/21/2020
COMMISSIONING_REW=9/1/2020

# ค่าพารามิเตอร์และความหมายที่ใช้

    current_value_of_consumption: หมายถึงค่าพลังงานที่ตึกใช้ทั้งหมดประกอบด้วย external_energy_supply + internal_power_supply
    external_energy_supply: หมายถึงค่าพลังงานที่ตึกใช้จากภายนอกหรือ Grid นั่นเอง
    internal_power_supply: หมายถึงค่าพลังงานที่ตึกใช้จากแผงโซล่า (pv)
    current_power: ค่าพลังงานที่แผงโซล่าผลึตได้ทั้งหมดจะประกอบไปด้วย  internal_power_supply + grid_feed_in
    self_consumption: ค่าพลังงานจากแผงโซล่าที่จ่ายให้กับตึกปกติแล้วจะมีค่าเท่ากับ internal_power_supply
    grid_feed_in: ค่าพลังงานที่จ่ายไปยังภายนอกเช่น Grid

https://linuxhint.com/install_nginx_centos8/

# Start chrome in fullscreen mode

start chrome --start-fullscreen --app=http://10.4.9.19

# PV Server

# Required app

1. nodejs

# Setting up project

npm install --save

#ES6 overview
https://www.taniarascia.com/es6-syntax-and-feature-overview/

# async / await

https://zellwk.com/blog/async-await/
https://zellwk.com/blog/async-await-express/

#redux
https://www.valentinog.com/blog/redux/

# Mobus TCP

https://github.com/Cloud-Automation/node-modbus

# Postgres database

https://www.djamware.com/post/5bb1f05280aca74669894417/node-express-sequelize-and-postgresql-association-example#one-to-many-associations

## Proxy setting for angularcli server

https://github.com/angular/angular-cli/blob/master/docs/documentation/stories/proxy.md

## ORM Sequalize

https://stackabuse.com/using-sequelize-js-and-sqlite-in-an-express-js-app/
https://medium.com/@tonyangelo9707/many-to-many-associations-using-sequelize-941f0b6ac102

## Weather API

https://home.openweathermap.org/api_keys
http://api.openweathermap.org/data/2.5/weather?id=1153671&APPID=0819004d5d111c6827274ee2ef9efa22
http://openweathermap.org/img/w/02d.png

## run server on pi

https://blog.cloudboost.io/how-to-run-a-nodejs-web-server-on-a-raspberry-pi-for-development-3ef9ac0fc02c

## Query method

https://sequelize.org/master/manual/querying.html

$ node_modules/.bin/sequelize init

$ node_modules/.bin/sequelize model:generate --name Permissions --attributes name:string,level:number,title:string,parentId:number
$ node_modules/.bin/sequelize model:generate --name Roles --attributes title:string,isCoreRole:boolean
$ node_modules/.bin/sequelize model:generate --name RolesPermissions --attributes roleId:uuid,permissionId:uuid
$ node_modules/.bin/sequelize model:generate --name Addresses --attributes userId:integer,addressLine:string,city:string,state:string,postCode:string
$ node_modules/.bin/sequelize model:generate --name SocialNetworks --attributes userId:integer,linkedIn:string,facebook:string,twitter:string,instagram:string
$ node_modules/.bin/sequelize model:generate --name Users --attributes username:string,password:string,email:string,accessToken:string,refreshToken:string,pic:string,fullname:string,occupation:string,companyName:string,phone:string
$ node_modules/.bin/sequelize model:generate --name UsersRoles --attributes userId:uuid,roleId:uuid
$ node_modules/.bin/sequelize model:generate --name UsersAddresses --attributes userId:uuid,addressId:uuid

$ node_modules/.bin/sequelize model:generate --name PvDevices --attributes deviceName:string,totalConsumtion:number,purchasedElectricity:number,hasBattery:boolean,powerUnit:string
$ node_modules/.bin/sequelize model:generate --name PvPanel --attributes target:string,generatedPower:number
$ node_modules/.bin/sequelize model:generate --name HomeConsumtion --attributes usage:string,totalConsumed:number,pvFeedInRate:number,gridFeedInRate:number
$ node_modules/.bin/sequelize model:generate --name GridFeeding --attributes target:string,purchasedElectricity:number,shortage:boolean
$ node_modules/.bin/sequelize model:generate --name Battery --attributes status:string,level:number,chargingVal:number,stateOfChargingVal:number,chargingUnit:string
$ node_modules/.bin/sequelize model:generate --name QuotaStuff --attributes unit:string,display:string,pos:number,value:number
$ node_modules/.bin/sequelize model:generate --name RateStuff --attributes unit:string,display:string,pos:number,value:number
$ node_modules/.bin/sequelize model:generate --name DeviceStatus --attributes pvDeviceId:number,pvPanelId:number,homeConsumtionId:number,gridFeedingId:number,batteryId:number,quotaStuffId:number,rateStuffId:number

##

The SQLite database will contain the Permissions table.

$ node_modules/.bin/sequelize db:migrate

##

Checking the database

$ sqlite3 database.sqlite3

sqlite> .headers ON
sqlite> select \* from SequelizeMeta;

##

Now, we have the Permissions model mapped to a database table. We would like to generate a seeder script to pre-populate our database with some data. Generating a seeder script is very similar to the prior commands.

$ node_modules/.bin/sequelize seed:generate --name seed-permissions.js
$ node_modules/.bin/sequelize seed:generate --name seed-roles.js
$ node_modules/.bin/sequelize seed:generate --name seed-rolespermissions.js
$ node_modules/.bin/sequelize seed:generate --name seed-users.js
$ node_modules/.bin/sequelize seed:generate --name seed-addresses.js
$ node_modules/.bin/sequelize seed:generate --name seed-socialnetworks.js
$ node_modules/.bin/sequelize seed:generate --name seed-usersroles.js

##

Run the seeder to populate the database with these initial permissions.

node_modules/.bin/sequelize db:seed:all
node_modules/.bin/sequelize db:seed --seed 20190930043937-seed-permissions.js
node_modules/.bin/sequelize db:seed --seed 20190928162448-seed-roles.js
node_modules/.bin/sequelize db:seed --seed 20190928165604-seed-rolespermissions.js
node_modules/.bin/sequelize db:seed --seed 20190929033141-seed-users.js
node_modules/.bin/sequelize db:seed --seed 20190929033130-seed-addresses.js
node_modules/.bin/sequelize db:seed --seed 20190929033136-seed-socialnetworks.js
node_modules/.bin/sequelize db:seed --seed 20190929033149-seed-usersroles.js
