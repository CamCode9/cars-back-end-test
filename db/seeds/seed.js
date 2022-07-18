const format = require('pg-format');
const db = require('../index');
const { dropTables, createTables } = require('../manage-tables');

const seed = async (colourData, carData) => {
  await dropTables();
  await createTables();

  const coloursInsert = format(
    'INSERT INTO colours (name) VALUES %L RETURNING *;',
    colourData.map(({ name }) => [name])
  );

  await db.query(coloursInsert);

  const carsInsert = format(
    'INSERT INTO cars (make, model, build_date, colour_id) VALUES %L RETURNING *;',
    carData.map(({ make, model, build_date, colour_id }) => [
      make,
      model,
      build_date,
      colour_id,
    ])
  );

  await db.query(carsInsert);
};

module.exports = seed;
