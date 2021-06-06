'use strict';

class Entity {
    constructor(id, name, contact, password, role) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.password = password;
        this.role = role;
    }
}
class Institute extends Entity {
    constructor(id, name, contact, password, role, location, listOfDeps) {
        super(id, name, contact, password, role);
        this.location = location;
        this.listOfDeps = listOfDeps;
    }
}
class InsuranceComp extends Institute {
    constructor(id, name, contact, password, role, location, listOfDeps, listOfPolicies, listOfSubscribers, accreditedHospitals) {
        super(id, name, contact, password, role, location, listOfDeps);
        this.listOfPolicies = listOfPolicies;
        this.listOfSubscribers = listOfSubscribers;
        this.accreditedHospitals = accreditedHospitals;
    }
}
class MedicalInstitute extends Institute {
    constructor(id, name, contact, password, role, location, listOfDeps) {
        super(id, name, contact, password, role, location, listOfDeps);
    }
}
class Hospital extends Institute {
    constructor(id, name, contact, password, role, location, listOfDeps) {
        super(id, name, contact, password, role, location, listOfDeps);
    }
}
class User extends Entity {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth) {
        super(id, name, contact, password, role);
        this.imgURL = imgURL;
        this.dateOfBirth = dateOfBirth;
    }
}
class Doctor extends User {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, specialty, creditedInsuranceComp) {
        super(id, name, contact, password, role, imgURL, dateOfBirth);
        this.specialty = specialty;
        this.creditedInsuranceComp = creditedInsuranceComp;
    }
}
class Employee extends User {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company) {
        super(id, name, contact, password, role, imgURL, dateOfBirth);
        this.field = field;
        this.yearsOfExp = yearsOfExp;
        this.company = company;
    }
}
class Patient extends User {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, insuranceStatus, insuranceComp) {
        super(id, name, contact, password, role, imgURL, dateOfBirth);
        this.insuranceStatus = insuranceStatus;
        this.insuranceComp = insuranceComp;
    }
}
class Admin extends User {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth) {
        super(id, name, contact, password, role, imgURL, dateOfBirth);
    }
}
class MedicalStaff extends Employee {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company) {
        super(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company);
    }
}
class InsuranceRep extends Employee {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company) {
        super(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company);
    }
}
class Accountant extends Employee {
    constructor(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company) {
        super(id, name, contact, password, role, imgURL, dateOfBirth, field, yearsOfExp, company);
    }
}
module.exports = {
    Accountant,
    InsuranceComp,
    InsuranceRep,
    MedicalStaff,
    Hospital,
    Admin,
    Patient,
    Doctor
}
