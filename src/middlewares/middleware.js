'use strict';

const {
    Entity,
    User,
    Employee,
    Department,
    Doctor,
    Patient,
    Visit,
    LabTest,
    RadioTest,
    Therapy,
    Drug,
    Institute,
    InsuranceComp
} = require('../server/models/user');
async function addEmployee(req, res, next) {
    try {
        const input = req.body;
        if (info.role == 'user') {
            if (info.type == 'employee') {
                const ent = new Entity(input);
                await ent.save();
                const user = new User({
                    info: ent,
                    ...input
                });
                await user.save();
                const emp = new Employee({
                    info: user,
                    ...input
                });
                const empSaved = await emp.save();
                const addToDep = await Department.findOneAndUpdate({
                    institute: input.institute,
                    field: input.field
                }, {
                    $push: {
                        listOFEmployees: emp
                    }
                });
                if (!addToDep) {
                    next('No department to add the employee')
                }
                req.newEmployee = empSaved;
                next()
            } else {
                next("Not An Employee")
            }
        } else {
            next("Not A User")
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function addDoctor(req, res, next) {
    try {

        const input = req.body;
        if (info.role == 'user') {
            if (info.type == 'doctor') {
                const ent = new Entity(input);
                await ent.save();
                const user = new User({
                    info: ent,
                    ...input
                });
                await user.save();
                const doc = new Doctor({
                    info: user,
                    ...input
                });
                const docSaved = await doc.save();
                req.newDoctor = docSaved;
                next()
            } else {
                next("Not a doctor")
            }
        } else {
            next("Not A User")
        }
    } catch (error) {
        console.log(error.message);
    }
}


async function addPatient(req, res, next) {
    try {

        const input = req.body;
        if (info.role == 'user') {
            if (info.type == 'patient') {
                const ent = new Entity(input);
                await ent.save();
                const user = new User({
                    info: ent,
                    ...input
                });
                await user.save();
                const pat = new Patient({
                    info: user,
                    ...input
                });
                const patSaved = await pat.save();
                req.newPatient = patSaved;
                next()
            } else {
                next("Not a patient")
            }
        } else {
            next("Not A User")
        }
    } catch (err) {
        console.log(err.message);
    }
}



async function checkUsername(req, res, next) {
    const {
        username
    } = req.body;
    try {
        const user = await Entity.find({
            username: username
        });
        if (!user) {
            next();
        } else {
            next("Username already Exists")
        }
    } catch (error) {
        console.log(error.message);
    }

}

async function getAllProcedures(req, res, next) {
    try {
        const {
            id
        } = req.params;
        const visit = await Visit.findById(id);
        const allLabTests = visit.lab.map(async (id) => {
            const test = await LabTest.findById(id);
            return test;
        });
        const allDrugs = visit.drug.map(async (id) => {
            const drug = await Drug.findById(id);
            return drug;
        });
        const allRadios = visit.radio.map(async (id) => {
            const radio = await RadioTest.findById(id);
            return radio;
        });
        const allTherapies = visit.therapy.map(async (id) => {
            const therapy = await Therapy.findById(id);
            return therapy;
        });
        req.allProcedures = {
            allLabTests,
            allDrugs,
            allRadios,
            allTherapies
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

async function addHospital(req, res, next) {
    const input = req.body;
    try {
        if (info.role == 'institute') {
            if (info.type == 'hospital') {
                const ent = new Entity(input);
                await ent.save();
                const institute = new Institute({
                    info: ent,
                    ...input
                });
                const savedInst = await institute.save();
                req.newHospital = savedInst;
                next()
            } else {
                next("Not a Hospital")
            }
        } else {
            next("Not an Institute")
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function addInsurance(req, res, next) {
    const input = req.body;
    try {
        if (info.role == 'institute') {
            if (info.type == 'insurance') {
                const ent = new Entity(input);
                await ent.save();
                const institute = new Institute({
                    info: ent,
                    ...input
                });
                await institute.save();
                const insuranceCompany = new InsuranceComp({
                    info:institute,
                    ...input
                });
                const savedIns = await institute.save();
                req.newInsComp = savedIns;
                next()
            } else {
                next("Not an Insurance company")
            }
        } else {
            next("Not an Institute")
        }
    } catch (err) {
        console.log(err.message);
    }
}
