'use strict';
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'mysecret';
const bcrypt = require('bcrypt');
const {
  trim,
} = require('jquery');

const entitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'institute'],
  },
});

const userSchema = mongoose.Schema({
  info: {
    type: entitySchema,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['patient', 'doctor', 'employee', 'admin'],
  },
});

const employeeSchema = mongoose.Schema({
  field: {
    type: String,
    enum: ['admin', 'radio', 'lab', 'account', 'pharmacy', 'insurance', 'therapy'],
    required: true,
  },
  yearsOfExp: {
    type: Number,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  info: {
    type: userSchema,
    required: true,
  },
  patientsServed: {
    type: [String],
  },
});

const departmentSchema = mongoose.Schema({
  field: {
    type: String,
    enum: ['admin', 'radio', 'lab', 'account', 'pharmacy', 'insurance', 'therapy'],
    required: true,
  },
  listOFEmployees: [employeeSchema],
  institute: {
    type: String,
    required: true,
  },
});

const instiuteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: entitySchema,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  listOfDeps: {
    type: [departmentSchema],
  },
  type: {
    type: String,
    required: true,
    enum: ['hospital', 'medical', 'insurance'],
  },
});

const policySchema = mongoose.Schema({
  offerCoverage: {
    type: Number,
    required: true,
  },
  offerName: {
    type: String,
    required: true,
  },
  costPerYear: {
    type: Number,
    required: true,
  },
  costPerMonth: {
    type: Number,
    required: true,
  },
  patientsSubscribed: {
    type: [String],
  },
});

const visitSchema = mongoose.Schema({
  appoitmentNum: {
    type: String
  },
  patient: {
    type: String,
    required: true
  },
  doctor: {
    type: String
  },
  diagnosis: {
    type: String
  },
  lab: {
    type: [String]
  },
  radio: {
    type: [String]
  },
  drug: {
    type: [String]
  },
  therapy: {
    type: [String]
  },
  timeOpened: {
    type: String,
    required: true
  },
  timeEnded: {
    type: String
  },
  accountant:{
    type:String
  }
});
const insuranceCompSchema = mongoose.Schema({
  profile: {
    type: instiuteSchema,
    required: true,
  },
  listOfPolicies: {
    type: [policySchema],
  },
  listOfSubscribers: {
    type: [String],
  },
  listOfAccreditedInstitution: {
    type: [String],
  },
  listOfAccreditedDoctors: {
    type: [String],
  },
});
const subscribtionRequestSchema=mongoose.Schema({
  patientId:{
    type:String,
    required:true,
  },
  insuranceComp:{
    type:String,
    required:true,
  },
  policy:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    required:true,
    enum:['pinding','approved','rejected'],
  },
});
const doctorSchema = mongoose.Schema({
  userProfile: {
    type: userSchema,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  clinicLocation: {
    type: String,
    required: true,
  },
  clinicPhoneNumber: {
    type: Number,
    required: true,
  },
  yearsOfExp: {
    type: Number,
    required: true,
  },
  listOfAccreditedInsuranceComp: {
    type: [String],
  },
  appointmentList: {
    type: [String],
  },
});
const visitSchema = mongoose.Schema({
  appoitmentNum: {
    type: String,
  },
  patient: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  lab: {
    type: [String],
  },
  radio: {
    type: [String],
  },
  drug: {
    type: [String],
  },
  therapy: {
    type: [String],
  },
  timeOpened: {
    type: String,
    required: true,
  },
  timeEnded: {
    type: String,
  },
  accountant:{
    type:String,
  },
});

const patientHistorySchema = mongoose.Schema({
  medicalState: {
    type: [String],
    required: true,
  },
  visits: {
    type: [visitSchema],
  },  
});

const patientSchema = mongoose.Schema({
  userProfile: {
    type: userSchema,
    required: true,
  },
  insuranceStatus: {
    type: Boolean,
    required: true,
  },
  insurancePolicy: {
    type: String,
  },
  appointmentList: {
    type: [String],
  },
  patientHistory:{type:patientHistorySchema,
    required:true},
});

const procedureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['lab', 'radio', 'therapy', 'drug'],
  },
  notes: {
    type: [String],
  },
  price: {
    type: Number,
    required: true,
  },
  expectedTime: {
    type: String,
    required: true,
  },

});

const labTestsSchema = mongoose.Schema({
  procedure: {
    type: String,
  },
  status: {
    type: String,
    enum: ['paid', 'active', 'nonpaid', 'done', 'deleted'],
    required: true,
  },
  timeAdded: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },
  patient: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: [String],
  },
  result: {
    type: String,
  },
  visitNum: {
    type: String,
    required: true,
  },
});
const drugSchema = mongoose.Schema({
  procedure: {
    type: String,
  },
  status: {
    type: String,
    enum: ['paid', 'active', 'nonpaid', 'done', 'deleted'],
    required: true,
  },
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },
  patient: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: [String],
  },
  route: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  doctorRequested: {
    type: String,
    required: true,
  },
  timeAdded: {
    type: String,
    required: true,
  },
  visitNum: {
    type: String,
    required: true,
  },
});

