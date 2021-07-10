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
  InsuranceComp,
} = require('../server/models/user');
async function addEmployee(req, res, next) {
    console.log('add employee');
    try {
      console.log('add employee2');
    const input = req.body;
        console.log(input)
    if (input.role == 'user') {
      if (input.type == 'employee') {
        console.log(input.type);
        const ent = new Entity({...input,role:input.filed});
        await ent.save();
        const user = new User({
          info: ent,
          ...input,
        });
        await user.save();
        const emp = new Employee({
          info: user,
          ...input,
        });
        const empSaved = await emp.save();
        // const addToDep = await Department.findOneAndUpdate({
        //   institute: input.institute,
        //   field: input.field,
        // }, {
        //   $push: {
        //     listOFEmployees: emp,
        //   },
        // });
        // if (!addToDep) {
        //   console.log('No department to add the employee');
        //   next('No department to add the employee');
        // }
        req.newEmployee = empSaved;
        next();
      } else {
        console.log('Not An Employee');
        next('Not An Employee');
      }
    } else {
      console.log('Not A User');
      next('Not A User');
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

async function addDoctor(req, res, next) {
  try {
    // console.log(req.body);
    const input = req.body;
    if (input.role == 'user') {
      if (input.type == 'doctor') {
        const ent = new Entity({...input,role:"doctor"});
        //console.log('ent',ent);
        await ent.save();
        const user = new User({
          info: ent,
          ...input,
        });
        //console.log('user',user);
        await user.save();
        const doc = new Doctor({
          userProfile: user,
          ...input,
        });
        const docSaved = await doc.save();
        req.newDoctor = docSaved;
        console.log(req.newDoctor);
        next();
      } else {
        console.log('Not a doctor');
        next('Not a doctor');
      }
    } else {
      console.log('Not a User');
      next('Not A User');
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}


async function addPatient(req, res, next) {
  try {

    const input = req.body;
    if (input.role == 'user') {
      if (input.type == 'patient') {
        const ent = new Entity({...input,role:"client"});
        await ent.save();

        const user = new User({
          info: ent,
          ...input,
        });
        await user.save();
        console.log(user);
        const pat = new Patient({
          userProfile: user,
          ...input,
        });
        const patSaved = await pat.save();
        req.newPatient = patSaved;

        next();
      } else {
        next('Not a patient');
      }
    } else {
      next('Not A User');
    }
  } catch (err) {
    console.log(err.message);
  }
}



async function checkUsername(req, res, next) {
  const {
    username,
  } = req.body;
  try {
    //console.log(req.body);
    const user = await Entity.find({
      username: username,
    });
    if (!user.username) {
      next();
    } else {
      next('Username already Exists');
    }
  } catch (error) {
    console.log(error.message);
  }


}

async function getAllProcedures(req, res, next) {
  try {
    const {
      id,
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
      allTherapies,
    };
    next();
  } catch (error) {
    console.log(error.message);
  }
}

async function addHospital(req, res, next) {
  const input = req.body;
  try {
    if (input.role == 'institute') {
      if (input.type == 'hospital') {
        const ent = new Entity({...input,role:"hospital"});
        await ent.save();
        const institute = new Institute({
          info: ent,
          ...input,
        });
        const savedInst = await institute.save();
        req.newHospital = savedInst;
        next();
      } else {
        next('Not a Hospital');
      }
    } else {
      next('Not an Institute');
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function addInsurance(req, res, next) {
  const input = req.body;
  try {
    if (input.role == 'institute') {
      if (input.type == 'insurance') {
        const ent = new Entity({...input,role:"insurance"});
        await ent.save();
        const institute = new Institute({
          info: ent,
          ...input,
        });
        await institute.save();
        const insuranceCompany = new InsuranceComp({
          info:institute,
          ...input,
        });
        const savedIns = await institute.save();
        req.newInsComp = savedIns;
        next();
      } else {
        next('Not an Insurance company');
      }
    } else {
      next('Not an Institute');
    }
  } catch (err) {
    console.log(err.message);
  }
}


module.exports={addEmployee,addDoctor,addPatient,checkUsername,getAllProcedures,addHospital,addInsurance};
