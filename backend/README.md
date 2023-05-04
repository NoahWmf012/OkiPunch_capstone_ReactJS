# OkiPunch

### Install Node Packages

run `npm install`

### setup for DB connect

- create `.env` file

- 4 variables in .env
  `DB_NAME=?, DB_USERNAME=?, DB_PASSWORD=?, JWT_SECRET=?`

- set up Postgres Database with `DB_NAME, DB_USERNAME, DB_PASSWORD`

- set up dummy data, run:
  `knex migrate:latest`
  `knex seed:run`

### Start the App:

run `node app.js` or `nodemon app.js`
