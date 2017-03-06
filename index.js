'use strict';

let express = require("express");
let morgan = require("morgan");
let config = require("config");
let bodyParser = require("body-parser");

const app = express();

let port = 8888;

if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan());
}

app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => {
  res.json({"info": "Welcome!"});
})

app.listen(port);
console.log("Listening on ::8888");

module.exports = app;
