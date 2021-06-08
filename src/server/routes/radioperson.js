'use strict';

const {
    RadioTest,
    Procedure,
    Doctor,
    Patient
} = require('../models/user');
const moment = require('moment');
const exress = require('express');
const radioPersonRoute = exress.Router();

// methods and routes
radioPersonRoute.post('/procedures', addNewTest);
radioPersonRoute.get('/procedures', getAlltests);
radioPersonRoute.get('/procedures/:testId', getOneTest);
radioPersonRoute.delete('/procedures/:testId', deleteOneTest);
radioPersonRoute.put('/procedures/:testId', updateOneTest);
radioPersonRoute.get('/tests/visit/:visitid', getVisitTests);
radioPersonRoute.get('/tests/:id', getOneVisitTest);
radioPersonRoute.patch('/tests/:id' , doActionsOnTheTest)


// handlers

async function getOneVisitTest(req, res) {
    const {id} =req.params;
    try {
        const test = await RadioTest.findById(id);
        res.status(200).json(JSON.stringify(test))
    } catch (error) {
        console.log(error.message);
    }
}
async function doActionsOnTheTest(req, res) {
    const {id} = req.params;
    try {
        const test = await RadioTest.findById(id);
        if(test.status != 'nonpaid'){
            if(req.body.status == 'active'){
                const modified = await findOneAndUpdate(id,{status:'active' , timeStart: moment().format()})
                res.status(204).json(JSON.stringify(modified));
            } else if(req.body.status == 'done'){
                const modified = await findOneAndUpdate(id,{status:'done' , timeEnd: moment().format() , result:req.body.result});
                res.status(204).json(JSON.stringify(modified));
            }else if(req.body.status == 'deleted'){
                const modified = await findOneAndUpdate(id,{status:'deleted' , timeDeleted: moment().format()});
                res.status(204).json(JSON.stringify(modified));
            }else{
                throw new Error("Invalid status change")
            }
        }else{
            throw new Error('Sorry You Can not update a Non-Paid test')
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getVisitTests(req, res) {
    const {
        visitid
    } = req.params;
    try {
        const visitTests = await RadioTest.find({visitNum:visitid});
        if(visitTests){
            const tests = visitTests.map(test =>{
                test.procedure = await Procedure.findById(test.procedure);
                test.doctorRequested = await Doctor.findById(test.doctorRequested);
                test.Patient = await Patient.findById(test.Patient);
                return test;
            });
            res.status(200).json(JSON.stringify(tests));
        }else{
            throw new Error('NO LAB TESTS FOR THIS VISIT')
        }

    } catch (error) {

    }

}

async function updateOneTest(req, res) {
    const {
        testId
    } = req.params;
    try {
        const updated = await Procedure.findOneAndUpdate({_id:testId , type:'radio'}, req.body);
        if(updated){
            res.status(204).json(JSON.stringify(updated));
        } else{
            throw new Error('Not A Radio Test')
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function deleteOneTest(req, res) {
    const {
        testId
    } = req.params;
    try {
        const deleted = await Procedure.findOneAndDelete({_id:testId , type:'radio'});
        if(deleted){
            res.status(204).json(JSON.stringify(deleted))
        }else{
            throw new Error('Not A radio Test')
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneTest(req, res) {
    const {
        testId
    } = req.params;
    try {
        const test = await Procedure.findById(testId);
        if(test.type!=='radio'){
            throw new Error('Not A radio Test')
        }
        res.status(200).json(JSON.stringify(test));
    } catch (err) {
        console.log(err.message);
    }
}

async function getAlltests(req, res) {
    try {
        const tests = await Procedure.find({
            type: 'radio'
        })
        res.status(200).json(JSON.stringify(tests));
    } catch (error) {
        console.log(error.message);
    }
}
async function addNewTest(req, res) {
    const newTestInput = req.body;
    if(newTestInput.type !== 'radio'){
        throw new Error('Not A radio Test');
    }
    const newTest = new Procedure(newTestInput);
    try {
        const savedTest = await newTest.save();
        res.status(201).json(JSON.stringify(savedTest));
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = radioPersonRoute;