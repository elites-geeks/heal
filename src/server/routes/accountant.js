'use strict';

const express = require('express');
const {
    Employee,
    Visit,
    LabTest,
    RadioTest,
    Drug,
    Therapy,
    Patient
} = require('../models/user');
const accountantRoute = express.Router();

accountantRoute.get('/visit/:id', getVisitHandler);
accountantRoute.put('/visit/:visid/:accid', confirmPaymentHandler);
accountantRoute.get('/patients-served', getPatientServedHandler);

async function getVisitHandler(req, res) {
    const {
        id
    } = req.params;
    try {

        const visit = await Visit.findById(id);
        res.status(200).json(JSON.stringify(visit))
    } catch (error) {
        console.log(error.message);
    }
}
async function confirmPaymentHandler(req, res) {
    const accId = req.params.accid;
    const visitId = req.params.visid;
    try {

        let visit = await Visit.findByIdAndUpdate(visitId, {
            accountant: accId
        });
        await Employee.findByIdAndUpdate(accId, {
            $push: {
                patientsServed: visit.patient
            }
        })
        visit.lab.forEach(async id => {
            await LabTest.findByIdAndUpdate(id, {
                status: 'paid'
            })
        });
        visit.radio.forEach(async id => {
            await RadioTest.findByIdAndUpdate(id, {
                status: 'paid'
            })
        });
        visit.drug.forEach(async id => {
            await Drug.findByIdAndUpdate(id, {
                status: 'paid'
            })
        });
        visit.therapy.forEach(async id => {
            await Therapy.findByIdAndUpdate(id, {
                status: 'paid'
            })
        });
        visit = await Visit.findById(visitId);
        const resp = {
            token: visit.token
        }
        res.status(204).json(JSON.stringify(resp))
    } catch (error) {
        console.log(error.message);
    }
}

async function getPatientServedHandler(req, res) {
    try {

        const {
            accid
        } = req.params;
        const accountant = await Employee.findById(accid);
        const pateintServed = accountant.patientsServed.map(async (id) => {
            const pateint = await Patient.findById(id);
            return pateint
        });
        res.status(200).json(JSON.stringify(pateintServed));
    } catch (error) {
        console.log(error.message);
    }
}
