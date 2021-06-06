'use strict';

const mongoose = require('mongoose');

// mongoose schema for hospital
const hospitalSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {
        street: String,
        city: String,
        required: true
    },
    telephone: {type: Number, required: true},
    departments: {type : Array, required: true}
});

// mongoose schema for health care institute
const healthCareInsSchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {
        street: String,
        city: String,
        required: true
    },
    telephone: {type: Number, required: true},
    departments: {type : Array, required: true}
});

// mongoose schema for insurance company
const insuranceCompanySchema = mongoose.Schema({
    name: {type: String, required: true},
    address: {
        street: String,
        city: String,
        required: true
    },
    telephone: {type: Number, required},
    departments: {type : Array, required: true}
});

const hospitals = mongoose.model('hospitals', hospitalSchema);
const healthCareInstitutes = mongoose.model('healthCareInstitutes', healthCareInsSchema);
const insuranceCompanies = mongoose.model('insuranceCompanies', insuranceCompanySchema);

module.exports= {hospitals, healthCareInstitutes, insuranceCompanies};
