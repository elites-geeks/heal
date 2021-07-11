'use strict';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

let departmentId;
let instiuteId;
let empid;
describe('instiute routing test', () => {

  it('add Department', async ()=> {

    let entityEmployeeObj={
      username: 'saleh',
      password: '1234',
      phone_number: 1234,
      email:'saleh@gmail.com',
      role: 'institute',
    };
    let entityEmployee=new db.Entity(entityEmployeeObj);
    let entityEmployeeSaved=await entityEmployee.save();


    let employeeObj1={
      info: entityEmployee,
      date_of_birth: '12/5/2021',
      firstname: 'areen',
      lastname: 'jaradat',
      gender: 'female',
      img: 'hi',
      country: 'irbid',
      type:'employee',
    };
    let employeeSchema1=new db.User(employeeObj1);
    const employeeSchema1Saved=await employeeSchema1.save();

    const employeeObj = {
      field: 'pharmacy',
      yearsOfExp: 5,
      institute: 'institute',
      info: employeeSchema1,
    };
    let employeeSchema=new db.Employee(employeeObj);
    const employeeSchemaSaved=await employeeSchema.save();
    empid =employeeSchemaSaved.id;

    const departmentObj ={
      field: 'pharmacy',
      institute: 'institute',
    };
    let department1=new db.Department(departmentObj);
    let department1Saved=await department1.save();
    departmentId=department1Saved.id;


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
    instiuteId=instiute1Saved.id;
    let res=await mockRequest.post(`/instiute/departments/${instiute1Saved.id}`).send({
      field: 'lab',
      institute: 'institute',
    });

    expect(res.status).toEqual(201);
  });

  it('get All Departments', async ()=> {

    let res=await mockRequest.get(`/instiute/departments/${instiuteId}`);

    expect(res.status).toEqual(200);
  });
  it('get one Departments', async ()=> {

    let res=await mockRequest.get(`/instiute/departments/single/${departmentId}`);

    expect(res.status).toEqual(200);
  });
  it('delete New Employee)', async ()=> {

    let res=await mockRequest.put(`/instiute/department/employee/${empid}/${departmentId}`);

    expect(res.status).toEqual(204);
  });
//   it('add New Employee)', async ()=> {


//     const employeeObj = {
//       username: 'ali41',
//       password: '1234',
//       phone_number: 1234,
//       email:'omar@gmail.com',
//       role: 'user',
//       date_of_birth: '12/5/2021',
//       firstname: 'areen',
//       lastname: 'jaradat',
//       gender: 'female',
//       img: 'hi',
//       country: 'irbid',
//       type:'employee',
//       field: 'pharmacy',
//       yearsOfExp: 5,
//       institute: 'institute',
//     };
//     let res=await mockRequest.post(`/instiute/department/employee`).send(employeeObj);

//     expect(res.status).toEqual(500);
//   });
});

