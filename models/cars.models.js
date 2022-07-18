const db = require('../db/index');

exports.selectAllCars = async () => {
  const carsQuery = `SELECT * FROM cars`;
  const result = await db.query(carsQuery);
  return result;
};
