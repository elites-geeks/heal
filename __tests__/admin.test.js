'use strict';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

let patientId;
let visitId;
let procedureId;
let therapySavedId;
describe('admin routing test', () => {

  it('add New Doctor', async ()=> {

    const newDoctor = {
      username: 'ali',
      password: '1234',
      phone_number: 1234,
      email:'omar@gmail.com',
      role: 'user',
      date_of_birth: '12/5/2021',
      firstname: 'ali',
      lastname: 'jaradat',
      gender: 'male',
      img: 'hi',
      country: 'irbid',
      type:'doctor',
      field: 'pharmacy',
      yearsOfExp: 5,
      institute: 'institute',
      specialty:'bone',
      clinicLocation:'amman',
      clinicPhoneNumber:34645786868,
    };

    let res=await mockRequest.post(`/admin/doctor`).send(newDoctor);
    
    expect(res.status).toEqual(201);
  });
  it('add New hospital', async ()=> {

    const newHospital ={
      username:'ammanhospital',
      password: '1234',
      phone_number: 353465756,
      email:'sf@age',
      role: 'institute',
      name : 'hospital',
      location: 'amman',
      type:'hospital', 
    };

    let res=await mockRequest.post(`/admin/hospital`).send(newHospital);
    
    expect(res.status).toEqual(201);
  });
  it('add New Insurance', async ()=> {

    const newInsurance ={
      username:'ammanhospital',
      password: '1234',
      phone_number: 353465756,
      email:'sf@age',
      role: 'institute',
      name : 'hospital',
      location: 'amman',
      type:'insurance', 
    };

    let res=await mockRequest.post(`/admin/insurance`).send(newInsurance);
    
    expect(res.status).toEqual(201);
  });
  it('error add New Insurance', async ()=> {

    const newInsurance ={
      username:'ammanhospital',
      password: '1234',
      phone_number: 353465756,
      email:'sf@age',
      role: 'user',
      name : 'hospital',
      location: 'amman',
      type:'insurance', 
    };

    let res=await mockRequest.post(`/admin/insurance`).send(newInsurance);
    
    expect(res.status).toEqual(500);
  });

  it('add New Insurance', async ()=> {

    const newInsurance ={
      username:'ammanhospital',
      password: '1234',
      phone_number: 353465756,
      email:'sf@age',
      role: 'institute',
      name : 'hospital',
      location: 'amman',
      type:'ali', 
    };

    let res=await mockRequest.post(`/admin/insurance`).send(newInsurance);
    
    expect(res.status).toEqual(500);
  });
});