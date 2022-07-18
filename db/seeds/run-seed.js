const db = require('../index');
const seed = require('./seed');
const { colourData, carData } = require('../data/data');

const runSeed = () => {
  return seed(colourData, carData).then(() => db.end);
};

runSeed();
