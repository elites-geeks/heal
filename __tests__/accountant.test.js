'use struct';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);


let visitId;
let accountantId;
describe('accountant routing test', () => {

  it('get Visit Handler', async ()=> {

   

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
    //console.log(doctorprofileSaved)
    
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

    const accountantSchemaObj = {
      username: 'ahmad',
      password: 'sds',
      phone_number: 546455678,
      email: 'afasdf',
      role:'institute',
    };
    let accountantSchema=new db.Entity(accountantSchemaObj);
    let accountantSchemaSaved=await accountantSchema.save();
    accountantId=accountantSchemaSaved.id;
    const accountanObj = {
      info:accountantSchema,
      date_of_birth: '12/4/66',
      firstname: 'ahmad',
      lastname: 'mohmmad',
      gender: 'male',
      img: 'saf',
      country: 'amman',
      type:'employee',
    };
    let accountanObj1=new db.User(accountanObj);
    let accountanObj1Saved=await accountanObj1.save();
    accountantId=accountanObj1Saved.id;

    //console.log(accountantSchemaSaved)

    const accountantemployeeObj = {
      field:'account',
      yearsOfExp: 4,
      institute: 'institute',
      info:accountanObj1,
      patientsServed: [userSaved.id],
    };
  
    let accountantemployee=new db.Employee(accountantemployeeObj);
    let accountantemployeeSaved=await accountantemployee.save();
    accountantId=accountantemployeeSaved._id;


    let res=await mockRequest.get(`/accountant/visit/${visitId}`);
    //console.log('res.body',res.body)
    //console.log(res.body);
    // console.log(res.body.);
    expect(res.status).toEqual(200);
    expect(res.body.appoitmentNum).toEqual('1');
    expect(res.body.timeOpened).toEqual('5/15/2021');
  });
    // it('confirm Payment Handler', async ()=> {
    //   let res=await mockRequest.put(`/accountant/visit/${visitId}/${accountantId}`);
    
    //   expect(res.status).toEqual(204);
    // });

  it('get Patient Served', async ()=> {
    let res=await mockRequest.get(`/accountant/patients-served/${accountantId}`);
    //console.log('res.body',res.body)
   // console.log(res.body);
    // console.log(res.body.);
    expect(res.status).toEqual(200);
  });

  it('get Patient Served', async ()=> {
    let res=await mockRequest.get(`/accountant/account`);
   
    expect(res.status).toEqual(404);
  });

});