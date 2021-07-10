'use strict';

const express = require('express');
const adminRoute = express.Router();
const {addDoctor , addHospital ,addInsurance, checkUsername , addPatient, addEmployee} = require('../../middlewares/middleware')
adminRoute.post('/doctor',checkUsername,addDoctor , addNewDoctor);
adminRoute.post('/hospital', checkUsername,addHospital,addNewHospital);
adminRoute.post('/insurance' , checkUsername , addInsurance , addNewInsurance);
adminRoute.post('/patient', addPatient , addNewPateint);
adminRoute.post('/employee', addEmployee , addNewEmployee);

async function addNewInsurance(req , res){
    const {newInsComp} = req;
    res.status(201).json(newInsComp);
}
async function addNewHospital(req , res){
    const {newHospital } = req;
    res.status(201).json(newHospital)
}
async function addNewDoctor(req , res){
    const {newDoctor} = req;
    res.status(201).json(newDoctor);
}
async function addNewPateint(req, res){
    const {newPatient} = req;
    res.status(201).json(newPatient);
}
async function addNewEmployee(req, res){
    const {newEmployee} = req;
    res.status(201).json(newEmployee);
}

module.exports = adminRoute;
