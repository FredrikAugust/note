'use strict';

let jwt = require('jsonwebtoken');
let config = require('config');

const secret = config.get('jwt.secret');

module.exports = (req, res, next) => {
  // If the user is trying to get the token/sign up
  if (/\/auth\/sign_(in|up)/.test(req.path)) { return next(); }

  let token = req.get('Bearer');
  var decoded_token;

  if (!token) {
    res.status(400);
    return res.json({"error": "Missing Bearer header in request"});
  }

  try {
    decoded_token = jwt.verify(token, secret);
  } catch(err) {
    res.status(401);
    return res.json({"error": "Invalid Bearer token"});
  }

  // All good!
  req.user = decoded_token.user;
  next();
};
