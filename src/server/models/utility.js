'use strict';

const mongoose = require('mongoose');
const {
    Doctors,
    Patients
} = require('/user');

const reservationSchema = mongoose.Schema({
    doctor: {
        type: Doctors,
        required: true
    },
    patient: {
        type: Patients,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    data: {
        type: String
    }
});

const drugSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    dose: {
        type: String,
        required: true
    },
    taken_per_time: {
        enum: ['daily', 'weekly', 'monthly'],
        required: true
    },
    period: {
        type: String,
        required: true
    }
});

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employees: {
        type: String,
        required: true
    }
});

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    notes: {
        type: Number,
        required: true
    },
    timestart: {
        type: String,
        required: true
    },
    timeend: {
        type: String,
        required: true
    },
    expected_time: {
        type: String,
        required: true
    },
    status: {
        enum: ['pending', 'paid', 'active'],
        required: true
    }
});


const reservations = mongoose.model('reservations', reservationSchema);
const drugs = mongoose.model('drugs', drugSchema);
const departments = mongoose.model('departments', departmentSchema);
const tests = mongoose.model('tests', testSchema);

module.exports = {
    reservations,
    drugs,
    departments,
    tests
};
