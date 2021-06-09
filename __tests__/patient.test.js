'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const { app } = require('../src/server/server.js');
const db = require('../src/server/models/user');
const mockServer = supertest(app);

let res;

describe('Testing patient routes', () => {
  it('Can make a new self-visit', async ()=>{
   
    const userEntity = {
      username: 'Ali',
      password: '12345678',
      phone_number: 798031142,
      email: 'zaa92reer@gmail.com',
      role: 'user',
    };
    const entityObj = new db.Entity(userEntity);
    await entityObj.save();
    const user = {
      info: entityObj,
      date_of_birth: '30/1/1992',
      firstname: 'mohammad',
      lastname: 'zaareer',
      gender: 'male',
      img: 'bla bla bla',
      country: 'jordan',
      type: 'doctor',
    };
    const userObj = new db.User(user);
    await userObj.save();

    const patientObj = {
      userProfile: userObj,
      insuranceStatus: true,
      insurancePolicy: 'anything',
    };

    const patient = new db.Patient(patientObj);
    res = await patient.save();

    const visitObj = {
      patient: res._id,
      timeOpened: '4:00 AM',
    };
    console.log(res.id);
        
    const out = await mockServer.post('/patient/visit').send(visitObj);
    expect(out.status).toEqual(200);
  });
  it('Can get all pending procedures', async()=>{
    const userEntity = {
      username: 'salameh',
      password: '12341878',
      phone_number: 798031142,
      email: 'rawan@hotmail.com',
      role: 'user',
    };
    const entityObj = new db.Entity(userEntity);
    await entityObj.save();
    const user = {
      info: entityObj,
      date_of_birth: '30/1/2000',
      firstname: 'rawan',
      lastname: 'salem',
      gender: 'female',
      img: 'img2',
      country: 'lebanon',
      type: 'patient',
    };
    const userObj = new db.User(user);
    await userObj.save();

    const patientObj = {
      userProfile: userObj,
      insuranceStatus: true,
      insurancePolicy: 'anything',
    };

    const patient = new db.Patient(patientObj);
    const res = await patient.save();
        
    const visitObj = {
      patient: res._id,
      timeOpened: '6:00 AM',
    };

    const visit = new db.Visit(visitObj);
    const res0 = await visit.save();
        

    const procedureObj1 = {
      name: 'procedure1',
      code: '6750',
      type: 'lab',
      price: 200,
      expectedTime: '3 hours',
    };
    const procedureObj2 = {
      name: 'procedure2',
      code: '552',
      type: 'radio',
      price: 150,
      expectedTime: '1 hours',
    };
    const procedureObj3 = {
      name: 'procedure3',
      code: '312',
      type: 'therapy',
      price: 50,
      expectedTime: '2 hours',
    };
    const procedureObj4 = {
      name: 'procedure4',
      code: '984',
      type: 'drug',
      price: 100,
      expectedTime: '1 hours',
    };

    const p1= new db.Procedure(procedureObj1);
    const p2= new db.Procedure(procedureObj2);
    const p3= new db.Procedure(procedureObj3);
    const p4= new db.Procedure(procedureObj4);

    const res1 = p1.save();
    const res2 = p2.save();
    const res3 = p3.save();
    const res4 = p4.save();

    const labTestObj = {
      procedure: res1._id,
      status: 'nonpaid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const radioTestObj = {
      procedure: res2._id,
      status: 'nonpaid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      position: 'zzzz',
      type: 'xray',
    };
    const therapyObj = {
      procedure: res3._id,
      status: 'nonpaid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const drugObj = {
      procedure: res4._id,
      status: 'nonpaid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      route: 'xxx',
      dose: '3',
    };

    const output = await mockServer.get(`/patient/procedures/pending/${res._id}`);
    expect(output.status).toEqual(200);
  });
  it('Can get all paid procedures', async()=>{
    const userEntity = {
      username: 'joha',
      password: '846178',
      phone_number: 79794191,
      email: 'joha@hotmail.com',
      role: 'user',
    };
    const entityObj = new db.Entity(userEntity);
    await entityObj.save();
    const user = {
      info: entityObj,
      date_of_birth: '5/5/2005',
      firstname: 'jojo',
      lastname: 'lolo',
      gender: 'female',
      img: 'img3',
      country: 'syria',
      type: 'patient',
    };
    const userObj = new db.User(user);
    await userObj.save();

    const patientObj = {
      userProfile: userObj,
      insuranceStatus: true,
      insurancePolicy: 'anything',
    };

    const patient = new db.Patient(patientObj);
    const res = await patient.save();
        
    const visitObj = {
      patient: res._id,
      timeOpened: '9:00 AM',
    };

    const visit = new db.Visit(visitObj);
    const res0 = await visit.save();
        

    const procedureObj1 = {
      name: 'procedure1',
      code: '6750',
      type: 'lab',
      price: 200,
      expectedTime: '3 hours',
    };
    const procedureObj2 = {
      name: 'procedure2',
      code: '552',
      type: 'radio',
      price: 150,
      expectedTime: '1 hours',
    };
    const procedureObj3 = {
      name: 'procedure3',
      code: '312',
      type: 'therapy',
      price: 50,
      expectedTime: '2 hours',
    };
    const procedureObj4 = {
      name: 'procedure4',
      code: '984',
      type: 'drug',
      price: 100,
      expectedTime: '1 hours',
    };

    const p1= new db.Procedure(procedureObj1);
    const p2= new db.Procedure(procedureObj2);
    const p3= new db.Procedure(procedureObj3);
    const p4= new db.Procedure(procedureObj4);

    const res1 = p1.save();
    const res2 = p2.save();
    const res3 = p3.save();
    const res4 = p4.save();

    const labTestObj = {
      procedure: res1._id,
      status: 'paid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const radioTestObj = {
      procedure: res2._id,
      status: 'paid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      position: 'zzzz',
      type: 'xray',
    };
    const therapyObj = {
      procedure: res3._id,
      status: 'paid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const drugObj = {
      procedure: res4._id,
      status: 'paid',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      route: 'xxx',
      dose: '3',
    };

    const output = await mockServer.get(`/patient/procedures/paid/${res._id}`);
    expect(output.status).toEqual(200);
  });
  it('Can get all active procedures', async()=>{
    const userEntity = {
      username: 'joha',
      password: '846178',
      phone_number: 79794191,
      email: 'joha@hotmail.com',
      role: 'user',
    };
    const entityObj = new db.Entity(userEntity);
    await entityObj.save();
    const user = {
      info: entityObj,
      date_of_birth: '5/5/2005',
      firstname: 'jojo',
      lastname: 'lolo',
      gender: 'female',
      img: 'img3',
      country: 'syria',
      type: 'patient',
    };
    const userObj = new db.User(user);
    await userObj.save();

    const patientObj = {
      userProfile: userObj,
      insuranceStatus: true,
      insurancePolicy: 'anything',
    };

    const patient = new db.Patient(patientObj);
    const res = await patient.save();
        
    const visitObj = {
      patient: res._id,
      timeOpened: '9:00 AM',
    };

    const visit = new db.Visit(visitObj);
    const res0 = await visit.save();
        

    const procedureObj1 = {
      name: 'procedure1',
      code: '6750',
      type: 'lab',
      price: 200,
      expectedTime: '3 hours',
    };
    const procedureObj2 = {
      name: 'procedure2',
      code: '552',
      type: 'radio',
      price: 150,
      expectedTime: '1 hours',
    };
    const procedureObj3 = {
      name: 'procedure3',
      code: '312',
      type: 'therapy',
      price: 50,
      expectedTime: '2 hours',
    };
    const procedureObj4 = {
      name: 'procedure4',
      code: '984',
      type: 'drug',
      price: 100,
      expectedTime: '1 hours',
    };

    const p1= new db.Procedure(procedureObj1);
    const p2= new db.Procedure(procedureObj2);
    const p3= new db.Procedure(procedureObj3);
    const p4= new db.Procedure(procedureObj4);

    const res1 = p1.save();
    const res2 = p2.save();
    const res3 = p3.save();
    const res4 = p4.save();

    const labTestObj = {
      procedure: res1._id,
      status: 'active',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const radioTestObj = {
      procedure: res2._id,
      status: 'active',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      position: 'zzzz',
      type: 'xray',
    };
    const therapyObj = {
      procedure: res3._id,
      status: 'active',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
    };
    const drugObj = {
      procedure: res4._id,
      status: 'active',
      timeAdded: '6:30 PM',
      patient: res._id,
      visitNum: res0._id,
      doctorRequested: 'yes',
      route: 'xxx',
      dose: '3',
    };

    const output = await mockServer.get(`/patient/procedures/active/${res._id}`);
    expect(output.status).toEqual(200);
  });

  it('appointment Get', async()=>{
    const output = await mockServer.get(`/patient/appointment/${res._id}`);
    expect(output.status).toEqual(200);
  });

  it('subscribe Handler', async()=>{

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

    let patientObj={
      userProfile: userSchema1,
      insuranceStatus: true,
      insurancePolicy: 'insurancePolicy',
    };
    const patientProfile=new db.Patient(patientObj);
    const patientProfileSaved=await patientProfile.save();

    const departmentObj ={
      field: 'pharmacy',
      institute: 'institute',
    };
    let department1=new db.Department(departmentObj);
    let department1Saved=await department1.save();

    let entityDoctor={
      username: 'abdallah',
      password: '1234',
      phone_number: 1234,
      email:'abdallah@gmail.com',
      role: 'institute',
    };
    let entityDoctor1=new db.Entity(entityDoctor);
    let entityDoctor1Saved=await entityDoctor1.save();

    const instiuteObj = {
      name: 'mohmmad',
      info: entityDoctor1,
      location:'jordan-amman',
      listOfDeps: [department1],
      type: 'hospital',
    };
    let instiute1=new db.Institute(instiuteObj);
    let instiute1Saved=await instiute1.save();

    const insuranceCompObj = {
      profile: instiute1,
    };
    let insuranceComp1=new db.InsuranceComp(insuranceCompObj);
    let insuranceComp1Saved=await insuranceComp1.save();

    const policyObj = {
      offerCoverage: 80,
      offerName: 'highOffer',
      costPerYear:1500,
      costPerMonth: 50,
     
    };
    let policy1=new db.Policy(policyObj);
    let policy1Saved=await policy1.save();

    let obj={
      patientId:patientProfileSaved.id,
      insuranceComp:insuranceComp1Saved.id,
      policy:policy1Saved.id,
    };
    console.log('patientProfileSaved.id',patientProfileSaved.id);
    console.log(':insuranceComp1Saved.id',insuranceComp1Saved.id);
    console.log('policy1Saved.id',policy1Saved.id);
    const output = await mockServer.post(`/patient/insurance/subscribe`).send(obj);
    expect(output.status).toEqual(200);
  });
});