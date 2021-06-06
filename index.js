'use strict';

require('dotenv').config();
const { app, run } = require('./src/server/server');
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const pg = require('pg');

// Start up DB Server
const { connect } = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.log('PG Error', err));
async function runServer(start) {
  try {
    await connect(MONGODB_URI, options);
    console.log('Connected to the DATABASE');
    // Start the web server
    start(PORT);
  }catch (err) {   
    console.log(err.message, '\nCould not connect to the DataBase');
  }
}
runServer(run);