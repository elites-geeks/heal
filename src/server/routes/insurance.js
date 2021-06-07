'use strict';

const express = require('express');

const employeeRoute = express.Router();

const db = require('../models/user');

employeeRoute.get('/sub-requests/id', getAllRequestsHandler);
employeeRoute.get('/requests/:id', getOneRequestHandler);
// employeeRoute.post('/requests/:id', getOneRequestHandler);
employeeRoute.get('/visits', getAllPendingVisitsHndlers);
employeeRoute.get('/visits/:id', getOneVistHandler);
employeeRoute.post('/visits/:id', visitApprovalHandler);
employeeRoute.post('/policies', addPoliciesHandler);
employeeRoute.get('/policies', showAllPoliciesHandler);
employeeRoute.get('/policies/:id' , getOnePolicyHandler);
employeeRoute.put('/policies/:id' , modifyPolicyHandler);
employeeRoute.delete('/policies/:id' , deletePolicyHandler);
employeeRoute.get('/subscribers' , getAllSubscribreshandlers);
employeeRoute.get('/subscribers/:id' , getOneSubscriberHandler);
employeeRoute.delete('/subscribers/:id' , deleteSubscriberHandler);


async function getAllRequestsHandler(req,res){
  try{
    let id=req.params.id;
    let listOfSubscribtionReq =await db.subscribtionRequest.find({status:'pinding',insuranceComp:`${id}`});
    const newList=  listOfSubscribtionReq.map(async (subscribe)=>{
      const patient=await db.Patient.findById(subscribe.patientId);
      const policy=await db.Policy.findById(subscribe.policy);
      return {patient,policy};
    });
    res.status.send(newList);

  }catch(err){
    console.log(err);
  }
}

async function getOneRequestHandler(req,res){
  try{
    let id=req.params.id;
    const subReq=await db.subscribtionRequest.findById(id);
    res.status.send(subReq);
  }catch(err){
    console.log(err);
  }
}

async function getAllPendingVisitsHndlers(req,res){
  try{
    const getAllPendingVisits=await db.VisitApprove.find({approval:'pinding'});
    res.status(200).send(getAllPendingVisits);

  }catch(err){
    console.log(err);
  }
}

async function getOneVistHandler(req,res){
  try{
    let id=req.params.id;
    const getOneDoctorVisit =await db.DoctorVisit.findById(id);
    const getOneSelfVisit =await db.SelfVisit.findById(id);
    if(getOneDoctorVisit){
      res.status(200).send(getOneDoctorVisit);
    }else if(getOneSelfVisit){
      res.status(200).send(getOneSelfVisit);
    }

  }catch(err){
    console.log(err);
  }
}

async function visitApprovalHandler(req,res){
  try{
    let id=req.params.id;
    let approval=req.body;
    const approveDoctorVisit =await db.VisitApprove.findByIdAndUpdate(id,{approval:approval});
    res.status(200).send(approveDoctorVisit);

  }catch(err){
    console.log(err);
  }
}

async function addPoliciesHandler(req,res){

  try{
    let {company,offerCoverage,offerName,costPerYear,costPerMonth,patientsSubscribed}=req.body;
    console.log(req.body);
    const newPolicy = new db.Policy({
      company:company,
      offerCoverage:offerCoverage,
      offerName:offerName,
      costPerYear:costPerYear,
      costPerMonth:costPerMonth,
      patientsSubscribed:patientsSubscribed,
    });
    const savenewPolicy =await newPolicy.save();

    res.status(201).send(savenewPolicy);
  }catch(err){
    console.log(err);
  }
  
}
async function showAllPoliciesHandler(req,res){
  try{
    const getAllPolicies =await db.Policy.find();
    res.status(200).send(getAllPolicies);
  }catch(err){
    console.log(err);
  }
 
}

async function getOnePolicyHandler(req,res){
  try{
    let id=req.params.id;
    const getOnePolicy =await db.Policy.findById(id);
    res.status(200).send(getOnePolicy);
  }catch(err){
    console.log(err);
  }
}

async function modifyPolicyHandler(req,res){
  try{
    let id=req.params.id;
    let obj=req.body;
    const updatePolicy =await db.Policy.findByIdAndUpdate(id,obj);
    res.status(200).send(updatePolicy);
  }catch(err){
    console.log(err);
  }
}
async function deletePolicyHandler(req,res){
  try{
    let id=req.params.id;
      
    const deletePolicy =await db.Policy.findByIdAndDelete(id);
    res.status(200).send(deletePolicy);
  }catch(err){
    console.log(err);
  }
}

async function getAllSubscribreshandlers(req,res){
  try{
    let arrayOfSubscribers=[];

    const getAllSubscribres =await db.insuranceCompSchema.find();
    getAllSubscribres.listOfSubscribers.forEach(getListOfSubscribers=>{
      getListOfSubscribers.forEach(subscriber=>{
        arrayOfSubscribers.push(subscriber);
      });
     
    });
    

    res.status(200).send(arrayOfSubscribers);
  }catch(err){
    console.log(err);
  }
}

async function getOneSubscriberHandler(req,res){
  try{
    let id=req.params.id;
    let arrayOfSubscribers=[];

    const getOneSubscribres =await db.insuranceCompSchema.findById(id);
    getOneSubscribres.listOfSubscribers.forEach(getListOfSubscribers=>{
      arrayOfSubscribers.push(getListOfSubscribers);
    });
    res.status(200).send(arrayOfSubscribers);
  }catch(err){
    console.log(err);
  }
}
async function deleteSubscriberHandler(req,res){
  try{
    let id=req.params.id;

    const delelteSubscribres =await db.insuranceCompSchema.findByIdAndUpdate(id,{listOfSubscribers:[]});
   
    res.status(200).send(delelteSubscribres);
  }catch(err){
    console.log(err);
  }
}
module.exports=employeeRoute;