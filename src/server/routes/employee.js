'use strict';

const express = require('express');

const employeeRoute = express.Router();

employeeRoute.get('/insurance', dashboard);
employeeRoute.get('/insurance/newSubReq', newSubReq);
employeeRoute.get('/insurance/getRequest', getRequest);
employeeRoute.get('/insurance/addpolicy', addpolicy);
employeeRoute.get('/insurance/pindingVisits', pindingVisits);
employeeRoute.get('/insurance/VisitDetails', VisitDetails);


employeeRoute.get('/accountant', accountantDashboard);
employeeRoute.get('/vistReception', vistReception);
employeeRoute.get('/vistnum', vistnum);

function dashboard(req,res){
  res.render('employee/insurance/insurance.ejs');
}
function newSubReq(req,res){
  res.render('employee/insurance/newSubReq.ejs');
}

function getRequest(req,res){
  res.render('employee/insurance/request.ejs');
}
function addpolicy(req,res){
  res.render('employee/insurance/addpolicy.ejs');
}
function pindingVisits(req,res){
  res.render('employee/insurance/pindingVisits.ejs');
}
function VisitDetails(req,res){
  res.render('employee/insurance/visitDetails.ejs');
}



function accountantDashboard(req,res){
  res.render('employee/accountant/dashboard.ejs');
}
function vistReception(req,res){
  res.render('employee/accountant/visitReceiption.ejs');
}

function vistnum(req,res){
  res.render('employee/accountant/visit.ejs');
}


module.exports=employeeRoute;