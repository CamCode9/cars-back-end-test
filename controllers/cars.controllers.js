const {
  selectAllCars,
  selectCarById,
  addCar,
  deleteCarById,
} = require('../models/cars.models');

const { checkExists } = require('../helpers/checkExists');
const { checkAge } = require('../helpers/checkAge');

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
    const build_date = body.build_date;

    const validAge = await checkAge(build_date);
    if (validAge) {
      const result = await addCar(body);
      res.status(201).send({ new_car: result });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteCar = async (req, res, next) => {
  try {
    const { car_id } = req.params;
    const carExists = await checkExists(car_id);

    if (carExists) {
      const result = await deleteCarById(car_id);
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};
