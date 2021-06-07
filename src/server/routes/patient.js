'use strict';

const express = require('express');
const patientRoute = express.Router();
const db=require('../models/user');
// Routes
patientRoute.post('/new-visit/self', selfVisitHandler);
patientRoute.get('/appointment/search' , appointmentSearchHandler);
patientRoute.get('/procedures/pending/:patientid' , pendingProceduresHandler);
patientRoute.get('/procedures/paid/:patientid' , paidProceduresHanler);
patientRoute.get('/procedures/active/:patientid', activeProceduresHandler);
patientRoute.get('/appointment/:patientid', appointmentGetHandler);
//patientRoute.post('/procedures');
patientRoute.post('/institute/subscribe', subscribeHandler);

function getCurrentDate() {
  let dateNow = new Date();
  let dd = dateNow.getDate();
  let monthSingleDigit = dateNow.getMonth() + 1,
    mm = monthSingleDigit < 10 ? '0' + monthSingleDigit : monthSingleDigit;
  let yy = dateNow.getFullYear().toString().substr(2);
  return mm + '/' + dd + '/' + yy;
}
//patientRoute.
// Routes handlers
async function selfVisitHandler(req,res){
  //let id=req.params.id;
  try{

    let {paitent,lab,radio,drug,therapy}=req.body;
    let newSelfVisit=new db.SelfVisit({
      paitent:paitent,
      lab:lab,
      radio:radio,
      drug:drug,
      therapy:therapy,
      timeOpened:getCurrentDate(),

    });
    let saveSelfVisit=await newSelfVisit.save();
    res.status(200).send(saveSelfVisit);
  }catch(error){
    console.log(error);
  }
}
async function appointmentSearchHandler(req,res){

}
async function pendingProceduresHandler(req,res){
  try{
    let id=req.params.patientid;
    let  labProcedure=await db.LabTest.find({status:'nonpaid',paitent:id});
    let  radioProcedure=await db.RadioTest.find({status:'nonpaid',paitent:id});
    let  therapyProcedure=await db.Therapy.find({status:'nonpaid',paitent:id});
    let  drugProcedure=await db.Drug.find({status:'nonpaid',paitent:id});
    
    
    res.status(200).json({labProcedure,radioProcedure,therapyProcedure,drugProcedure});
  }catch(error){
    console.log(error);
  }
}
async function paidProceduresHanler(req,res){
  try{
    let id =req.params.patientid;
    let  labProcedure=await db.LabTest.find({status:'paid',paitent:id});
    let  radioProcedure=await db.RadioTest.find({status:'paid',paitent:id});
    let  therapyProcedure=await db.Therapy.find({status:'paid',paitent:id});
    let  drugProcedure=await db.Drug.find({status:'paid',paitent:id});
    res.status(200).json({labProcedure,radioProcedure,therapyProcedure,drugProcedure});
  }catch(error){
    console.log(error);
  }
}
async function activeProceduresHandler(req,res){
  try{
    let id =req.params.patientid;
    let  labProcedure=await db.LabTest.find({status:'active',paitent:id});
    let  radioProcedure=await db.RadioTest.find({status:'active',paitent:id});
    let  therapyProcedure=await db.Therapy.find({status:'active',paitent:id});
    let  drugProcedure=await db.Drug.find({status:'active',paitent:id});
    res.status(200).json({labProcedure,radioProcedure,therapyProcedure,drugProcedure});
  }catch(error){
    console.log(error);
  }
}
async function appointmentGetHandler(req,res){
  try{
    let id =req.params.patientid;
    let obj=await db.Appointment.find({paitent:id});
    let newObj=obj.map(async(appointment)=>{
      let doctor=await db.Doctor.findById(appointment.doctor);
      return {doctor:doctor,time:appointment.time,status:appointment.status,date:appointment.date};
    });
    res.status(200).json(newObj);

  }catch(error){
    console.log(error);
  }
}
async function subscribeHandler(req,res){
  try{

    let {patientId,insuranceComp,policy}=req.body;
    let newSubscribtionRequest=new db.subscribtionRequest({
      patientId:patientId,
      insuranceComp:insuranceComp,
      policy:policy,
      status:'pending',

    });
    let saveSubsicribe=await newSubscribtionRequest.save();
    let patient=await db.Patient.findById(patientId);
    let insuinsur=await db.InsuranceComp.findById(insuranceComp);
    let policyy=await db.Policy.findById(policy);
    res.status(200).json({patient,insuinsur,policyy});
  }catch(error){
    console.log(error);
  }
}
  
  






module.exports={patientRoute};
