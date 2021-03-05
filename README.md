# E-Library

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Tech

Tech stack that used in this project:

- Express - as backend framework
- React JS - as frontend library
- Redux - as state management
- Tailwind - as css library
- MariaDB - as Database

## Instalation

Make sure you already install Node JS

### Database Configuration:

Follow config file from :
`server/config/config.json`
You can use the information to create a new database for next step

### Create a database

```
CREATE DATABASE YourDatabaseName;
CREATE USER 'YourUser'@localhost IDENTIFIED BY 'YourPassword';
GRANT ALL PRIVILEGES ON *.* TO 'YourUser'@localhost IDENTIFIED BY 'YourPassword';
GRANT ALL PRIVILEGES ON 'YourDatabaseName'.* TO 'YourUser'@localhost;
FLUSH PRIVILEGES;
```

After we've created a database we must install a ORM that support database migration

```sh
$ npm i -s -g sequelize-cli
```

\*Install Backend Packages:

```sh
$ https://github.com/nagacoder/bni_library.git
$ cd bni_library
$ npm install
```

## Run Application

\*Install Frontend Packages and Run Database Migration:

```sh
$ npm run setup-dev
```

```sh
$ npm run dev
```

Backend Only

```sh
$ npm run dev-server
```

Frontend Only

```sh
$ npm run dev-react
```

## Deployment

Create new database for production for example `ebni_production` base on config file from :
`server/config/config.json`

```sh
$ npm install pm2@latest -g
$ npm run setup-prod
$ npm run build-prod-win 'windows server' || npm run build-prod
$ pm2 start  --name "BNI-LIBRARY" run.js
```

Restart Application

```sh
$ pm2 restart BNI-LIBRARY
```

Stop Appilication

```sh
$ pm2 stop BNI-LIBRARY
```

Delete Appilication

```sh
$ pm2 delete BNI-LIBRARY
```
