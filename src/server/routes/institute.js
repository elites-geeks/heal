'use strict';

const {Institute, Department, Employee} = require('../models/user');
const {addEmployee} = require('../../middlewares/middleware');
const express = require('express');

const instituteRoute = express.Router();
// routes and methods
instituteRoute.post('/departments/:instituteid' , addDepartment);
instituteRoute.get('/departments/:instituteid', getAllDepartments);
instituteRoute.get('/departments/single/:depid' , getOneDepartment);
instituteRoute.post('/department/employee',addEmployee, addNewEmployee);
instituteRoute.put('/department/employee/:empid/:depid', deleteNewEmployee);




// routes handlers

async function deleteNewEmployee(req, res){
  const {empid ,depid} = req.params;
  try {
    const emp = await Employee.findById(empid);
    const deletedEmp = await Department.findByIdAndUpdate(depid, {$pull :{listOFEmployees:emp}});
    res.status(204).json(JSON.stringify(deletedEmp));
  } catch (error) {
    console.log(error.message);
  }
}
async function addNewEmployee(req, res){
  try{
    const newEmp = req.newEmployee;
    res.status(200).json(JSON.stringify(newEmp));
  }catch(err){
    console.log(err.message);
  }
}
async function getOneDepartment(req,res){
  const {depid } = req.params;
  try {
    const dep =await Department.findById(depid);
    res.status(200).json(JSON.stringify(dep));
  } catch (error) {
    console.log(error.message);  
  }
}
async function getAllDepartments(req,res){
  const {instituteid} = req.params;
  try {
    const inst = await Institute.findById(instituteid);
    const deps = inst.listOfDeps;
    res.status(200).json(JSON.stringify(deps));
  } catch (error) {
    console.log(error.message);
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

module.exports = instituteRoute;
