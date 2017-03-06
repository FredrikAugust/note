'use strict';

let express = require("express");
let morgan = require("morgan");
let bodyParser = require("body-parser");

const app = express();

let port = 8888;

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('tiny'));
}

app.use(bodyParser.json({ type: 'application/json' }));

// Middleware for authentication
// app.use(jwt..);
// We want this to trigger for everything except /token

// All notes
app.get('/notes', (req, res) => {
  // Respond with object containing note
  res.json({});
});

// One note
app.get('/note/:id', (req, res) => {
  // Respond with note as object
  res.json({});
});

// Search, query elastic
app.get('/search', (req, res) => {
  // Respond with an array of notes found matching pattern
  res.json({});
});

// Create note
app.post('/create', (req, res) => {
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

// Auth
app.post('/token', (req, res) => {
  // Takes the parameters required to authenticate; username and pass
  // Responds with a valid token or invalid credentials
  res.json({});
});

app.listen(port);

module.exports = app;
