const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

global.__basedir = __dirname + '/..';

var UserRoute = require('./routes/UserRoute');
var AdminRoute = require('./routes/AdminRoute');
var corsOptions = {
  origin: 'http://localhost:2001',
};

const app = express();
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', UserRoute);
app.use('/api/admin/', AdminRoute);
app.use('/img', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '..', 'react', 'build')));

app.get('/', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '..', 'react', 'build', 'index.html'))
);

var db = require('./models');
db.sequelize.sync().then(function() {
  // console.log('database connection success');
});

const port = process.env.PORT_BACKEND;
app.listen(port, function() {
  console.log(`Server running in PORT: ${port}`);
});
