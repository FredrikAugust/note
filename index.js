'use strict';

let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let elasticsearch = require('elasticsearch');
let bcrypt = require('bcrypt-nodejs')
let config = require('config');
let toke = require('./extra/toke');

let User = require('./models/User');

let jwtMiddleware = require('./middleware/jwt');

mongoose.connect('mongodb://mongo/' + config.get('mongo.database'));

let elasticClient = elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
});

const app = express();

let port = 8888;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(jwtMiddleware);

// GET /note{{{
app.get('/note', (req, res) => {
  // Respond with object containing note
  res.json({});
});
// }}}

// GET /note/search{{{
app.get('/note/search', (req, res) => {
  // Respond with an array of notes found matching pattern
  res.json({});
});
// }}}

// GET /note/:id{{{
app.get('/note/:id', (req, res) => {
  // Respond with note as object
  res.json({});
});
// }}}

// POST /note{{{
app.post('/note', (req, res) => {
  // Create note and index in elastic
  // Respond with errors or success
  res.json({});
});
// }}}

// PUT /note/:id{{{
app.put('/note/:id', (req, res) => {
  // Update note in elastic
  // Respond with errors or success
  res.json({});
});
// }}}

// DELETE /note/:id{{{
app.delete('/note/:id', (req, res) => {
  // Delete from elastic
  // Respond with success or error
  // Errors are 404 or 401 not authenticated
  res.json({});
});
// }}}

// POST /auth/sign_in{{{
app.post('/auth/sign_in', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    return res.json({"error": "Malformed request, you must provide a username and password"})
  }

  let query = User.where({ username: req.body.username });

  query.findOne((err, user) => {
    if (err) {
      res.status(500);
      return res.json({"error": "An internal server error occured"});
    }

    if (!user) {
      res.status(400);
      return res.json({"error": "No such user exists"});
    }

    if (bcrypt.compareSync(req.body.password, user.password_digest)) {
      return res.json({"token": toke(req.body.username)});
    }

    res.status(401);
    res.json({"error": "Invalid password provided"});
  });
});
// }}}

// POST /auth/sign_up{{{
app.post('/auth/sign_up', (req, res) => {
  let raw_pass = req.body.password;
  let username = req.body.username;

  let digest = bcrypt.hashSync(raw_pass);

  let user = new User({
    username: username,
    password_digest: digest
  });

  user.save((err) => {
    if (err) {
      res.status(500);
      return res.json({"error": "Could not save user: " + err});
    }

    res.json({"token": toke(username)})
  });
});
// }}}

app.listen(port);

module.exports = app;
