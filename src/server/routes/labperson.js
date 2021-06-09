'use strict';

const {
  LabTest,
  Procedure,
  Doctor,
  Patient,
} = require('../models/user');
const moment = require('moment');
const exress = require('express');
const labPersonRoute = exress.Router();

// methods and routes
labPersonRoute.post('/procedures', addNewTest);
labPersonRoute.get('/procedures', getAlltests);
labPersonRoute.get('/procedures/:testId', getOneTest);
labPersonRoute.delete('/procedures/:testId', deleteOneTest);
labPersonRoute.put('/procedures/:testId', updateOneTest);
labPersonRoute.get('/tests/visit/:visitid', getVisitTests);
labPersonRoute.get('/tests/:id', getOneVisitTest);
labPersonRoute.patch('/tests/:id' , doActionsOnTheTest);


// handlers

async function getOneVisitTest(req, res) {
  const {id} =req.params;
  try {
    const test = await LabTest.findById(id);
    res.status(200).json(JSON.stringify(test));
  } catch (error) {
    console.log(error.message);
  }
}
async function doActionsOnTheTest(req, res) {
  const {id} = req.params;
  try {
    const test = await LabTest.findById(id);
    //console.log(test);
    if(test.status != 'nonpaid'){
      if(req.body.status == 'active'){
        const modified = await LabTest.findOneAndUpdate(id,{status:'active' , timeStart: moment().format()});
        res.status(204).json(JSON.stringify(modified));
      } else if(req.body.status == 'done'){
        const modified = await LabTest.findOneAndUpdate(id,{status:'done' , timeEnd: moment().format() , result:req.body.result});
        res.status(204).json(JSON.stringify(modified));
      }else if(req.body.status == 'deleted'){
        const modified = await LabTest.findOneAndUpdate(id,{status:'deleted' , timeDeleted: moment().format()});
        res.status(204).json(JSON.stringify(modified));
      }else{
        throw new Error('Invalid status change');
      }
    }else{
      throw new Error('Sorry You Can not update a Non-Paid test');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getVisitTests(req, res) {
  const {
    visitid,
  } = req.params;
  try {
    const visitTests = await LabTest.find({visitNum:visitid});
    if(visitTests){
      const tests =await Promise.all( visitTests.map(async test =>{
        test.procedure = await Procedure.findById(test.procedure);
        test.doctorRequested = await Doctor.findById(test.doctorRequested);
        test.Patient = await Patient.findById(test.Patient);
        return test;
      }));
      res.status(200).json(JSON.stringify(tests));
    }else{
      throw new Error('NO LAB TESTS FOR THIS VISIT');
    }

  } catch (error) {
    console.log(error.message);
  }

}

async function updateOneTest(req, res) {
  const {
    testId,
  } = req.params;
  try {
    const updated = await Procedure.findOneAndUpdate({_id:testId , type:'lab'}, req.body);
    if(updated){
      res.status(204).json(JSON.stringify(updated));
    } else{
      throw new Error('Not A Lab Test');
    }
  } catch (err) {
    console.log(err.message);
  }
}
async function deleteOneTest(req, res) {
  const {
    testId,
  } = req.params;
  try {
    const deleted = await Procedure.findOneAndDelete({_id:testId , type:'lab'});
    if(deleted){
      res.status(204).json(JSON.stringify(deleted));
    }else{
      throw new Error('Not A Lab Test');
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function getOneTest(req, res) {
  const {
    testId,
  } = req.params;
  try {
    const test = await Procedure.findById(testId);
    if(test.type!=='lab'){
      throw new Error('Not A Lab Test');
    }
    res.status(200).json(test);
  } catch (err) {
    console.log(err.message);
  }
}

async function getAlltests(req, res) {
  try {
    const tests = await Procedure.find({
      type: 'lab',
    });
    res.status(200).json(tests);
  } catch (error) {
    console.log(error.message);
  }
}
async function addNewTest(req, res) {
  const newTestInput = req.body;
  if(newTestInput.type !== 'lab'){
    throw new Error('Not A Lab Test');
  }
  const newTest = new Procedure(newTestInput);
  try {
    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = labPersonRoute;