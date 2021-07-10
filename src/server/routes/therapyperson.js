'use strict';

const {
  Therapy,
  Procedure,
  Doctor,
  Patient,
} = require('../models/user');
const moment = require('moment');
const exress = require('express');
const therapyPersonRoute = exress.Router();

// methods and routes
therapyPersonRoute.post('/procedures', addNewTherapy);
therapyPersonRoute.get('/procedures', getAlltherapys);
therapyPersonRoute.get('/procedures/:therapyId', getOneTherapy);
therapyPersonRoute.delete('/procedures/:therapyId', deleteOneTherapy);
therapyPersonRoute.put('/procedures/:therapyId', updateOneTherapy);
therapyPersonRoute.get('/therapys/visit/:visitid', getVisitTherapys);
therapyPersonRoute.get('/therapys/:id', getOneVisitTherapy);
therapyPersonRoute.patch('/therapys/:id' , doActionsOnTheTherapy);


// handlers

async function getOneVisitTherapy(req, res) {
  const {id} =req.params;
  try {
    const therapy = await Therapy.findById(id);
    res.status(200).json(JSON.stringify(therapy));
  } catch (error) {
    console.log(error.message);
  }
}
async function doActionsOnTheTherapy(req, res) {
  const {id} = req.params;
  try {
    const therapy = await Therapy.findById(id);
    if(therapy.status != 'nonpaid'){
      if(req.body.status == 'active'){
        const modified = await Therapy.findOneAndUpdate(id,{status:'active' , timeStart: moment().format()});
        res.status(204).json(JSON.stringify(modified));
      } else if(req.body.status == 'done'){
        const modified = await Therapy.findOneAndUpdate(id,{status:'done' , timeEnd: moment().format() , result:req.body.result});
        res.status(204).json(JSON.stringify(modified));
      }else if(req.body.status == 'deleted'){
        const modified = await Therapy.findOneAndUpdate(id,{status:'deleted' , timeDeleted: moment().format()});
        res.status(204).json(JSON.stringify(modified));
      }else{
        throw new Error('Invalid status change');
      }
    }else{
      throw new Error('Sorry You Can not update a Non-Paid therapy');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getVisitTherapys(req, res) {
  const {
    visitid,
  } = req.params;
  try {
    const visitTherapys = await Therapy.find({visitNum:visitid});
    if(visitTherapys){
      const therapys =await Promise.all( visitTherapys.map(async therapy =>{
        therapy.procedure = await Procedure.findById(therapy.procedure);
        therapy.doctorRequested = await Doctor.findById(therapy.doctorRequested);
        therapy.Patient = await Patient.findById(therapy.Patient);
        return therapy;
      }));
      res.status(200).json(JSON.stringify(therapys));
    }else{
      throw new Error('NO LAB TESTS FOR THIS VISIT');
    }

  } catch (error) {
    console.log(error.message);
  }

}

async function updateOneTherapy(req, res) {
  const {
    therapyId,
  } = req.params;
  try {
    const updated = await Procedure.findOneAndUpdate({_id:therapyId , type:'therapy'}, req.body);
    if(updated){
      res.status(204).json(JSON.stringify(updated));
    } else{
      throw new Error('Not A Therapy Therapy');
    }
  } catch (err) {
    console.log(err.message);
  }
}
async function deleteOneTherapy(req, res) {
  const {
    therapyId,
  } = req.params;
  try {
    const deleted = await Procedure.findOneAndDelete({_id:therapyId , type:'therapy'});
    if(deleted){
      res.status(204).json(JSON.stringify(deleted));
    }else{
      throw new Error('Not A Therapy Therapy');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getOneTherapy(req, res) {
  const {
    therapyId,
  } = req.params;
  try {
    const therapy = await Procedure.findById(therapyId);
    if(therapy.type!=='therapy'){
      throw new Error('Not A Therapy Therapy');
    }
    res.status(200).json(JSON.stringify(therapy));
  } catch (err) {
    console.log(err.message);
  }
}

async function getAlltherapys(req, res) {
  try {
    const therapys = await Procedure.find({
      type: 'therapy',
    });
    res.status(200).json(JSON.stringify(therapys));
  } catch (error) {
    console.log(error.message);
  }
}
async function addNewTherapy(req, res) {

  const newTherapyInput = req.body;
  if(newTherapyInput.type !== 'therapy'){
    throw new Error('Not A Therapy Therapy');
  }
  const newTherapy = new Procedure(newTherapyInput);
  try {
    const savedTherapy = await newTherapy.save();
    res.status(201).json(JSON.stringify(savedTherapy));
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = therapyPersonRoute;
