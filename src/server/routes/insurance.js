'use strict';

const express = require('express');

const employeeRoute = express.Router();

employeeRoute.get('/sub-requests', getAllRequestsHandler);
employeeRoute.get('/requests/:id', getOneRequestHandler);
employeeRoute.post('/requests/:id', getOneRequestHandler);
employeeRoute.get('/visits', getAllPendingVisits);
employeeRoute.get('/visits/:id', getOneVistHandler);
employeeRoute.post('/visits/:id', visitApprovalHandler);
employeeRoute.get('/policies', showAllPoliciesHandler);
employeeRoute.get('/policies/:id' , getOnePolicyHandler);
employeeRoute.put('/policies/:id' , modifyPolicyHandler);
employeeRoute.delete('/policies/:id' , deletePolicyHandler);
employeeRoute.get('/subscribers' , getAllSubscribres);
employeeRoute.get('/subscribers/:id' , getOneSubscriberHandler);
employeeRoute.delete('/subscribers/:id' , deleteSubscriberHandler);



module.exports=employeeRoute;