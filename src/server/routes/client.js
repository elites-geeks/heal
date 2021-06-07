'use strict';

const express = require('express');
const clientRoute = express.Router();
// Routes
// clientRoute.post('/register' , registerHandler);
// clientRoute.post('/new-visit/self', selfVisitHandler);
// clientRoute.get('/appointment/search');
// clientRoute.get('/procedures/pending');
// clientRoute.get('/procedures/paid');
// clientRoute.get('/procedures/active');
// clientRoute.get('/appointment')

// Routes handlers
// async function registerHandler(req,res){
  // console.log(req.body);
  // try{

    // const SQL = 'SELECT username from patient where username=$1 returning *;';
    // client.query(SQL,[req.body.username]).then(data=>{
    //   console.log('hello');
    // }).catch(err =>{
    //   console.log(err.message);
    // });
    // if(data.username){
    //   console.log("User name is already exist");
    //   res.end();
    // }else{
      // console.log(client.query);
      // const body = req.body;
      // console.log(body);
      // const SQL = `INSERT INTO patient (firstName, lastName , dateOfBirth , email , phoneNumber, image, insuranceState, role , country , password) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *;`;
      // client.query(SQL,[body.firstName, body.lastName, body.dataOfBirth, body.email, body.phoneNumber, body.image, body.insuranceState, body.role, body.country, body.password]).then(data=>{
      //   console.log(data.rows);
      //   res.json(JSON.stringify(data));
      // }).catch(err=>{
      //   console.log(err.message);
      // });
    // }
  // }catch(err){
  //   console.log(err.message);
  // }
// }
// function selfVisitHandler(req,res){
//   const body = req.body;
//   body.drugs.forEach(drug =>{

//   });
//   body.labs.forEach(lab=>{

//   });
//   body.therapies.forEach(therapy=>{

//   });
//   body.radios.forEach(radio=>{

//   });
// }

module.exports={clientRoute};
