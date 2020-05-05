const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var corsOptions = {
  origin: 'http://localhost:2001',
};
var db = require('./models');

const app = express();
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ======> do not remove <=======
// app.use(express.static(path.join(__dirname, '..', 'react', 'build')));
app.use('/', indexRouter);
// ======> do not remove <=======
// app.get('*', (req, res) =>
//   res
//     .status(200)
//     .sendFile(
//       path.join(__dirname, '..', 'react', 'build', 'index.html')
//     )
// );

const PORT = process.env.PORT || 2000;
app.listen(PORT, function() {
  db.sequelize.sync();
  console.log(`Server running in PORT: ${PORT}`);
});
