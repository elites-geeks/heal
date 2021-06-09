'use strict'

const supergoose= require('@code-fellows/supergoose');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockServer = supergoose(app);

describe('Testing \'doctor\' routes: ', ()=> {
    let x;
    let y;
    it('Can get all new appointments', async ()=>{
        const userEntity={
            username: 'Ali',
            password: '12345678',
            phone_number: 798031142,
            email:'zaa92reer@gmail.com',
            role: 'user',
        };
        
        const entityObj=new db.Entity(userEntity);
        await entityObj.save();
        
        let user={
            info: entityObj,
            date_of_birth: '30/1/1992',
            firstname: 'mohammad',
            lastname: 'zaareer',
            gender: 'male',
            img: 'bla bla bla',
            country: 'jordan',
            type:'doctor',
        };
        
        let userObj=new db.User(user);
        await userObj.save();

        const userEntity1={
            username: 'Ahmed',
            password: '12364119678',
            phone_number: 7980142,
            email:'wwww@gmail.com',
            role: 'user',
        };
        
        const entityObj1=new db.Entity(userEntity1);
        await entityObj1.save();
        
        let user1={
            info: entityObj1,
            date_of_birth: '15/1/1995',
            firstname: 'samer',
            lastname: 'ali',
            gender: 'male',
            img: 'bla bla bla',
            country: 'jordan',
            type:'patient',
        };
        
        let userObj1=new db.User(user1);
        await userObj1.save();

        let patientObj = {
            userProfile: userObj1,
            insuranceStatus: true,
            insurancePolicy: "anything", 
        }

        let doctorObj = {
            userProfile: userObj,
            specialty: 'anything',
            clinicLocation: 'Amman-Jordan',
            clinicPhoneNumber: 798031142,
            yearsOfExp: 15,
        }

        let doctor=new db.Doctor(doctorObj);
        let patient=new db.Patient(patientObj);
        x=  await doctor.save();
        y=  await patient.save();

        const appointmentObj1 = {
            doctor: x._id,
            patient: y._id,
            time: '5:30 PM',
            date: '22/5/2020',
            status: 'new'
        }
        const appointmentObj2 = {
            doctor: '1',
            patient: '5',
            time: '3:30 PM',
            date: '10/4/2018',
            status: 'new'
        }

        const appointment1 = new db.Appointment(appointmentObj1);
        const appointment2 = new db.Appointment(appointmentObj2);
        await appointment1.save();
        await appointment2.save();

        const res = await mockServer.get(`/doctor/appointment/${x.id}`);
        expect(res.status).toEqual(200);
    });
    it('Can write diagnosis', async ()=>{
        const diagnosisObj = {
            patient: '17',
            doctor: '9',
            visitNum: '5',
            timeWritten: '13/6/2021',
            signs: ['sign1', 'sign2'],
            sypmtoms: ['sypmtom1', 'sypmtom2'],
            finalDiagnosis: 'Covid-19'
        }

        const visitObj = {
            appoitmentNum: '33',
            patient: y._id,
            doctor: x._id,
            diagnosis: '4',
            timeOpened: '6:30 PM',
        }
        const diagnosis = new db.Diagnosis(diagnosisObj);
        await diagnosis.save();
        const visit = new db.Visit(visitObj);
        const v = await visit.save();
    
        const res = await mockServer.post(`/doctor/diagnosis/${v._id}`).send({
            signs: ['sign10', 'sign12'],
            sypmtoms: ['sypmtom6', 'sypmtom9'],
            finalDiagnosis: 'covid-20'
        });
        expect(res.status).toEqual(201);
    });
    // it('Can add procedures', ()=>{});
});