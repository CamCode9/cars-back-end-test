const express = require('express');
const db = require('./db/index');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(9090, () => {
  console.log(`Server is listening on port 9090...`);
});

module.exports = app;
