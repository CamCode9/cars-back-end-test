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
    expect(result.body.cars).toBeInstanceOf(Array);

    result.body.cars.forEach((car) => {
      expect(car).toMatchObject({
        car_id: expect.any(Number),
        make: expect.any(String),
        model: expect.any(String),
        build_date: new Date(car.build_date).toJSON(),
        colour_id: expect.any(Number),
      });
    });
  });

  test('200: No cars in db are more than 4 years old', async () => {
    const result = await request(app).get('/cars').expect(200);
    const resultArray = result.body.cars;

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

describe('GET /cars/:car_id', () => {
  test('200: Responds with correct car object', async () => {
    const result = await request(app).get('/cars/1');
    expect(result.body.car[0]).toMatchObject({
      car_id: 1,
      make: 'Seat',
      model: 'Ibiza',
      build_date: '2020-01-01T00:00:00.000Z',
      colour_id: 1,
    });
  });
  test('404: wrong car id', async () => {
    const result = await request(app).get('/cars/9999').expect(404);
    expect(result.body.msg).toBe('Car not found');
  });
  test('400: responds bad request for carr ID not an integer', async () => {
    const result = await request(app).get('/cars/notAnInteger').expect(400);
    expect(result.body.msg).toBe('Bad request');
  });
});

describe('POST /cars', () => {
  test('201: successfully posted car', async () => {
    const result = await request(app)
      .post('/cars')
      .send({
        make: 'Fiat',
        model: '500',
        build_date: '2019-06-06',
        colour_id: 4,
      })
      .expect(201);
    // Issues with PSQL timezone settings causing date issues that I'm unable to resolve at this time
    // depending on your settings you may need to use the below buildDate variable instead:
    // const buildDate = '2019-06-06T00:00:00.000Z';
    const buildDate = '2019-06-05T23:00:00.000Z';
    expect(result.body.new_car).toMatchObject({
      car_id: expect.any(Number),
      make: 'Fiat',
      model: '500',
      build_date: buildDate,
      colour_id: 4,
    });
  });
  test('400: Invalid post request', async () => {
    const result = await request(app)
      .post('/notCars')
      .send({
        make: 'Fiat',
        model: '500',
        build_date: '2019-06-06',
        colour_id: 4,
      })
      .expect(400);
  });
  test('400: Invalid body data type - model', async () => {
    const result = await request(app)
      .post('/cars')
      .send([
        {
          make: 'Fiat',
          model: 500,
          build_date: '2019-06-06',
          colour_id: 4,
        },
      ])
      .expect(400);
  });
  test('400: Invalid body data type - date', async () => {
    const result = await request(app)
      .post('/cars')
      .send([
        {
          make: 'Fiat',
          model: '500',
          build_date: '2019-06',
          colour_id: 4,
        },
      ])
      .expect(400);
  });
});
