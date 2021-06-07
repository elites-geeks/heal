'use strict';

const express = require('express');

const doctorRoute = express.Router();

doctorRoute.get('/appointment', getAppointmentHandler);
doctorRoute.post('/diagnosis/:visitid', writeDiagnosisHandler);
doctorRoute.post('/procedures/visit/:id', addProceduresHandler);


module.exports=doctorRoute;