const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, '..', 'react', 'build')));

app.get('*', (req, res) =>
  res
    .status(200)
    .sendFile(
      path.join(__dirname, '..', 'react', 'build', 'index.html')
    )
);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`));
