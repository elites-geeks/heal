'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const {basicAuthentication} = require('../middlewares/auth/basic');
const notFoundHandler = require('../middlewares/err/404');

const errorHandler = require('../middlewares/err/500.js');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));



// const client=require('../server/routes/client.js');
// const doctor=require('../server/routes/doctor.js');
// const employee=require('../server/routes/employee');

// app.get('/', (req, res) => {
//   res.sendFile('../../public/home.html');
// });
// app.post('/signin',basicAuth,(req,res)=>{
//   const userRole = req.user.field? req.user.role+'/'+req.user.field : req.user.role;
//   res.redirect(`/${userRole}`)
// });
// app.post('/signin',basicAuthentication,(req,res)=>{
  

// });

// app.use('/client',client);
// app.use('/doctor',doctor);

// app.use('/employee',employee);

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