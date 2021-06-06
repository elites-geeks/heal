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
    departments: {type : Array, required: true},
    policy: {type: policySchema, required:true}
});

const policySchema = mongoose.Schema ({
    insurance_comp_name: {type: String, required: true},
    offer_name: {type: String, required: true},
    offer_Cost: {type: Number, required: true},
    offer_Coverage: {type: Number, required: true}
}) 
const hospitals = mongoose.model('hospitals', hospitalSchema);
const healthCareInstitutes = mongoose.model('healthCareInstitutes', healthCareInsSchema);
const insuranceCompanies = mongoose.model('insuranceCompanies', insuranceCompanySchema);
const polycies = mongoose.model('polycies', policySchema);

module.exports= {hospitals, healthCareInstitutes, insuranceCompanies};
