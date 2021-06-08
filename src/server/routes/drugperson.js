'use strict';

const {
    Drug,
    Procedure,
    Doctor,
    Patient
} = require('../models/user');
const moment = require('moment');
const exress = require('express');
const drugPersonRoute = exress.Router();

// methods and routes
drugPersonRoute.post('/procedures', addNewDrug);
drugPersonRoute.get('/procedures', getAlldrugs);
drugPersonRoute.get('/procedures/:drugId', getOneDrug);
drugPersonRoute.delete('/procedures/:drugId', deleteOneDrug);
drugPersonRoute.put('/procedures/:drugId', updateOneDrug);
drugPersonRoute.get('/drugs/visit/:visitid', getVisitDrugs);
drugPersonRoute.get('/drugs/:id', getOneVisitDrug);
drugPersonRoute.patch('/drugs/:id' , doActionsOnTheDrug)


// handlers

async function getOneVisitDrug(req, res) {
    const {id} =req.params;
    try {
        const drug = await Drug.findById(id);
        res.status(200).json(JSON.stringify(drug))
    } catch (error) {
        console.log(error.message);
    }
}
async function doActionsOnTheDrug(req, res) {
    const {id} = req.params;
    try {
        const drug = await Drug.findById(id);
        if(drug.status != 'nonpaid'){
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
            throw new Error('Sorry You Can not update a Non-Paid drug')
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getVisitDrugs(req, res) {
    const {
        visitid
    } = req.params;
    try {
        const visitDrugs = await Drug.find({visitNum:visitid});
        if(visitDrugs){
            const drugs = visitDrugs.map(drug =>{
                drug.procedure = await Procedure.findById(drug.procedure);
                drug.doctorRequested = await Doctor.findById(drug.doctorRequested);
                drug.Patient = await Patient.findById(drug.Patient);
                return drug;
            });
            res.status(200).json(JSON.stringify(drugs));
        }else{
            throw new Error('NO LAB TESTS FOR THIS VISIT')
        }

    } catch (error) {

    }

}

async function updateOneDrug(req, res) {
    const {
        drugId
    } = req.params;
    try {
        const updated = await Procedure.findOneAndUpdate({_id:drugId , type:'drug'}, req.body);
        if(updated){
            res.status(204).json(JSON.stringify(updated));
        } else{
            throw new Error('Not A Drug Drug')
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function deleteOneDrug(req, res) {
    const {
        drugId
    } = req.params;
    try {
        const deleted = await Procedure.findOneAndDelete({_id:drugId , type:'drug'});
        if(deleted){
            res.status(204).json(JSON.stringify(deleted))
        }else{
            throw new Error('Not A Drug Drug')
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getOneDrug(req, res) {
    const {
        drugId
    } = req.params;
    try {
        const drug = await Procedure.findById(drugId);
        if(drug.type!=='drug'){
            throw new Error('Not A Drug Drug')
        }
        res.status(200).json(JSON.stringify(drug));
    } catch (err) {
        console.log(err.message);
    }
}

async function getAlldrugs(req, res) {
    try {
        const drugs = await Procedure.find({
            type: 'drug'
        })
        res.status(200).json(JSON.stringify(drugs));
    } catch (error) {
        console.log(error.message);
    }
}
async function addNewDrug(req, res) {
    const newDrugInput = req.body;
    if(newDrugInput.type !== 'drug'){
        throw new Error('Not A Drug Drug');
    }
    const newDrug = new Procedure(newDrugInput);
    try {
        const savedDrug = await newDrug.save();
        res.status(201).json(JSON.stringify(savedDrug));
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = drugPersonRoute;