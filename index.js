'use strict';

require('dotenv').config();
const { app, run } = require('./src/server/server');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Start up DB Server
const { connect } = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
connect(MONGODB_URI, options).then(()=>{
  console.log('Connected to the DATABASE');
 run(PORT)
});
