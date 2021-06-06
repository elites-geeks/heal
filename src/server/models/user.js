'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'mysecret';
const bcrypt = require('bcrypt');


// mongoose schema for admin
const adminSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    phone_number: {type: Number, required: true},
    gender: {type:String,enum: ['male', 'female'], required: true},
    img: {type: Buffer, required:true},
    email: {type: String}
});

// mongoose schema for patient
const patientSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    phone_number: {type: Number, required: true},
    gender: {type:String, enum: ['male', 'female'], required: true},
    img: {type: Buffer, required:true},
    email: {type: String}, 
    token: {type: String, required:true}
});

// mongoose schema for doctor
const doctorSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    phone_number: {type: Number, required: true},
    gender: {type:String, enum: ['male', 'female'], required: true},
    img: {type: Buffer, required:true},
    email: {type: String},
    specialty: { type: String, required: true },
    location: { type: String, required: true },
    clinic_phone_number: { type: Number, required: true },
    yaers_of_exp: { type: Number, required: true},
    
});

// mongoose schema for accountant
const accountantSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    gender: {type:String, enum: ['male', 'female'], required: true},
    phone_number: {type: Number, required: true},
    img: {type: Buffer, required:true},
    email: {type: String},
    institute: {type: String, required:true}
});

// mongoose schema for medical staff
const medicalStaffSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    phone_number: {type: Number, required: true},
    gender: {type:String, enum: ['male', 'female'], required: true},
    img: {type: Buffer, required:true},
    email: {type: String},
    institute: {type: String, required:true}
});

// mongoose schema for insurance company representitave
const insuranceRepSchema = mongoose.Schema({
    name: { 
        firstname: String,
        lastname: String,
    },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date_of_birth: {type: Date, required: true},
    phone_number: {type: Number, required: true},
    gender: {type: String, required: true},
    img: {type: Buffer, required:true},
    email: {type: String},
    institute: {type: String, required:true}
});



// Pre-Save Hook
// usersSchema.pre("save", async function(next) {
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// })

// Authenticate user using bcrypt
// userSchema.statics.authenticateToken = async function(token) {
//     let payload = jwt.verify(token, SECRET);
//     return await this.findOne({username: payload.username});
// }

// Create a mongoose schema
const Admin = mongoose.model('Admin', adminSchema);
const Client = mongoose.model('Client', patientSchema);
const Staff = mongoose.model('Staff', medicalStaffSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const Acountant = mongoose.model('Accountant', accountantSchema);
const InsRep = mongoose.model('InsRep', insuranceRepSchema);

module.exports = {Admin, Doctor, Staff, Acountant, InsRep, Client};