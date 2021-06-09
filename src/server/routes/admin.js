'use strict';

const express = require('express');
const adminRoute = express.Router();
const {addDoctor , addHospital ,addInsurance, checkUsername , addPatient} = require('../../middlewares/middleware')
const bearer = require('../../middlewares/auth/bearer');
adminRoute.post('/doctor',checkUsername,addDoctor , addNewDoctor);
adminRoute.post('/hospital', checkUsername,addHospital,addNewHospital);
adminRoute.post('/insurance',bearer , checkUsername , addInsurance , addNewInsurance);
adminRoute.post('/patient', addPatient , addNewPateint);
async function addNewInsurance(req , res){
    const {newInsComp} = req;
    res.status(201).json(newInsComp);
}
async function addNewHospital(req , res){
    const {newHospital } = req;
    res.status(201).json(newHospital)
}
async function addNewDoctor(req , res){
    const {newDoctor} = req;;
    res.status(201).json(newDoctor);
}

async function addNewPateint(req, res){
    const {newPatient} = req;
    res.status(201).json(newPatient);
}

module.exports = adminRoute;