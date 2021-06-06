'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const superagent = require('superagent');
const methodOverride = require('method-override');
const morgan = require('morgan');

const notFoundHandler = require('../middlewares/err/404');

const errorHandler = require('../middlewares/err/500.js');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());

app.set('views', path.join(__dirname, '../../views'));
app.use(express.urlencoded({
  extended: true,
}));



const client=require('../server/routes/client.js');
const doctor=require('../server/routes/doctor.js');
const employee=require('../server/routes/employee');

app.get('/', (req, res) => {
  res.render('pages/home');
});

app.use('/client',client);
app.use('/doctor',doctor);

app.use('/employee',employee);

function run(PORT) {
  app.listen(PORT, () => {
    console.log('Server up on ', PORT);
  });
}
app.use('*', notFoundHandler);
app.use(errorHandler);
module.exports = {
  run,
  app,
};