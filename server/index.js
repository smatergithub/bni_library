const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const httpLogger = require('./middelwares/httpLogger');
const logger = require('./utils/logger');

// const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

global.__basedir = __dirname + '/..';
global.__locationdir = __dirname;

var UserRoute = require('./routes/UserRoute');
var AdminRoute = require('./routes/AdminRoute');
// var corsOptions = {
//   origin: 'http://localhost:3001',
// };

const app = express();

// app.use(cookieParser());
app.use(cors());
// app.use(httpLogger);
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', UserRoute);
app.use('/api/admin/', AdminRoute);
app.use('/img/', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'react', 'build')));

app.get('*', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '..', 'react', 'build', 'index.html'))
);

const port = process.env.PORT_BACKEND;

const urlCertificate = '../../../cert_ssl/'

if (process.env.NODE_ENV === 'production') {
  var https_options = {
    key: fs.readFileSync(`${urlCertificate}bnicorpu.key`, 'utf8'),
    cert: fs.readFileSync(`${urlCertificate}bnicorpu.crt`, 'utf8'),
    ca: [
      fs.readFileSync(`${urlCertificate}bnicorpu.ca`, 'utf8'),
      fs.readFileSync(`${urlCertificate}AAA_Certificate_Services.crt`, 'utf8'),
    ],
  };
  let srvr = https.createServer(https_options, app);
  srvr.listen(port);
  srvr.timeout = 0;
  console.log(`Server listening on port ${port}`);
  //console.log('Server TimeOut', srvr.timeout);
  //https.createServer(https_options, app).listen(port);
} else {
  // let srvr = app.listen(port);
  // srvr.timeout = 0;
  // console.log(srvr.timeout);
  app.listen(port, function (req) {
    console.log(`Server listening on port ${port}`);
  });
}
