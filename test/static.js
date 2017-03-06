'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('static pages', () => {
  describe('GET /', () => {
    it('it should GET index page with success', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('Content-Type', 'application/json');
        });
      done();
    });
  });
});
