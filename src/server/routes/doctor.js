'use strict';

const express = require('express');
const moment = require('moment');
const doctorRoute = express.Router();
const {Appointment , Patient , Doctor, Diagnosis, Visit} = require('../models/user')

doctorRoute.get('/appointment/:docid', getAppointmentHandler);
doctorRoute.post('/diagnosis/:visitid', writeDiagnosisHandler);
doctorRoute.post('/procedures/visit/:id', addProceduresHandler);

async function getAppointmentHandler(req, res){
  const doctorId = req.params.docid;
  const listOfAppointments = await Appointment.find({doctor:doctorId, status:'new'});
  
  const output = listOfAppointments.map(async appointment=>{
    const patient = await Patient.findById(appointment.patient)
    let obj = {
        time:appointment.time,
        date:appointment.date,
        patient:patient
    }
    return obj;
  });
  res.status(200).json(output);
}

async function writeDiagnosisHandler(req, res){
    const visitId = req.params.visitid;
    const visit = await Visit.findById(visitId);
    const {doctor , patient} = visit;
    const timeWritten = moment().format('hh:mm');
    const {signs , symproms , finalDiagnosis} = req.body;
    const newDig = new Diagnosis({
        patient:patient,
        doctor:doctor,
        visitNum:visitId,
        timeWritten:timeWritten,
        signs:signs,
        symproms:symproms,
        finalDiagnosis:finalDiagnosis
    });
    const saved =await newDig.saved();
    await Visit.findByIdAndUpdate(visitId, {diagnosis:saved._id});
    const dr = await Doctor.findById(doctor);
    const pat = await Patient.findById(patient);
    const ret = {
        visitNum:visitId,
        timeWritten:timeWritten,
        signs:signs,
        symproms:symproms,
        finalDiagnosis:finalDiagnosis,
        doctor:dr.info.firstname + " " +dr.info.lastname,
        patient:pat.info.firstname + " " +dr.info.lastname
    }
    res.status(201).json(ret);
}

module.exports=doctorRoute;