const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/routes');
var corsOptions = {
  origin: 'http://localhost:2001',
};

const app = express();
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', indexRouter);

app.use(express.static(path.join(__dirname, '..', 'react', 'build')));


app.get('*', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '..', 'react', 'build', 'index.html'))
);

var db = require('./models');
db.sequelize.sync().then(function () {
  console.log('database connection success');
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, function () {
  console.log(`Server running in PORT: ${PORT}`);
});
