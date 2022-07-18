# Cars-back-end-test

## Description

Simple API back-end using mock data to simulate a car database

## Setup and prerequisites

Prerequisite: [Node](https://nodejs.org/en/) (version 16 or above) and [PostgreSQL](https://www.postgresql.org/) (version 12 or above)

To begin, run **npm install** to install the packages required. If for any reason this is unsuccessful, try installing the following packages individually:

- npm install express
- npm install jest
- npm install supertest -D
- npm install pg
- npm install pg-format
- npm install dotenv

### dotenv

This repo contains 2 databases for test and (hypothetical) dev data. In order to connect to the databases, .env files must be created. In the root directory, create a .env.test file, and include the following:

PGDATABASE=cars_db_test

Next, create a .env.development file, and include the following:

PGDATABASE=cars_db

## To start

Run the following scripts in order:

- npm run setup
- npm run seed

The databases should now be setup, you can run the test files by running the following script:

- npm test

The 'production' version of the test is currently hosted [here](https://cars-be-test.herokuapp.com/) on Heroku. The index screen displays all available endpoints.
