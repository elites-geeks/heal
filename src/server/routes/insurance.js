'use strict';

const express = require('express');

const employeeRoute = express.Router();

const db = require('../models/user');

employeeRoute.get('/sub-requests/id', getAllRequestsHandler);
employeeRoute.get('/requests/:id', getOneRequestHandler);
// employeeRoute.post('/requests/:id', getOneRequestHandler);
employeeRoute.get('/visits/:insuranceCompanyId', getAllPendingVisitsHndlers);
employeeRoute.get('/visits/:id', getOneVistHandler);
employeeRoute.put('/visits/:id', visitApprovalHandler);
employeeRoute.post('/policies', addPoliciesHandler);
employeeRoute.get('/policies/:insuranceCompanyId', showAllPoliciesHandler);
employeeRoute.get('/policies/:insuranceCompanyId/:policyId', getOnePolicyHandler);
employeeRoute.put('/policies/:policyId', modifyPolicyHandler);
employeeRoute.delete('/policies/:policyId', deletePolicyHandler);
employeeRoute.get('/subscribers/:insCompId', getAllSubscribreshandlers);
employeeRoute.get('/subscribers/:id', getOneSubscriberHandler);
employeeRoute.delete('/subscribers/:insCompId/:patId', deleteSubscriberHandler);


async function getAllRequestsHandler(req, res) {
    try {
        let id = req.params.id;
        let listOfSubscribtionReq = await db.subscribtionRequest.find({
            status: 'pinding',
            insuranceComp: `${id}`
        });
        const newList = listOfSubscribtionReq.map(async (subscribe) => {
            const patient = await db.Patient.findById(subscribe.patientId);
            const policy = await db.Policy.findById(subscribe.policy);
            return {
                patient,
                policy
            };
        });
        res.status(200).send(newList);

    } catch (err) {
        console.log(err);
    }
}

async function getOneRequestHandler(req, res) {
    try {
        let id = req.params.id;
        const subReq = await db.subscribtionRequest.findById(id);
        const patient = await db.Patient.findById(subReq.patientId);
        const policy = await db.Policy.findById(subReq.policy);
        const output = {
            patient,
            policy
        }
        res.status(200).json(JSON.stringify(output));
    } catch (err) {
        console.log(err);
    }
}

async function getAllPendingVisitsHndlers(req, res) {
    try {
        const getAllPendingVisits = await db.VisitApprove.find({
            approval: 'pinding',
            insuranceComp: req.params.insuranceCompanyId
        });
        res.status(200).json(JSON.stringify(getAllPendingVisits));

    } catch (err) {
        console.log(err);
    }
}

async function getOneVistHandler(req, res) {
    try {
        let id = req.params.id;
        const getOneVisit = await db.Visit.findById(id);
        const labtests = getOneVisit.lab.map(id => {
            const labTest = await db.LabTest.findById(id);
            return labTest;
        });
        const radioTests = getOneVisit.radio.map(id => {
            const radioTest = await db.RadioTest.findById(id);
            return radioTest;
        });
        const drugs = getOneVisit.drug.map(id => {
            const drug = await db.Drug.findById(id);
            return drug;
        });
        const therabies = getOneVisit.therapy.map(id => {
            const therapy1 = await db.Therapy.findById(id);
            return therapy1;
        });
        const diagnosis = await db.Diagnosis.findById(getOneVisit.diagnosis);
        const output = {
            labtests,
            radioTests,
            drugs,
            therabies,
            diagnosis
        }
        res.status(200).json(getOnJSON.stringify(output));

    } catch (err) {
        console.log(err);
    }
}

async function visitApprovalHandler(req, res) {
    try {
        let id = req.params.id;
        let approval = req.body;
        const approveVisit = await db.VisitApprove.findByIdAndUpdate(id, {
            approval: approval
        });
        res.status(204).send(approveVisit);

    } catch (err) {
        console.log(err);
    }
}

async function addPoliciesHandler(req, res) {

    try {
        let {
            offerCoverage,
            offerName,
            costPerYear,
            costPerMonth,
            patientsSubscribed
        } = req.body;
        console.log(req.body);
        const newPolicy = new db.Policy({
            offerCoverage: offerCoverage,
            offerName: offerName,
            costPerYear: costPerYear,
            costPerMonth: costPerMonth,
            patientsSubscribed: patientsSubscribed,
        });
        const savenewPolicy = await newPolicy.save();

        res.status(201).send(savenewPolicy);
    } catch (err) {
        console.log(err);
    }

}
async function showAllPoliciesHandler(req, res) {
    try {
        const {
            insuranceCompanyId
        } = req.params;
        const getCompany = await db.InsuranceComp.findById(insuranceCompanyId);
        const allPolicies = getCompany.listOfPolicies;
        res.status(200).json(JSON.stringify(allPolicies));
    } catch (err) {
        console.log(err);
    }

}

async function getOnePolicyHandler(req, res) {
    try {
        const {
            insuranceCompanyId,
            policyId
        } = req.params;
        const getInsurance = await db.InsuranceComp.find({
            _id = insuranceCompanyId
        });
        const policy = getInsurance.listOfPolicies.find(policy => {
            return policy._id == policyId;
        });
        res.status(200).send(policy);
    } catch (err) {
        console.log(err);
    }
}

async function modifyPolicyHandler(req, res) {
    const {
        policyId
    } = req.params;
    try {
        let obj = req.body;
        const updatePolicy = await db.Policy.findByIdAndUpdate(policyId, obj);
        res.status(204).send(updatePolicy);
    } catch (err) {
        console.log(err);
    }
}
async function deletePolicyHandler(req, res) {
    try {
        let id = req.params.policyId;

        const deletePolicy = await db.Policy.findByIdAndDelete(id);
        res.status(204).send(deletePolicy);
    } catch (err) {
        console.log(err);
    }
}

async function getAllSubscribreshandlers(req, res) {
    const {
        insCompId
    } = req.params;
    try {
        const insComp = await db.InsuranceComp.findById(insCompId);
        const subs = insComp.listOfSubscribers.map(subID => {
            const sub = await db.Patient.findById(subID);
            return sub;
        });
        res.status(200).json(JSON.stringify(subs));
    } catch (err) {
        console.log(err);
    }
}

async function getOneSubscriberHandler(req, res) {
    try {
        let id = req.params.id;
        const getOneSubscribres = await db.Patient.findById(id);
        
        res.status(200).json(JSON.stringify(getOneSubscribres));
    } catch (err) {
        console.log(err);
    }
}
async function deleteSubscriberHandler(req, res) {
  const {insCompId, patId} = req.params;
    try {
        const insComp = await db.InsuranceComp.findByIdAndUpdate(insCompId,{$pull:{_id:patId}});
        res.status(204).send(JSON.stringify(insComp));
    } catch (err) {
        console.log(err);
    }
}
module.exports = employeeRoute;
