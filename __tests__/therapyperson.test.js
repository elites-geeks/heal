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
describe('therapy routing test', () => {

  it('add New Therapy', async ()=> {
    let entityDoctor={
      username: 'abdallah',
      password: '1234',
      phone_number: 1234,
      email:'abdallah@gmail.com',
      role: 'institute',
    };
    let entityDoctor1=new db.Entity(entityDoctor);
    let entityDoctor1Saved=await entityDoctor1.save();
      
      
    //console.log(entityDoctor1Saved)
    let doctorObj={
      info: entityDoctor1,
      date_of_birth: '12/5/2021',
      firstname: 'areen',
      lastname: 'jaradat',
      gender: 'female',
      img: 'hi',
      country: 'irbid',
      type:'patient',
    };
    let doctorSchema1=new db.User(doctorObj);
    const doctorSaved=await doctorSchema1.save();
    // console.log(doctorSaved)
      
    const doctorprofileObj ={
      userProfile:doctorSchema1,
      specialty:'doctor',
      clinicLocation: 'irbid',
      clinicPhoneNumber:124235 ,
      yearsOfExp: 5,
      listOfAccreditedInsuranceComp: ['company1','company1'],
            
    };
    let doctor=new db.Doctor(doctorprofileObj);
    const doctorprofileSaved=await doctor.save();
  
  
    let entityPatient={
      username: 'areen',
      password: '1234',
      phone_number: 1234,
      email:'areen@gmail.com',
      role: 'user',
    };
    let entityPatient1=new db.Entity(entityPatient);
    let entityPatientSaved=await entityPatient1.save();
    // console.log(entityPatientSaved)
      
    let userObj={
      info: entityPatient1,
      date_of_birth: '12/5/2021',
      firstname: 'areen',
      lastname: 'jaradat',
      gender: 'female',
      img: 'hi',
      country: 'irbid',
      type:'patient',
    };
    let userSchema1=new db.User(userObj);
    const userSaved=await userSchema1.save();
          
    // console.log(userSaved)
      
   
      
    const patientHistoryObj={
      medicalState: ['surgery'],
           
    };
        
    const patientHistory=new db.PatientHistory(patientHistoryObj);
    const patientHistorySaved=await patientHistory.save();
    //console.log(patientHistorySaved)
    patientId=patientHistorySaved.id;
      
    const visitObj ={
      appoitmentNum: '1',
      patient:userSaved.id ,
      doctor: doctorprofileSaved.id,
      timeOpened: '5/15/2021',
             
    };
    const vist=new db.Visit(visitObj);
    const vistSaved=await vist.save();
    // console.log(vistSaved)
    visitId=vistSaved.id;
      
  
  
    let patientObj={
      userProfile: userSchema1,
      insuranceStatus: true,
      insurancePolicy: 'insurancePolicy',
      patientHistory:patientHistory,
    };
    const patientProfile=new db.Patient(patientObj);
    const patientProfileSaved=await patientProfile.save();

    const procedureObj = {
      name: 'massage',
      code: '43',
      type:  'therapy',
     
      price:30,
      expectedTime: '1 hour',
        
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    procedureId=procedureSaved.id;


    const therapyObj={
      procedure:procedureId,
      status: 'active',
      timeStart: '9 am',
      timeEnd:'1 pm',
      patient:patientProfileSaved.id,
      doctorRequested: doctorprofileSaved.id,
      timeAdded: '5 am',
      visitNum: vistSaved.id,
            
    };
    const therapy=new db.Therapy(therapyObj);
    const therapySaved=await therapy.save();
    therapySavedId=therapySaved.id;
    let res=await mockRequest.post(`/therapyperson/procedures`).send( {
      name: 'massage',
      code: '43',
      type:  'therapy',
       
      price:30,
      expectedTime: '1 hour',
          
    });
    
    expect(res.status).toEqual(201);
  });

  it('get all therapy',async()=>{
    let res=await mockRequest.get(`/therapyperson/procedures`);
    
    expect(res.status).toEqual(200);
  });


  it('get One therapy',async()=>{
    let res=await mockRequest.get(`/therapyperson/procedures/${procedureId}`);
    
    expect(res.status).toEqual(200);
  });
  it('delete One therapy',async()=>{

    const procedureObj = {
      name: 'massage',
      code: '43',
      type:  'therapy',
       
      price:30,
      expectedTime: '1 hour',
          
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();

    let res=await mockRequest.delete(`/therapyperson/procedures/${procedureSaved.id}`);
    
    expect(res.status).toEqual(204);
  });

  it('update One Test', async ()=> {
    const procedureObj = {
      name: 'massssage',
      code: '344',
      type:  'therapy',
      
      price:13,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.put(`/therapyperson/procedures/${procedureId}`).send({
      name: 'massage',
      code: '344',
      type:  'rafio',
      notes: ['headache'],
      price:15,
      expectedTime: '30 min',
      
    });
    expect(res.status).toEqual(204);
  });
 
  it('get Visit Therapy', async ()=> {
    
    let res=await mockRequest.get(`/therapyperson/therapys/visit/${visitId}`);
    expect(res.status).toEqual(200);
  });

  it(' get One Visit Therapy', async ()=> {
    
    let res=await mockRequest.get(`/therapyperson/therapys/${therapySavedId}`);
    expect(res.status).toEqual(200);
  });
  it('do Actions On The radio', async ()=> {
    
    let res=await mockRequest.patch(`/therapyperson/therapys/${therapySavedId}`).send({status:'active'});
    expect(res.status).toEqual(204);
  });
  it('do Actions On The radio status done', async ()=> {
    
    let res=await mockRequest.patch(`/therapyperson/therapys/${therapySavedId}`).send({status:'done'});
    expect(res.status).toEqual(204);
  });
  it('do Actions On The radio status deleted', async ()=> {
    
    let res=await mockRequest.patch(`/therapyperson/therapys/${therapySavedId}`).send({status:'deleted'});
    expect(res.status).toEqual(204);
  });
});