'use strict';

const express = require('express');
const adminRoute = express.Router();
const {addDoctor , addHospital ,addInsurance, checkUsername} = require('../../middlewares/middleware')
const bearer = require('../../middlewares/auth/bearer');
adminRoute.post('/doctor',bearer,checkUsername,addDoctor , addNewDoctor);
adminRoute.post('/hospital',bearer, checkUsername,addHospital,addNewHospital);
adminRoute.post('/insurance',bearer , checkUsername , addInsurance , addNewInsurance);

async function addNewInsurance(req , res){
    const {newInsComp} = req;
    res.status(201).json(JSON.stringify(newInsComp));
}
async function addNewHospital(req , res){
    const {newHospital } = req;
    res.status(201).json(JSON.stringify(newHospital))
}
async function addNewDoctor(req , res){
    const {newDoctor} = req;;
    req.status(201).json(JSON.stringify(newDoctor));
}
