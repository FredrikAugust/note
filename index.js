'use strict';

let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let elasticsearch = require('elasticsearch');

let jwtMiddleware = require('./middleware/jwt');

mongoose.connect('mongodb://mongo/note');

let elasticClient = elasticsearch.Client({
  host: 'elasticsearch:9200',
  log: 'trace'
});

const app = express();

let port = 8888;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use(bodyParser.json({ type: 'application/json' }));

app.use(jwtMiddleware);

// All notes
app.get('/note', (req, res) => {
  // Respond with object containing note
  res.json({});
});

// Search, query elastic
app.get('/note/search', (req, res) => {
  // Respond with an array of notes found matching pattern
  res.json({});
});

// One note
app.get('/note/:id', (req, res) => {
  // Respond with note as object
  res.json({});
});

// Create note
app.post('/note', (req, res) => {
  // Create note and index in elastic
  // Respond with errors or success
  res.json({});
});

// Update note
app.put('/note/:id', (req, res) => {
  // Update note in elastic
  // Respond with errors or success
  res.json({});
});

// Delete note
app.delete('/note/:id', (req, res) => {
  // Delete from elastic
  // Respond with success or error
  // Errors are 404 or 401 not authenticated
  res.json({});
});

// Auth stuff
app.post('/auth/sign_in', (req, res) => {
  // Takes the parameters required to authenticate; username and pass
  // Responds with a valid token or invalid credentials
  res.json({});
});

app.post('/auth/sign_up', (req, res) => {
  // Takes the parameters required to authenticate; username and pass
  // Responds with a valid token or invalid credentials
  res.json({});
});

app.listen(port);

module.exports = app;
