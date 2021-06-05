'use strict';

const express = require('express');

const clientRoute = express.Router();

clientRoute.get('/', dashboard);
clientRoute.get('/openvisit', newvisit);
clientRoute.get('/openvisit/doctor', doctorVisit);
clientRoute.get('/openvisit/self', selfVisit);
clientRoute.post('/openvisit/self', reserveVisit);
// clientRoute.get('/procedures/ready', selfVisit);
// clientRoute.get('/procedures/pending', selfVisit);
//clientRoute.get('/procedures', procedures);
clientRoute.get('/appointments/search', appointments);
clientRoute.post('/appointments/search', reserve);
clientRoute.get('/appointments/reserved', appointmentsReserved);
clientRoute.get('/subscribe-to-insurance', subscribeToInsurance);
function dashboard(req,res){
  res.status(200).render('client/dashboard.ejs');
  //res.send('sfasfa');
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
  // let  {name,specialty,availabilty,phonenumber,location}=req.body;
  //res.redirect('client/appointments/reserved');
}
function appointments(req,res){
  res.status(200).render('client/searchappointments.ejs');
    
}

function reserve(req,res){
  let  {name,specialty,availabilty,phonenumber,location}=req.body;
  res.redirect('client/appointments/reserved');
}

function appointmentsReserved(req,res){
  res.status(200).render('client/appointmentsReserved.ejs');
      
}

function subscribeToInsurance(req,res){
  res.status(200).render('client/subscribeToInsurance.ejs');
        
}

module.exports=clientRoute;