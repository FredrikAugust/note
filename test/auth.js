'use strict';

process.env.NODE_ENV = 'test';

let config = require('config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();
let mongoose = require('mongoose');
let User = require('../models/User');

chai.use(chaiHttp);

describe('authentication', () => {
  // Delete all user objects
  beforeEach((done) => {
    User.remove({}, () => {done();});
  });

  describe('signing up', () => {
    it('creates a new user if a valid submission is sent', (done) => {
      chai.request(app)
        .post('/auth/sign_up')
        .send({ "username": "dammitman", "password": "paperplanes" })
        .end((err, res) => {
          if (err) { return done(err); }
          res.should.have.status(200);
          User.where({}).count().should.equal(1);
          done();
        });
    });

    // TODO: invalid request
    // TODO: drop username/password
  });
});
