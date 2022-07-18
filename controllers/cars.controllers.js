const {
  selectAllCars,
  selectCarById,
  addCar,
} = require('../models/cars.models');

exports.getCars = async (req, res, next) => {
  try {
    const result = await selectAllCars();
    res.status(200).send({ cars: result });
  } catch (err) {
    next(err);
  }
};

exports.getCarById = async (req, res, next) => {
  try {
    const { car_id } = req.params;
    const result = await selectCarById(car_id);
    res.status(200).send({ car: result });
  } catch (err) {
    next(err);
  }
};

exports.postCar = async (req, res, next) => {
  try {
    const body = req.body;
    const result = await addCar(body);

    res.status(201).send({ new_car: result });
  } catch (err) {
    next(err);
  }
};
