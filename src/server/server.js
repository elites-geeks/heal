'use strict';

const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const basic = require('../middlewares/auth/basic').basicAuthentication;
const bearer = require('../middlewares/auth/bearer');
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



// const patient=require('../server/routes/patient.js');
// const doctor=require('../server/routes/doctor.js');
// const insurance=require('../server/routes/insurance');

// app.get('/', (req, res) => {
//   res.sendFile('../../public/home.html');
// });
app.post('/signin', basic, (req, res) => {
    // const userRole = req.user.field? req.user.role+'/'+req.user.field : req.user.role;

    console.log("Authintication done");
    res.send(req.user)
});
app.post('/regesterUser', bearer, (req, res) => {
    const {
        user,
        token
    } = req;
    const output = {
        user,
        token
    }
    res.send(output)
});

// app.use('/patient',patient);
// app.use('/doctor',doctor);

// app.use('/insurance',insurance);

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
