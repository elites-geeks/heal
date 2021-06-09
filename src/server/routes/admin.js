'use strict';

const express = require('express');
const adminRoute = express.Router();
const {addDoctor , addHospital ,addInsurance, checkUsername} = require('../../middlewares/middleware');
const bearer = require('../../middlewares/auth/bearer');


adminRoute.post('/doctor',checkUsername,addDoctor , addNewDoctor);
adminRoute.post('/hospital', checkUsername,addHospital,addNewHospital);
adminRoute.post('/insurance', checkUsername , addInsurance , addNewInsurance);

async function addNewInsurance(req , res){
  const newInsComp = req.body;
  res.status(201).json(newInsComp);
}
async function addNewHospital(req , res){
  const newHospital  = req.body;
  res.status(201).json(newHospital);
}
async function addNewDoctor(req , res){
  //console.log('addNewDoctor');
  //console.log(req);
  const newDoctor = req.body;
  console.log(newDoctor);
  res.status(201).json(newDoctor);
}
module.exports=adminRoute;