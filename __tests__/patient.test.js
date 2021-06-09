'use strict'

require('@code-fellows/supergoose');
const supertest = require('supertest');
const { app } = require('../src/server/server.js');
const db = require('../src/server/models/user');
const mockServer = supertest(app);

describe('Testing patient routes', () => {
    // it('Can make a new self-visit', async ()=>{
    //     let res;
    //     const userEntity = {
    //         username: 'Ali',
    //         password: '12345678',
    //         phone_number: 798031142,
    //         email: 'zaa92reer@gmail.com',
    //         role: 'user',
    //     };
    //     const entityObj = new db.Entity(userEntity);
    //     await entityObj.save();
    //     const user = {
    //         info: entityObj,
    //         date_of_birth: '30/1/1992',
    //         firstname: 'mohammad',
    //         lastname: 'zaareer',
    //         gender: 'male',
    //         img: 'bla bla bla',
    //         country: 'jordan',
    //         type: 'doctor',
    //     };
    //     const userObj = new db.User(user);
    //     await userObj.save();

    //     const patientObj = {
    //         userProfile: userObj,
    //         insuranceStatus: true,
    //         insurancePolicy: 'anything',
    //     };

    //     const patient = new db.Patient(patientObj);
    //     res = await patient.save();

    //     const visitObj = {
    //         patient: res._id,
    //         timeOpened: '4:00 AM',
    //     }
        
    //     const out = await mockServer.post('/patient/visit').send(visitObj);
    //     expect(out.status).toEqual(200);
    // });
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
        }

        const visit = new db.Visit(visitObj);
        const res0 = await visit.save();
        

        const procedureObj1 = {
            name: 'procedure1',
            code: '6750',
            type: 'lab',
            price: 200,
            expectedTime: '3 hours'
        };
        const procedureObj2 = {
            name: 'procedure2',
            code: '552',
            type: 'radio',
            price: 150,
            expectedTime: '1 hours'
        };
        const procedureObj3 = {
            name: 'procedure3',
            code: '312',
            type: 'therapy',
            price: 50,
            expectedTime: '2 hours'
        };
        const procedureObj4 = {
            name: 'procedure4',
            code: '984',
            type: 'drug',
            price: 100,
            expectedTime: '1 hours'
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
            doctorRequested: 'yes'
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
            doctorRequested: 'yes'
        };
        const drugObj = {
            procedure: res4._id,
            status: 'nonpaid',
            timeAdded: '6:30 PM',
            patient: res._id,
            visitNum: res0._id,
            doctorRequested: 'yes',
            route: 'xxx',
            dose: '3'
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
        }

        const visit = new db.Visit(visitObj);
        const res0 = await visit.save();
        

        const procedureObj1 = {
            name: 'procedure1',
            code: '6750',
            type: 'lab',
            price: 200,
            expectedTime: '3 hours'
        };
        const procedureObj2 = {
            name: 'procedure2',
            code: '552',
            type: 'radio',
            price: 150,
            expectedTime: '1 hours'
        };
        const procedureObj3 = {
            name: 'procedure3',
            code: '312',
            type: 'therapy',
            price: 50,
            expectedTime: '2 hours'
        };
        const procedureObj4 = {
            name: 'procedure4',
            code: '984',
            type: 'drug',
            price: 100,
            expectedTime: '1 hours'
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
            doctorRequested: 'yes'
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
            doctorRequested: 'yes'
        };
        const drugObj = {
            procedure: res4._id,
            status: 'paid',
            timeAdded: '6:30 PM',
            patient: res._id,
            visitNum: res0._id,
            doctorRequested: 'yes',
            route: 'xxx',
            dose: '3'
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
        }

        const visit = new db.Visit(visitObj);
        const res0 = await visit.save();
        

        const procedureObj1 = {
            name: 'procedure1',
            code: '6750',
            type: 'lab',
            price: 200,
            expectedTime: '3 hours'
        };
        const procedureObj2 = {
            name: 'procedure2',
            code: '552',
            type: 'radio',
            price: 150,
            expectedTime: '1 hours'
        };
        const procedureObj3 = {
            name: 'procedure3',
            code: '312',
            type: 'therapy',
            price: 50,
            expectedTime: '2 hours'
        };
        const procedureObj4 = {
            name: 'procedure4',
            code: '984',
            type: 'drug',
            price: 100,
            expectedTime: '1 hours'
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
            doctorRequested: 'yes'
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
            doctorRequested: 'yes'
        };
        const drugObj = {
            procedure: res4._id,
            status: 'active',
            timeAdded: '6:30 PM',
            patient: res._id,
            visitNum: res0._id,
            doctorRequested: 'yes',
            route: 'xxx',
            dose: '3'
        };

        const output = await mockServer.get(`/patient/procedures/active/${res._id}`);
        expect(output.status).toEqual(200);
    });
});