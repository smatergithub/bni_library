const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express()
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// ======> do not remove <=======
// app.use(express.static(path.join(__dirname, '..', 'react', 'build')));
app.get('/', (req, res) => {

  res.status(200).send({ "message": 'OK' })
})
// ======> do not remove <=======
// app.get('*', (req, res) =>
//   res
//     .status(200)
//     .sendFile(
//       path.join(__dirname, '..', 'react', 'build', 'index.html')
//     )
// );

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`));
