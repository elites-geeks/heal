'use strict';

const {Institute, Department} = require('../models/user');
const express = require('express');

const instituteRoute = express.Router();
// routes and methods
instituteRoute.post('/departments/:instituteid' , addDepartment);
instituteRoute.get('/departments/:instituteid', getAllDepartments);




// routes handlers
async function getAllDepartments(req,res){
    const {instituteid} = req.params;
    try {
        const inst = await Institute.findById(instituteid);
        const deps = inst.listOfDeps;
        req.status(200).json(JSON.stringify(deps))
    } catch (error) {
        console.log(err.message);
    }
}
async function addDepartment(req,res){
    const {instituteid} = req.params;
    try {
        
        const institution = await Institute.findById(instituteid);
        const depinst = institution.listOfDeps.find(dep=>{
            return dep.field == req.body.field;
        });
        if(depinst){
            throw new Error('You already have this department');
        }else{
            const department = new Department(req.body);
            const savedDep = await department.save();
            await Institute.findByIdAndUpdate(instituteid,{$push :{listOfDeps:department}});
            res.status(201).json(JSON.stringify(savedDep));
        }
    } catch (error) {
        console.log(error.message);
    }
}
