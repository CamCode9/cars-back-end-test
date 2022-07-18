const db = require('../db/index');

exports.selectAllCars = async () => {
  const carsQuery = `SELECT * FROM cars`;
  const result = await db.query(carsQuery);
  return result.rows;
};

exports.selectCarById = async (car_id) => {
  const carIdQuery = `SELECT * FROM cars WHERE car_id = $1;`;
  const result = await db.query(carIdQuery, [car_id]);

  if (result.rows.length === 0) {
    return Promise.reject({ status: 404, msg: 'Car not found' });
  } else {
    return result.rows;
  }
};

exports.addCar = async (body) => {
  const { make, model, build_date, colour_id } = body;
  if (
    typeof make === 'string' &&
    typeof model === 'string' &&
    typeof build_date === 'string' &&
    typeof colour_id === 'number'
  ) {
    const carAddQuery = `INSERT INTO cars (make, model, build_date, colour_id) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const result = await db.query(carAddQuery, [
      make,
      model,
      build_date,
      colour_id,
    ]);

    return result.rows[0];
  } else {
    return Promise.reject({ status: 400, msg: 'Invalid data type' });
  }
};

exports.deleteCarById = async (car_id) => {
  const carDeleteQuery = `DELETE FROM cars WHERE car_id = $1;`;
  const result = await db.query(carDeleteQuery, [car_id]);
};
