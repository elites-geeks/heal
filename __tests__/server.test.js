'use strict';

const supergoose= require('@code-fellows/supergoose');
const supertest = require('supertest');
const {app} = require('../src/server/server.js');
const db=require('../src/server/models/user');
const mockRequest = supergoose(app);

describe('Server', () => {
    
    it('should return status code 200',async () => {
        const res = await mockRequest.get('/');
        expect(res.status).toEqual(200);
    });
});