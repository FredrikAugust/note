'use strict';

let jwt = require('jsonwebtoken');
let config = require('config');

module.exports = (username) => {
  return jwt.sign({
    user: username
  }, config.get('jwt.secret'));
};
