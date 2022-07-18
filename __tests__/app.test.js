const request = require('supertest');
const app = require('../app');
const db = require('../db/index');
const seed = require('../db/seeds/seed');
const { colourData, carData } = require('../db/data/test-data');

afterAll(() => db.end());
beforeEach(() => {
  return seed(colourData, carData);
});

describe('GET /cars', () => {
  test('200: Responds with an array of car objects', async () => {
    const result = await request(app).get('/cars').expect(200);

    console.log(result.body);

    expect(result.body).toBeInstanceOf(Array);
    result.body.forEach((car) => {
      expect(car).toMatchObject({
        make: expect.any(String),
        model: expect.any(String),
        build_date: new Date(car.build_date).toJSON(),
        colour_id: expect.any(Number),
      });
    });
  });
});
