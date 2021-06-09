'use strict';

const express = require('express');
const moment = require('moment');
const bearer = require('../../middlewares/auth/bearer');
const doctorRoute = express.Router();
const {Appointment , Patient , Doctor, Diagnosis, Visit} = require('../models/user')

doctorRoute.get('/appointments/:docid', getAppointmentHandler);
// doctorRoute.get('/appointment/:id' , getOneAppointment);
doctorRoute.post('/diagnosis/:visitid', writeDiagnosisHandler);
// doctorRoute.post('/procedures/visit/:id', addProceduresHandler);



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
    const {doctor , patient} = await Visit.findById(visitId);
    const timeWritten = moment().format();
    const {signs , symptoms , finalDiagnosis} = req.body;
    const newDig = new Diagnosis({
        patient:patient,
        doctor:doctor,
        visitNum:visitId,
        timeWritten:timeWritten,
        signs:signs,
        symptoms:symptoms,
        finalDiagnosis:finalDiagnosis
    });
    const saved =await newDig.save();
    await Visit.findByIdAndUpdate(visitId, {diagnosis:saved._id});
    const dr = await Doctor.findById(doctor);
    const pat = await Patient.findById(patient);
    const ret = {
        visitNum:visitId,
        timeWritten:timeWritten,
        signs:signs,
        symptoms:symptoms,
        finalDiagnosis:finalDiagnosis,
        doctor:dr.userProfile.info.firstname + " " +dr.userProfile.info.lastname,
        patient:pat.userProfile.info.firstname + " " +dr.userProfile.info.lastname
    }
    res.status(201).json(ret);
}

module.exports=doctorRoute;