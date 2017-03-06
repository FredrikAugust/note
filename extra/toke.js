'use strict';

let jwt = require('jsonwebtoken');
let config = require('config');

module.exports = (username) => {
  return jwt.sign({
    username: username
  }, config.get('jwt.secret'));
};
