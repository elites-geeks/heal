'use struct';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

let patientId;
let visitId;
let drugId;
describe('drug routing test', () => {

  it('get One Visit Drug', async ()=> {

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
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;

    const drugObj ={
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
    const drug=new db.Drug(drugObj);
    const drugSaved=await drug.save();
    drugId=drugSaved.id;
    // console.log(drugId);
    let res=await mockRequest.get(`/drug/drugs/${drugId}`);
    
    expect(res.status).toEqual(200);
  });
  it('add New Drug', async ()=> {
    // const procedureObj = {
    //   name: 'panadol',
    //   code: '503',
    //   type:  'drug',
    //   notes: ['headache'],
    //   price:3,
    //   expectedTime: '30 min',
    
    // };
    // const procedure=new db.Drug(procedureObj);
    // const procedureSaved=await procedure.save();
    // console.log(res.body);
    let res=await mockRequest.post(`/drug/procedures`).send({
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    });
    
    expect(res.status).toEqual(201);
  });

  it('get All drugs', async ()=> {
    
    let res=await mockRequest.get(`/drug/procedures`);
    
    expect(res.status).toEqual(200);
  });

  it('get One drugs', async ()=> {
    const procedureObj = {
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.get(`/drug/procedures/${procedureId}`);
    
    expect(res.status).toEqual(200);
  });

  it('delete One Drug', async ()=> {
    const procedureObj = {
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.delete(`/drug/procedures/${procedureId}`);
    
    expect(res.status).toEqual(204);
  });

  it('update One Drug', async ()=> {
    const procedureObj = {
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.put(`/drug/procedures/${procedureId}`).send({
      name: 'dolocet',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    });
    expect(res.status).toEqual(204);
  });


  it('update One Drug', async ()=> {
    const procedureObj = {
      name: 'panadol',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
    
    };
    const procedure=new db.Procedure(procedureObj);
    const procedureSaved=await procedure.save();
    const procedureId=procedureSaved.id;
    let res=await mockRequest.put(`/drug/procedures/${procedureId}`).send({
      name: 'dolocet',
      code: '503',
      type:  'drug',
      notes: ['headache'],
      price:3,
      expectedTime: '30 min',
      
    });
    expect(res.status).toEqual(204);
  });
  it('get Visit Drugs', async ()=> {
    
    let res=await mockRequest.get(`/drug/drugs/visit/${visitId}`);
    expect(res.status).toEqual(200);
  });
  //jest.setTimeout(60000);
  it('do Actions On The Drug', async ()=> {
    
    let res=await mockRequest.patch(`/drug/drugs/${drugId}`).send({status:'active'});
    expect(res.status).toEqual(204);
  });
  it('do Actions On The Drug status done', async ()=> {
    
    let res=await mockRequest.patch(`/drug/drugs/${drugId}`).send({status:'done'});
    expect(res.status).toEqual(204);
  });
  it('do Actions On The Drug status deleted', async ()=> {
    
    let res=await mockRequest.patch(`/drug/drugs/${drugId}`).send({status:'deleted'});
    expect(res.status).toEqual(204);
  });
});