'use strict';

const {Entity} = require('../../server/models/user');

module.exports = async (req, res, next) => {
  // a token in the req headers 
  // Authorization header value will be "Bearer token"
  if (!req.headers.authorization) {
    next('Not Logged-in user');
    // res.status(403).send()
  } else {
    // get the token from headers
    try {
      let token = req.headers.authorization.split(' ').pop();
      let user = await Entity.authenticateWithToken(token);
      if (user) {
        req.user = user;
        req.token = user.token;
        next();
      } else {
        next('Invalid Token!!!!');
      }

    } catch(ex) {
      res.status(403).send('Invalid Token!!!!');

    }
  }
        
};