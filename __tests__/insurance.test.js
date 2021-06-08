'use struct';

const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server/server.js');
const db = require('../src/server/models/user');
const mockRequest = supergoose(app);

let id;
let policyid;
let patientId;
let subscribtionRequestId;
let visitId;

describe('insurance routing test', () => {
  it('can post new policy', async () => {
    let entityDoctor = {
      username: 'abdallah',
      password: '1234',
      phone_number: 1234,
      email: 'abdallah@gmail.com',
      role: 'institute',
    };
    let entityDoctor1 = new db.Entity(entityDoctor);
    await entityDoctor1.save();

    let doctorObj = {
      info: entityDoctor1,
      date_of_birth: '12/5/2021',
      firstname: 'areen',
      lastname: 'jaradat',
      gender: 'female',
      img: 'hi',
      country: 'irbid',
      type: 'patient',
    };
    let doctorSchema1 = new db.User(doctorObj);
    await doctorSchema1.save();

    const doctorprofileObj = {
      userProfile: doctorSchema1,
      specialty: 'doctor',
      clinicLocation: 'irbid',
      clinicPhoneNumber: 124235,
      yearsOfExp: 5,
      listOfAccreditedInsuranceComp: ['company1', 'company1'],

    };
    let doctor = new db.Doctor(doctorprofileObj);
    const doctorprofileSaved = await doctor.save();


    let entityPatient = {
      username: 'areen',
      password: '1234',
      phone_number: 1234,
      email: 'areen@gmail.com',
      role: 'user',
    };
    let entityPatient1 = new db.Entity(entityPatient);
    await entityPatient1.save();


    let userObj = {
      info: entityPatient1,
      date_of_birth: '12/5/2021',
      firstname: 'areen',
      lastname: 'jaradat',
      gender: 'female',
      img: 'hi',
      country: 'irbid',
      type: 'patient',
    };
    let userSchema1 = new db.User(userObj);
    const userSaved = await userSchema1.save();

    const visitObj = {
      appoitmentNum: '1',
      patient: userSaved.id,
      doctor: doctorprofileSaved.id,
      timeOpened: '5/15/2021',

    };
    const vist = new db.Visit(visitObj);
    const vistSaved = await vist.save();

    visitId = vistSaved.id

    const patientHistoryObj = {
      medicalState: ['surgery'],

    };

    const patientHistory = new db.PatientHistory(patientHistoryObj);
    const patientHistorySaved = await patientHistory.save();

    patientId = patientHistorySaved.id;

    let patientObj = {
      userProfile: userSchema1,
      insuranceStatus: true,
      insurancePolicy: 'insurancePolicy',
      patientHistory: patientHistory,
    };
    const patientProfile = new db.Patient(patientObj);
    const patientProfileSaved = await patientProfile.save();
    const policyObj = {
      offerCoverage: 80,
      offerName: 'new',
      costPerYear: 150,
      costPerMonth: 4,
    };
    const Policy = new db.Policy(policyObj);
    const PolicySaved = await Policy.save();

    policyid = PolicySaved.id;

    const entityInsuranceObj = {
      username: 'omarRamadan',
      password: '1234',
      phone_number: 53466,
      email: 'omarRamadan@yahoo.com',
      role: 'institute',
    };
    const entityInsurance = new db.Entity(entityInsuranceObj);
    await entityInsurance.save();
    const departmenInsurancetObj = {

      field: 'insurance',
      institute: 'omarInsuranceComp',
    };
    const departmenInsurance = new db.Department(departmenInsurancetObj);
    await departmenInsurance.save();
    const instiuteObj = {
      name: 'omarInsuranceComp',
      info: entityInsurance,
      location: 'amman',
      listOfDeps: [departmenInsurance],
      type: 'insurance',
    };
    const instiute = new db.Institute(instiuteObj);
    await instiute.save();
    const insuranceCompObj = {
      profile: instiute,
      listOfPolicies: [Policy],
    };
    const insuranceComp = new db.InsuranceComp(insuranceCompObj);
    const insuranceCompSaved = await insuranceComp.save();
    const subscribtionRequestObj = {
      patientId: patientProfileSaved.id,
      insuranceComp: insuranceCompSaved.id,
      policy: PolicySaved.id,
      status: 'pinding',
    };
    const subscribtionReq = new db.subscribtionRequest(subscribtionRequestObj);
    const subscribtionRequestSaved = await subscribtionReq.save();
    subscribtionRequestId = subscribtionRequestSaved.id;
    id = insuranceCompSaved.id;
    let res = await mockRequest.post('/insurance/policies').send({
      "company": "company",
      "offerCoverage": 60,
      "offerName": "offerName",
      "costPerYear": 15,
      "costPerMonth": 100,
      "patientsSubscribed": ["patientsSubscribed", "patientsSubscribed"]
    });
    expect(res.status).toEqual(201);
  });

  it('can get get All Requests', async () => {
    let res = await mockRequest.get(`/insurance/sub-requests/${id}`)
    expect(res.status).toEqual(200);
  });

  it('can get policy with id', async () => {
    let res = await mockRequest.get(`/insurance/policies/${id}`)
    expect(res.status).toEqual(200);
    expect(res.body[0].offerCoverage).toEqual(80);
  });

  it('can get policy with id', async () => {
    let res = await mockRequest.get(`/insurance/policies/${id}/${policyid}`)
    expect(res.status).toEqual(200);
    expect(res.body.offerCoverage).toEqual(80);
  });

  it('can modify policy with id', async () => {
    let res = await mockRequest.put(`/insurance/policies/${policyid}`).send({
      "company": "company",
      "offerCoverage": 60,
      "offerName": "offerName",
      "costPerYear": 15,
      "costPerMonth": 100,
      "patientsSubscribed": ["patientsSubscribed", "patientsSubscribed"]
    });

    expect(res.status).toEqual(204);
  });
  it('can delete policy with id', async () => {
    const policyObj = {
      offerCoverage: 80,
      offerName: 'new',
      costPerYear: 150,
      costPerMonth: 4,
    };
    const Policy = new db.Policy(policyObj);
    const PolicySaved = await Policy.save();
    let res = await mockRequest.delete(`/insurance/policies/${PolicySaved.id}`)
    expect(res.status).toEqual(204);
  });

  it('can get All Subscribres', async () => {
    let res = await mockRequest.get(`/insurance/subscribers/${id}`)
    expect(res.status).toEqual(200);
  });

  it('can get One Subscriber', async () => {
    let res = await mockRequest.get(`/insurance/subscriber/${patientId}`)
    expect(res.status).toEqual(200);
  });


  it('can delete Subscriber', async () => {
    let res = await mockRequest.delete(`/insurance/subscribers/${id}/${patientId}`)
    expect(res.status).toEqual(204);
  });

  it('can get One request handler', async () => {
    let res = await mockRequest.get(`/insurance/requests/${subscribtionRequestId}`)
    expect(res.status).toEqual(200);
    expect(res.body.patient.userProfile.info.username).toEqual('areen');
  });

  it('get All visit Pending Visits', async () => {
    let res = await mockRequest.get(`/insurance/visits/${id}`)
    expect(res.status).toEqual(200);
  });

  it('get One visit Pending Visits', async () => {
    let res = await mockRequest.get(`/insurance/visit/${visitId}`)
    expect(res.status).toEqual(200);
  });
});