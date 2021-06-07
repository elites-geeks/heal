'use strict';

const express = require('express');
const patientRoute = express.Router();
// Routes
// patientRoute.post('/new-visit/self', selfVisitHandler);
// patientRoute.get('/appointment/search' , appointmentSearchHandler);
// patientRoute.get('/procedures/pending/:patientid' , pendingProceduresHandler);
// patientRoute.get('/procedures/paid/:patientid' , paidProceduresHanler);
// patientRoute.get('/procedures/active/:patient', activeProceduresHandler);
// patientRoute.get('/appointment', appointmentGetHandler)
patientRoute.post('/procedures');
patientRoute.post('/insutance/subscribe', subscribeHandler);
patientRoute.
// Routes handlers


module.exports={patientRoute};
