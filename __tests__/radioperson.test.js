'use struct';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

let patientId;
let visitId;
let radioId;
describe('radio routing test', () => {

  it('get One Visit Test', async ()=> {

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
      name: 'bloodTest',
      code: '503',
      type:  'radio',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;

    const radioObj ={
      procedure:procedureId,
      status: 'active',
      timeStart: '9 am',
      timeEnd:'1 pm',
      patient:patientProfileSaved.id,
      doctorRequested: doctorprofileSaved.id,
      timeAdded: '5 am',
      visitNum: vistSaved.id,
      type: 'xray',
      position: 'hand',    
    };
    const radio=new db.RadioTest(radioObj);
    const radioObjSaved=await radio.save();
    radioId=radioObjSaved.id;
    
    let res=await mockRequest.get(`/radio/tests/${radioId}`);
    
    expect(res.status).toEqual(200);
  });

  it('add New radio', async ()=> {
   
    let res=await mockRequest.post(`/radio/procedures`).send({
      name: 'ultrasound',
      code: '503',
      type:  'radio',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    });
    
    expect(res.status).toEqual(201);
  });

  it('get All Tests', async ()=> {
    
    let res=await mockRequest.get(`/radio/procedures`);
    
    expect(res.status).toEqual(200);
  });

  it('get One radio', async ()=> {
    const procedureObj = {
      name: 'x',
      code: '503',
      type:  'radio',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.get(`/radio/procedures/${procedureId}`);
    
    expect(res.status).toEqual(200);
  });

  it('do Actions On The radio', async ()=> {
    
    let res=await mockRequest.patch(`/radio/tests/${radioId}`).send({status:'active'});
    expect(res.status).toEqual(204);
  });

  it('delete One radio', async ()=> {
    const procedureObj = {
      name: 'xray',
      code: '200',
      type:  'radio',
      notes: ['headache'],
      price:15,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.delete(`/radio/procedures/${procedureId}`);
    
    expect(res.status).toEqual(204);
  });

  it('update One Test', async ()=> {
    const procedureObj = {
      name: 'altrasound',
      code: '344',
      type:  'radio',
      notes: ['headache'],
      price:13,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.put(`/radio/procedures/${procedureId}`).send({
      name: 'x-ray',
      code: '344',
      type:  'rafio',
      notes: ['headache'],
      price:15,
      expectedTime: '30 min',
      
    });
    expect(res.status).toEqual(204);
  });

  it('get Visit radio', async ()=> {
    
    let res=await mockRequest.get(`/radio/tests/visit/${visitId}`);
    expect(res.status).toEqual(200);
  });
  //jest.setTimeout(60000);



});