const request = require('supertest');
const app = require('../app');
const db = require('../db/index');
const seed = require('../db/seeds/seed');
const { colourData, carData } = require('../db/data/test-data');

afterAll(() => {
  db.end();
});
beforeEach(() => {
  return seed(colourData, carData);
});

describe('GET /cars', () => {
  test('200: Responds with an array of car objects', async () => {
    const result = await request(app).get('/cars').expect(200);
    expect(result.body.rows).toBeInstanceOf(Array);

    result.body.rows.forEach((car) => {
      expect(car).toMatchObject({
        make: expect.any(String),
        model: expect.any(String),
        build_date: new Date(car.build_date).toJSON(),
        colour_id: expect.any(Number),
      });
    });
  });

  test('200: No cars in db are more than 4 years old', async () => {
    const result = await request(app).get('/cars').expect(200);
    const resultArray = result.body.rows;

    resultArray.forEach((car) => {
      const carYear = car.build_date.slice(0, 4);
      expect(Number(carYear)).toBeGreaterThanOrEqual(2018);
    });
  });

  test('400: responds bad request for invalid path', async () => {
    const result = await request(app).get('/notCars').expect(400);
    expect(result.body.msg).toBe('Bad request');
  });
});
