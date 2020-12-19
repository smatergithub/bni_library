const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

//update  08:12

global.__basedir = __dirname + '/..';

global.__locationdir = __dirname;

var UserRoute = require('./routes/UserRoute');
var AdminRoute = require('./routes/AdminRoute');
var corsOptions = {
  origin: 'http://localhost:3001',
};

const app = express();

// app.use(cookieParser());
app.use(cors(corsOptions));
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
var db = require('./models');
db.sequelize.sync().then(function() {
  // console.log('database connection success');
});
if (process.env.NODE_ENV === 'production') {
  var https_options = {
    key: fs.readFileSync('./security/ssl/bnicorpu.key', 'utf8'),
    cert: fs.readFileSync('./security/ssl/bnicorpu.crt', 'utf8'),
    ca: [
      fs.readFileSync('./security/ssl/bnicorpu.ca', 'utf8'),
      fs.readFileSync('./security/ssl/AAA_Certificate_Services.crt', 'utf8'),
    ],
  };
  https.createServer(https_options, app).listen(port);
} else
  app.listen(port, function() {
    console.log(`Server running in PORT: ${port}`);
  });
{
}
