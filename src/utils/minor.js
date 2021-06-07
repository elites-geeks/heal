'use strict';

class Department{
  constructor(type, institute, listOfEmployees){
    this.type = type;
    this.institute = institute;
    this.listOfEmployees = listOfEmployees;
  }
}

class Reservation{
  constructor(id, doctor, patient, time, date){
    this.id = id;
    this.doctor = doctor; 
    this.patient = patient;
    this.time = time;
    this.date = date;
  }
}
class Drug{
  constructor(name, route, dose, takenPerTime, timesTaken, period, price){
    this.name = name;
    this.route = route;
    this.dose = dose;
    this.takenPerTime = takenPerTime;
    this.timesTaken = timesTaken;
    this.period = period;
    this.price = price;
  }
}
class Test{
  constructor(name, price, notes, timeStart, expextedTime){
    this.name = name; 
    this.price = price;
    this.notes = notes;
    this.timeStart = timeStart;
    this.expextedTime = expextedTime;
  }
}
class Diagnosis{
  constructor(signs, symptoms, lengthOfTime, finalDiagnosis){
    this.signs = signs;
    this.symptoms = symptoms;
    this.lengthOfTime = lengthOfTime;
    this.finalDiagnosis = finalDiagnosis;
  }
}

module.exports = {
  Diagnosis,
  Test,
  Drug,
  Reservation,
  Department,
};