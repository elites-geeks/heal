'use strict';

const express = require('express');
const moment = require('moment');
const bearer = require('../../middlewares/auth/bearer');
const doctorRoute = express.Router();
const { Appointment, Patient, Doctor, Diagnosis, Visit } = require('../models/user');

doctorRoute.get('/appointment/:docid', getAppointmentHandler);
// doctorRoute.get('/appointment/patient/:id' , getOneAppointment);
doctorRoute.post('/diagnosis/:visitid', writeDiagnosisHandler);
// doctorRoute.post('/procedures/visit/:id', addProceduresHandler);


async function getAppointmentHandler(req, res) {
    try {
        const doctorId = req.params.docid;
        const doctor = await Doctor.findById(doctorId);
        const appointments = doctor.appointmentList.filter(elem => elem.status === "new")
        const appointmentList = await Promise.all(appointments.map(async elem => {
            const patient = await Patient.findById(elem.patient);
            return { patient, elem }
        }));
        res.status(200).json(appointmentList)
    } catch (err) {
        console.log(err.message)
    }
}

async function writeDiagnosisHandler(req, res) {
    const visitId = req.params.visitid;
    const { doctor, patient } = await Visit.findById(visitId);
    const timeWritten = moment().format();
    const { signs, symptoms, finalDiagnosis } = req.body;
    const newDig = new Diagnosis({
        patient: patient,
        doctor: doctor,
        visitNum: visitId,
        timeWritten: timeWritten,
        signs: signs,
        symptoms: symptoms,
        finalDiagnosis: finalDiagnosis
    });
    const saved = await newDig.save();
    await Visit.findByIdAndUpdate(visitId, { diagnosis: saved._id });
    const dr = await Doctor.findById(doctor);
    const pat = await Patient.findById(patient);
    const ret = {
        visitNum: visitId,
        timeWritten: timeWritten,
        signs: signs,
        symptoms: symptoms,
        finalDiagnosis: finalDiagnosis,
        doctor: dr.userProfile.info.firstname + " " + dr.userProfile.info.lastname,
        patient: pat.userProfile.info.firstname + " " + dr.userProfile.info.lastname
    }
    res.status(201).json(ret);
}

module.exports = doctorRoute;
