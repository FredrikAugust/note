'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('getting notes', () => {
  // TODO
});
