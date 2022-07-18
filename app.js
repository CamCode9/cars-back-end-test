const express = require('express');
const db = require('./db/index');
const { getCars } = require('./controllers/cars.controllers');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cars', getCars);

/////////////////////////ERRORS BELOW/////////////////////////////

//handle psql err
app.use((err, req, res, next) => {
  const badReqCodes = ['22P02'];
  if (badReqCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
});

// handle custom err
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

//handle any invalid/unspecified path
app.all('/*', (req, res, next) => {
  res.status(400).send({ msg: 'Bad request' });
});

// handle unexpected errors
app.use((err, req, res, next) => {
  console.log(err, '<< UNEXPECTED ERROR');
  res.status(500).send({ msg: 'Internal server error' });
});

app.listen(9090, () => {
  console.log(`Server is listening on port 9090...`);
});

module.exports = app;
