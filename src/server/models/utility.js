'use strict';

const mongoose = require('mongoose');
const {Admins, Doctors, Staff, Acountants, InsuranceRepresentatives, Patients} = require('/user');

const reservationSchema = mongoose.Schema({
    doctor: {type: Doctors, required: true},
    patient: {type: patient, required:true},
    time: {type: Date, required:true},
    data: {type: String} 
});

const drugSchema = mongoose.Schema({
    name: {type: String, required: true},
    route: {type: String, required: true},
    dose: {type: String, required: true},
    taken_per_time: {
        enum: ['daily', 'weekly','monthly'],
        required: true  
    },
    period: {type: String, required: true} 
});

const departmentSchema = mongoose.Schema({
    name: {type: String, required: true},
    employees: {type: String, required: true}
});

const testSchema  = mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    notes: {type: Number, required: true},
    timestart: {type: Date, required: true},
    timeend: {type: Date, required: true},
    expected_time: {type: String, required: true}
});


const reservations = mongoose.model('reservations', reservationSchema);
const drugs = mongoose.model('drugs', drugSchema);
const departments = mongoose.model('departments', departmentSchema);
const tests = mongoose.model('tests', testSchema);

module.exports = {reservations, drugs,departments,tests};