const radioTestSchema = mongoose.Schema({
  procedure: {
    type: String,
  },
  status: {
    type: String,
    enum: ['paid', 'active', 'nonpaid', 'done', 'deleted'],
    required: true,
  },
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },
  patient: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: [String],
  },
  timeAdded: {
    type: String,
    required: true,
  },
  doctorRequested: {
    type: String,
    required: true,
  },
  result: {
    type: String,
  },
  position: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['ct', 'xray', 'ultrasound', 'mri', 'nervous'],
  },
  visitNum: {
    type: String,
    required: true,
  },
});

const therapySchema = mongoose.Schema({
  procedure: {
    type: String,
  },
  visitNum: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['paid', 'active', 'nonpaid', 'done', 'deleted'],
    required: true,
  },
  timeAdded: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
  },
  timeEnd: {
    type: String,
  },
  patient: {
    type: String,
    required: true,
  },
  additionalNotes: {
    type: [String],
  },
  result: {
    type: String,
  },
  doctorRequested: {
    type: String,
    required: true,
  },
});

const diagnosisSchema = mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  visitNum: {
    type: String,
    required: true,
  },
  timeWritten: {
    type: String,
    required: true,
  },
  signs: {
    type: [String],
    required: true,
  },
  sypmtoms: {
    type: [String],
    required: true,
  },
  finalDiagnosis: {
    type: String,
    required: true,
  },
});

const appointmentSchema = mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  patient: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date:{
    type:String,
    required:true,
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'active', 'history', 'deleted', 'missed'],
  },
});

const visitApprove=mongoose.Schema({
  visitNumber:{
    type :String,
    required:true,
  },
  insuranceComp:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum:['approved','notapproved','pinding'],
  },
});

entitySchema.virtual('token').get(function () {
  let tokenObject = {
    username: this.username,
  };
  return jwt.sign(tokenObject, process.env.SECRET);
});

visitSchema.virtual('token').get(function () {
  let tokenObject = {
    tokenId: this._id,
  };
  return jwt.sign(tokenObject, process.env.SECRET);
});


visitSchema.pre('save',async function (){
  if(this.isModified('accountant')){
    const acco = Employee.findById(this.accountant);
    this.token = jwt.sign({
      tokenId:this._id,
      accountant:acco.institute,
    }, process.env.SECRET);
  }
});

// Pre-Save Hook
entitySchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


entitySchema.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    // console.log(parsedToken);
    const user = await this.findOne({
      username: parsedToken.username,
    });
    // console.log(user);
    if (user) {
      return user;
    }
    throw new Error('User Not Found');
  } catch (e) {
    throw new Error(e.message);
  }
};

entitySchema.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    writer: ['read', 'create'],
    editor: ['read', 'create', 'update'],
    admin: ['read', 'create', 'update', 'delete'],
  };
  return acl[this.role];
});

// Create a mongoose schema
// const Admin = mongoose.model('Admin', adminSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Employee = mongoose.model('Employee', employeeSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);
const PatientHistory = mongoose.model('PatientHistory', patientHistorySchema);
const Entity = mongoose.model('Entity', entitySchema);
const User = mongoose.model('User', userSchema);
const Visit = mongoose.model('Visit', visitSchema);
const Appointment = mongoose.model('Appointment', appointmentSchema);
const Therapy = mongoose.model('Therapy', therapySchema);
const RadioTest = mongoose.model('Radio', radioTestSchema);
const LabTest = mongoose.model('LabTest', labTestsSchema);
const Drug = mongoose.model('Drug', drugSchema);
const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);
const Procedure = mongoose.model('Procedure', procedureSchema);
const InsuranceComp = mongoose.model('InsuranceComp', insuranceCompSchema);
const Policy = mongoose.model('Policy', policySchema);
const Institute = mongoose.model('Institute', instiuteSchema);
const Department = mongoose.model('Department', departmentSchema);
const VisitApprove = mongoose.model('VisitApprove', visitApprove);
const subscribtionRequest = mongoose.model('subscribtionRequest', subscribtionRequestSchema);
module.exports = {
  Patient,
  Employee,
  Doctor,
  PatientHistory,
  Entity,
  User,
  Visit,
  Appointment,
  Therapy,
  RadioTest,
  LabTest,
  Drug,
  Diagnosis,
  Procedure,
  InsuranceComp,
  Policy,
  Institute,
  Department,
  VisitApprove,
  subscribtionRequest,
};
