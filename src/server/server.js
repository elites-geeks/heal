'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const basic = require('../middlewares/auth/basic');
const bearer = require('../middlewares/auth/bearer');
const notFoundHandler = require('../middlewares/err/404');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const doctor=require('../server/routes/doctor.js');
const insurance=require('../server/routes/insurance');
const accountant=require('../server/routes/accountant');
const drugperson=require('../server/routes/drugperson');
const labperson=require('../server/routes/labperson');
const radioperson=require('../server/routes/radioperson');
const instiute=require('../server/routes/institute');

const errorHandler = require('../middlewares/err/500.js');

app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.set('view engine' ,'ejs')


// const patient=require('../server/routes/patient.js');

app.get('/notification', (req, res) => {
  res.render('index')
});
app.get('/', (req, res) => {
  res.render('index')
});
app.post('/signin', basic, (req, res) => {
  // const userRole = req.user.field? req.user.role+'/'+req.user.field : req.user.role;

  console.log('Authintication done');
  res.send(req.user);
});
app.post('/regesterUser', bearer, (req, res) => {
  const {
    user,
    token,
  } = req;
  const output = {
    user,
    token,
  };
  res.send(output);
});

// app.use('/patient',patient);
app.use('/doctor',doctor);

app.use('/insurance',insurance);
app.use('/drug',drugperson);
app.use('/lab',labperson);
app.use('/radio',radioperson);
app.use('/instiute',instiute);
//app.use('/accountant',accountant);

function run(PORT) {
  app.listen(PORT, () => {
    console.log('Server up on ', PORT);
  });
}
app.use('*', notFoundHandler);
app.use(errorHandler);



// const notif = io.of('/notification');
// notif.on('connection',(socket)=>{
//   socket.on('join', arg=>{
//     console.log(arg);
//   });
// });

io.on('connection', (socket) => {
  console.log("User Logged in " , socket.id);
})
module.exports = {
  run,
  app,
};
