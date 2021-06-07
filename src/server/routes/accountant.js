'use strict';

const express = require('express');
const {Employee, SelfVisit, LabTest,RadioTest,Drug,Therapy, SelfVisit}=require('../models/user');
const accountantRoute = express.Router();


accountantRoute.get('/visit/:id' , getVisitHandler);
accountantRoute.post('/:accid/visit/:visid' , confirmPaymentHandler);
accountantRoute.get('/:accid/patient-served', getPatientServedHandler);


async function confirmPaymentHandler (req,res){
    const accId = req.params.accid;
    const visitId = req.params.visid;
    const visit = await SelfVisit.findByIdAndUpdate(visitId,{accountant:accId});
    visit.lab.forEach(id=>{
        await LabTest.findByIdAndUpdate(id,{status:'paid'})
    });
    visit.radio.forEach(id=>{
        await RadioTest.findByIdAndUpdate(id,{status:'paid'})
    });
    visit.drug.forEach(id=>{
        await Drug.findByIdAndUpdate(id,{status:'paid'})
    });
    visit.therapy.forEach(id=>{
        await Therapy.findByIdAndUpdate(id,{status:'paid'})
    });
    visit = await SelfVisit.visid(accID);
    const resp = {
        token:visit.token
    }
    res.json(JSON.stringify(resp))
}