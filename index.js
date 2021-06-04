'use strict';
require('dotenv').config();
const {app , run} = require('./src/server/server');
const PORT = process.env.PORT;

run(PORT);
