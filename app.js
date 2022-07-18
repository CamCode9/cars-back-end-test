const express = require('express');
const db = require('./db/index');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cars', (req, res) => {
  return db.query(`SELECT * FROM cars`).then((result) => {
    res.status(200).send(result.rows);
  });
});

app.listen(9090, () => {
  console.log(`Server is listening on port 9090...`);
});

module.exports = app;
