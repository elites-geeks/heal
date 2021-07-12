'use strict';

// Initializing the server with the socket -----------------

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

// Requiring error handlers ----------------------

const errorHandler = require('../middlewares/err/500.js');
const notFoundHandler = require('../middlewares/err/404');

// requiring routes ------------------------

const doctor = require('../server/routes/doctor.js');
const insurance = require('../server/routes/insurance');
const accountant = require('../server/routes/accountant');
const drugperson = require('../server/routes/drugperson');
const labperson = require('../server/routes/labperson');
const radioperson = require('../server/routes/radioperson');
const instiute = require('../server/routes/institute');
const patient = require('../server/routes/patient.js');
const admin = require('./routes/admin')
const therapyperson = require('../server/routes/therapyperson');

// Requiring middlewares ------------------

const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const basic = require('../middlewares/auth/basic')

// server setup ------------------------------------
app.use(cors());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.set('view engine', 'ejs')

// Using routes ---------------------------------------

app.use('/doctor', doctor);
app.use('/insurance', insurance);
app.use('/accountant', accountant);
app.use('/drug', drugperson);
app.use('/lab', labperson);
app.use('/radio', radioperson);
app.use('/instiute', instiute);
app.use('/patient', patient);
app.use('/admin', admin);
app.use('/therapyperson', therapyperson);

// Some routes for the home page ------------------------

app.get('/', (req, res) => {
    res.status(200).render('index')
});

app.post('/signin', basic, (req, res) => {
    const {
        user,
        token,
    } = req;
    const output = {
        user,
        token,
    };
    res.status(201).json(output);
});
// Using Error handlers ----------------------------------

app.use('*', notFoundHandler);
app.use(errorHandler);

// Runing the server and the database --------------------

function run(PORT) {
    server.listen(PORT, () => {
        console.log('Server up on ', PORT);
    });
}

// Connecting to the socket ------------------------------
// const jwt = require('jsonwebtoken')
// const peopleConnected = []
// io.of('/newAppointNotification').use((socket, next) => {
//     const token = socket.handshake.auth.token;
//     const user = jwt.verify(token,process.env.SECRET)
//     peopleConnected.push({user:user.id, socket:socket.id})
//     next()
// })
io.of('/newAppointNotification').on('connection', socket => {
    socket.on('new-appointment', payload => {
        socket.broadcast.emit('new-appointment', payload)
    })
});

io.on('connection', (socket) => {
    console.log("User Logged in ", socket.id);

    socket.on('test', pay => {
        console.log(pay);
        io.emit('test', 'Welcooooome')
    });
})

// exporing ------------------------------------
module.exports = {
    run,
    app,
};
