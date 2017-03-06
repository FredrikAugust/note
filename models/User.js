'use strict';

let mongoose = require('mongoose');
let uuid = require('uuid');

let userSchema = mongoose.Schema({
  _id: { type: String, default: uuid.v1 },
  username: { type: String, unique: true, lowercase: true, match: /^[A-Za-z0-9]{2,40}$/ },
  password_digest: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
