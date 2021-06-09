'use struct';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

let patientId;
let visitId;
let labId;
describe('lab routing test', () => {

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
      type:  'lab',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;

    const labObj ={
      procedure:procedureId,
      status: 'active',
      timeStart: '9 am',
      timeEnd:'1 pm',
      patient:patientProfileSaved.id,
     
      route:'oral',
      dose: '500 mg',
      doctorRequested: doctorprofileSaved.id,
      timeAdded: '5 am',
      visitNum: vistSaved.id,
    };
    const lab=new db.LabTest(labObj);
    const labObjSaved=await lab.save();
    labId=labObjSaved.id;
    
    let res=await mockRequest.get(`/lab/tests/${labId}`);
    
    expect(res.status).toEqual(200);
  });

  it('add New Test', async ()=> {
   
    let res=await mockRequest.post(`/lab/procedures`).send({
      name: 'pressureTest',
      code: '503',
      type:  'lab',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    });
    
    expect(res.status).toEqual(201);
  });

  it('get All Tests', async ()=> {
    
    let res=await mockRequest.get(`/lab/procedures`);
    
    expect(res.status).toEqual(200);
  });

  it('get One lab', async ()=> {
    const procedureObj = {
      name: 'panadol',
      code: '503',
      type:  'lab',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.get(`/lab/procedures/${procedureId}`);
    
    expect(res.status).toEqual(200);
  });

  it('delete One Lab', async ()=> {
    const procedureObj = {
      name: 'bloodTest',
      code: '200',
      type:  'lab',
      notes: ['headache'],
      price:15,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.delete(`/lab/procedures/${procedureId}`);
    
    expect(res.status).toEqual(204);
  });

  it('update One Test', async ()=> {
    const procedureObj = {
      name: 'pressure',
      code: '344',
      type:  'lab',
      notes: ['headache'],
      price:13,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.put(`/lab/procedures/${procedureId}`).send({
      name: 'blood',
      code: '344',
      type:  'llab',
      notes: ['headache'],
      price:15,
      expectedTime: '30 min',
      
    });
    expect(res.status).toEqual(204);
  });

  it('get Visit lab', async ()=> {
    
    let res=await mockRequest.get(`/lab/tests/visit/${visitId}`);
    expect(res.status).toEqual(200);
  });
  //jest.setTimeout(60000);


  it('do Actions On The lab', async ()=> {
    
    let res=await mockRequest.patch(`/lab/tests/${labId}`).send({status:'active'});
    expect(res.status).toEqual(204);
  });
});