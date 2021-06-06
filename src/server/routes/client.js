'use strict';

const express = require('express');
const clientRoute = express.Router();
const ModelCollection = require('../models/collection');

const patientModel = require('../models/user').Patients;
const testModel = require('../models/utility').tests;
const appointmentModel = require('../models/utility').reservations;
const insuranceModel = require('../models/institute').insuranceCompanies;
const patients = new ModelCollection(patientModel);
const insuranceCompanies = new ModelCollection(insuranceModel);
const tests = new ModelCollection(testModel);
const appointments = new ModelCollection(appointmentModel);


clientRoute.get('/', dashboard);
clientRoute.get('/openvisit', newvisit);
clientRoute.get('/openvisit/doctor', doctorVisit);
clientRoute.get('/openvisit/self', selfVisit);
clientRoute.post('/openvisit/self', reserveVisit);

clientRoute.get('/test', getAllTests);
clientRoute.get('/test/active', getActiveTests);
clientRoute.get('/test/inactive', getInactiveTests);
clientRoute.get('/appointments', getAllAppointments);
clientRoute.delete('/appointments/:id', deleteAppointment);
clientRoute.put('/appointments/:id', updateAppointment);
clientRoute.get('/procedures',getNonPaid);
clientRoute.delete('/procedures/:id',deleteNonPaid);
clientRoute.post('/subsicribe',subscribe);




////////////////////////
async function getAllAppointments(req, res) {
  const allAppointments = await appointments.get();
  console.log('allAppointments ------> ', allAppointments);
  res.status(200).json(allAppointments);
}
/////////////
async function deleteAppointment(req, res) {
  const id = req.params.id;
  await appointments.delete(id);
  res.status(200);
}
////////////
async function updateAppointment(req, res) {
  const id = req.params.id;
  const obj = req.body;
  await appointments.update(id, obj);
  res.status(200);
}
////////////
async function getAllTests(req, res) {
  let allTests = await tests.get();
  console.log('allTests ------> ', allTests);
  res.status(200).json(allTests);
}
//////////////
async function getActiveTests(req, res) {
  let activeTests = await tests.getBy({status: 'active'});
  console.log('activeTests ------> ', activeTests);
  res.status(200).json(activeTests);
}
/////////////////
async function getInactiveTests(req, res) {
  let inactiveTests = await tests.getBy({status: 'paid'});
  console.log('inactiveTests ------> ', inactiveTests);
  res.status(200).json(inactiveTests);
}
///////////////////
async function getNonPaid(req,res){
  let nonPaid=await tests.getBy({status:'pending'});
  console.log('non paid ------> ', nonPaid);
  res.status(200).json(nonPaid);
}
////////////
async function deleteNonPaid(req,res){
  let id =req.params.id;
  await tests.delete(id);
  res.status(200);
}
////////// function not complete
async function subscribe(req,res){
  // let obj=req.body;

}




function dashboard(req,res){
  res.status(200).render('client/dashboard.ejs');
}
function newvisit(req,res){
  res.status(200).render('client/visit.ejs');
}
function doctorVisit(req,res){
  let  {speciality,time,City,date}=req.query;
  res.status(200).render('client/doctorVisit.ejs');
  
}
function selfVisit(req,res){
  res.status(200).render('client/selfVisit.ejs',{header:'self Visit'});
    
}
function reserveVisit(req,res){
}
function reserve(req,res){
  let  {name,specialty,availabilty,phonenumber,location}=req.body;
  res.redirect('client/appointments/reserved');
}


module.exports=clientRoute;
