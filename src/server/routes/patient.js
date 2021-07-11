'use strict';

const express = require('express');
const patientRoute = express.Router();
const db = require('../models/user');
const moment = require('moment');
// Routes
patientRoute.post('/visit', selfVisitHandler);
patientRoute.post('/appointment/search', appointmentSearchHandler);
patientRoute.post('/appointment/search/:docid', reserveAppointmentHandler);
patientRoute.get('/procedures/pending/:patientid', pendingProceduresHandler);
patientRoute.get('/procedures/paid/:patientid', paidProceduresHanler);
patientRoute.get('/procedures/active/:patientid', activeProceduresHandler);
patientRoute.get('/appointment/:patientid', appointmentGetHandler);
//patientRoute.post('/procedures');
patientRoute.post('/insurance/subscribe', subscribeHandler);
patientRoute.get('/insurance', getInsuranceCompanies);


async function reserveAppointmentHandler(req, res) {
    const { docid } = req.params;
    const { patientId, time, date } = req.body;
    try{

        const newAppoint = new db.Appointment({
            time,
            date
        });
        const savedApp = await newAppoint.save();
        if (savedApp._id) {
            const doctor = await db.Doctor.findByIdAndUpdate(docid, {
                $push: {
                    appointmentList: newAppoint,
                }
            });
            const patient = await db.Patient.findByIdAndUpdate(patientId, {
                $push: {
                    appointmentList: newAppoint,
                }
            });
            res.status(201).json({savedApp, doctor,patient});
        } else {
            next("error while adding appointment")
        }
    }catch(err){
        console.log(err.message)
    }

}

// Routes handlers
async function getInsuranceCompanies(req, res) {
    try {
        const insComps = await db.InsuranceComp.find({});
        res.status(200).json(insComps);
    } catch (error) {
        console.log(error.message);
    }
}

async function selfVisitHandler(req, res) {
    //let id=req.params.id;
    try {
        let { patient } = req.body;
        let newSelfVisit = new db.Visit({
            patient: patient,
            timeOpened: moment().format(),
        });
        let saveSelfVisit = await newSelfVisit.save();
        res.status(200).send(saveSelfVisit);
    } catch (error) {
        console.log(error);
    }
}

async function appointmentSearchHandler(req, res) {
    const { specialty, location, date } = req.body;
    const docs = await db.Doctor.find({ specialty, location });
    const list = docs.filter(doc => {
        const dates = doc.appointmentList.map(appoint => {
            return [appoint.date, appoint.time, appoint.status]
        })
        if (dates.includes([moment(date).format('YYYY-MM-DD'), moment(date).format('HH:mm'), 'new'])) {
            return false;
        } else {
            return true;
        }
    });
    res.status(200).json(list)
}
async function pendingProceduresHandler(req, res) {
    try {
        let id = req.params.patientid;
        let labProcedure = await db.LabTest.find({ status: 'nonpaid', paitent: id });
        let radioProcedure = await db.RadioTest.find({ status: 'nonpaid', paitent: id });
        let therapyProcedure = await db.Therapy.find({ status: 'nonpaid', paitent: id });
        let drugProcedure = await db.Drug.find({ status: 'nonpaid', paitent: id });


        res.status(200).json({ labProcedure, radioProcedure, therapyProcedure, drugProcedure });
    } catch (error) {
        console.log(error);
    }
}
async function paidProceduresHanler(req, res) {
    try {
        let id = req.params.patientid;
        let labProcedure = await db.LabTest.find({ status: 'paid', paitent: id });
        let radioProcedure = await db.RadioTest.find({ status: 'paid', paitent: id });
        let therapyProcedure = await db.Therapy.find({ status: 'paid', paitent: id });
        let drugProcedure = await db.Drug.find({ status: 'paid', paitent: id });
        res.status(200).json({ labProcedure, radioProcedure, therapyProcedure, drugProcedure });
    } catch (error) {
        console.log(error);
    }
}
async function activeProceduresHandler(req, res) {
    try {
        let id = req.params.patientid;
        let labProcedure = await db.LabTest.find({ status: 'active', paitent: id });
        let radioProcedure = await db.RadioTest.find({ status: 'active', paitent: id });
        let therapyProcedure = await db.Therapy.find({ status: 'active', paitent: id });
        let drugProcedure = await db.Drug.find({ status: 'active', paitent: id });
        res.status(200).json({ labProcedure, radioProcedure, therapyProcedure, drugProcedure });
    } catch (error) {
        console.log(error);
    }
}
async function appointmentGetHandler(req, res) {
    try {
        let id = req.params.patientid;
        let obj = await db.Appointment.find({ paitent: id });
        let newObj = await Promise.all(obj.map(async (appointment) => {
            let doctor = await db.Doctor.findById(appointment.doctor);
            return { doctor: doctor, time: appointment.time, status: appointment.status, date: appointment.date };
        }));
        res.status(200).json(newObj);

    } catch (error) {
        console.log(error);
    }
}
async function subscribeHandler(req, res) {
    try {

        let { patientId, insuranceComp, policy } = req.body;
        // console.log(req.body);
        let newSubscribtionRequest = new db.subscribtionRequest({
            patientId: patientId,
            insuranceComp: insuranceComp,
            policy: policy,
            status: 'pinding',

        });
        let saveSubsicribe = await newSubscribtionRequest.save();
        let patient = await db.Patient.findById(patientId);
        let insuinsur = await db.InsuranceComp.findById(insuranceComp);
        let policyy = await db.Policy.findById(policy);
        res.status(200).json({ patient, insuinsur, policyy });
    } catch (error) {
        console.log(error);
    }
}








module.exports = patientRoute;
