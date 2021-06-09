'use strict';

const express = require('express');
const {
  Employee,
  Visit,
  LabTest,
  RadioTest,
  Drug,
  Therapy,
  Patient,
} = require('../models/user');
const accountantRoute = express.Router();

accountantRoute.get('/visit/:id', getVisitHandler);
accountantRoute.put('/visit/:visid/:accid', confirmPaymentHandler);
accountantRoute.get('/patients-served/:accid', getPatientServedHandler);

async function getVisitHandler(req, res) {
  const {
    id,
  } = req.params;
  try {

    const visit = await Visit.findById(id);
    res.status(200).json(visit);
  } catch (error) {
    console.log(error.message);
  }
}
async function confirmPaymentHandler(req, res) {
  const accId = req.params.accid;
  const visitId = req.params.visid;
  try {
    console.log(accId,visitId);
    let visit = await Visit.findByIdAndUpdate(visitId, {
      accountant: accId,
    });
    console.log('visit.token',visit.token);
    console.log('visit',visit);
    await Employee.findByIdAndUpdate(accId, {
      $push: {
        patientsServed: visit.patient,
      },
    });
    visit.lab.forEach(async id => {
      await LabTest.findByIdAndUpdate(id, {
        status: 'paid',
      });
    });
    visit.radio.forEach(async id => {
      await RadioTest.findByIdAndUpdate(id, {
        status: 'paid',
      });
    });
    visit.drug.forEach(async id => {
      await Drug.findByIdAndUpdate(id, {
        status: 'paid',
      });
    });
    visit.therapy.forEach(async id => {
      await Therapy.findByIdAndUpdate(id, {
        status: 'paid',
      });
    });
    visit = await Visit.findById(visitId);
    console.log('after',visit);
    
    const resp = {
      token: visit.token,
    };
    // console.log(resp);
    // console.log(visit);
    res.status(204).json(resp);
  } catch (error) {
    console.log(error.message);
  }
}

async function getPatientServedHandler(req, res) {
  try {
    //console.log('hi');
    const {
      accid,
    } = req.params;
    const accountant = await Employee.findById(accid);
    //console.log('sad',accountant)
    const pateintServed =await Promise.all( accountant.patientsServed.map(async (id) => {
      const pateint = await Patient.findById(id);
      // console.log(pateint);
      return pateint;
    }));
    res.status(200).json(pateintServed);
  } catch (error) {
    console.log(error.message);
  }
}
module.exports=accountantRoute;