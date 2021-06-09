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
const patient=require('../server/routes/patient.js');
const admin = require('./routes/admin')
const errorHandler = require('../middlewares/err/500.js');
const { subscribe } = require('../server/routes/doctor.js');

app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));
app.set('view engine' ,'ejs')

app.get('/', (req, res) => {
  res.render('index')
});

app.post('/signin', basic, (req, res) => {
  // const userRole = req.user.field? req.user.role+'/'+req.user.field : req.user.role;
  // console.log('Authintication done');
  // const user = req.user;
  // const tocken = req.user.tocken;
  // res.send(req.user);
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
// app.post('/regesterUser', (req, res) => {
  
// });

app.use('/patient',patient);
app.use('/doctor',doctor);

app.use('/insurance',insurance);
app.use('/drug',drugperson);
app.use('/lab',labperson);
app.use('/radio',radioperson);
app.use('/instiute',instiute);
app.use('/accountant',accountant);
app.use('/admin' , admin)
function run(PORT) {
  server.listen(PORT, () => {
    console.log('Server up on ', PORT);
  });
}
app.use('*', notFoundHandler);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log("User Logged in " , socket.id);
  
  socket.on('test' , pay=>{
    console.log(pay);
    io.emit('test' , 'Welcooooome')
  });
})
module.exports = {
  run,
  app,
};