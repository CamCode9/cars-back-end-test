const { selectAllCars } = require('../models/cars.models');

exports.getCars = async (req, res, next) => {
  try {
    const result = await selectAllCars();
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
