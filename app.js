const express = require('express');
const db = require('./db/index');
const {
  getCars,
  getCarById,
  postCar,
  deleteCar,
} = require('./controllers/cars.controllers');
const { getApi } = require('./controllers/api.controllers');

const app = express();
app.use(express.json());

app.get('/', getApi);

app.get('/cars', getCars);
app.get('/cars/:car_id', getCarById);

app.post('/cars', postCar);

app.delete('/cars/:car_id', deleteCar);

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
  res.status(500).send({ msg: 'Internal server error' });
});

module.exports = app;
