'use strict';

const express = require('express');
const clientRoute = express.Router;

clientRoute.get('/', dashboatd);
clientRoute.get('/new/visit', newvisit);

