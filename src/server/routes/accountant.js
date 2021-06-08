'use strict';

const express = require('express');
const {Employee, SelfVisit, LabTest,RadioTest,Drug,Therapy, Visit, Patient}=require('../models/user');
const accountantRoute = express.Router();

accountantRoute.get('/visit/:id' , getVisitHandler);
accountantRoute.put('/visit/:visid' , confirmPaymentHandler);
accountantRoute.get('/:accid/patient-served', getPatientServedHandler);

async function getVisitHandler(req,res){
  const { id } = req.params;
  const visit = await Visit.findById(id);
  res.status(200).json(JSON.stringify(visit));
}
async function confirmPaymentHandler (req,res){
  const accId = req.params.accid;
  const visitId = req.params.visid;
  const visit = await Visit.findByIdAndUpdate(visitId,{accountant:accId});
  visit.lab.forEach(async id=>{
    await LabTest.findByIdAndUpdate(id,{status:'paid'});
  });
  visit.radio.forEach(async id=>{
    await RadioTest.findByIdAndUpdate(id,{status:'paid'});
  });
  visit.drug.forEach(async id=>{
    await Drug.findByIdAndUpdate(id,{status:'paid'});
  });
  visit.therapy.forEach(async id=>{
    await Therapy.findByIdAndUpdate(id,{status:'paid'});
  });
  visit = await SelfVisit.visid(accID);
  const resp = {
    token:visit.token,
  };
  res.status(204).json(JSON.stringify(resp));
}

async function getPatientServedHandler(req,res){
  const {accid} = req.params;
  const accountant = await Employee.findById(accid);
  const pateintIdServed = accountant.patientsServed;
  const pateintServer = pateintIdServed.map(async id=>{
    const pateint = await Patient.findById(id);
        
  });
}