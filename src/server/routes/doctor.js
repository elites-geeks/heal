'use strict';

const express = require('express');

const doctorRoute = express.Router();

doctorRoute.get('/', dashboard);
doctorRoute.get('/diagnosis', diagnosis);
doctorRoute.get('/diagnosis', diagnosis);
doctorRoute.get('/visit/doctor', selfVisit);



function dashboard(req,res){
  res.status(200).render('doctor/dashboard.ejs');
}

function diagnosis(req,res){
  res.status(200).render('doctor/diagnosis.ejs');
}
function selfVisit(req,res){
  res.status(200).render('client/selfVisit.ejs',{header:'doctor Visit'});
    
}

module.exports=doctorRoute;