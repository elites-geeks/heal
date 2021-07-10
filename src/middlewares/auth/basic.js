'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const {Entity} = require('../../server/models/user');
// const clientRoute = require('../../server/routes/client');

async function basicAuthentication (req, res, next)  {
  console.log(req.headers.authorization)
  let basicHeaderParts = req.headers.authorization.split(' ');
  console.log(basicHeaderParts)
  let encodedString = basicHeaderParts.pop();
  let decodedString = base64.decode(encodedString);
  let [username, password] = decodedString.split(':');

  try {
    const user = await Entity.findOne({ username: username });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      req.token = user.token;
      next();
    }
    else {
      next('the password not correct');
    }
  } catch (error) { res.status(403).send('the username not correct'); }

}

module.exports = basicAuthentication;
