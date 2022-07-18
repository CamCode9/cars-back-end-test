const db = require('./index');

const createTables = async () => {
  const coloursTablePromise = db.query(`
    CREATE TABLE colours (
        colour_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );`);

  await coloursTablePromise;

  const carsTablePromise = db.query(`
    CREATE TABLE cars (
        car_id SERIAL PRIMARY KEY,
        make VARCHAR(255)  NOT NULL,
        model VARCHAR(255)  NOT NULL,
        build_date DATE NOT NULL,
        colour_id INT REFERENCES colours(colour_id)
    );
    `);

  await carsTablePromise;
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS cars`);
  await db.query(`DROP TABLE IF EXISTS colours`);
};

module.exports = { createTables, dropTables };
