const db = require('../db/index');

exports.checkExists = async (car_id) => {
  // %I is an identifier in pg-format
  const queryStr = `SELECT * FROM cars WHERE car_id = $1;`;
  const dbOutput = await db.query(queryStr, [car_id]);

  if (dbOutput.rows.length === 0) {
    // resource does NOT exist
    return Promise.reject({ status: 404, msg: 'Car not found' });
  } else {
    return true;
  }
};
